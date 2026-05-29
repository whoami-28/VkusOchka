using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodDelivery.Models;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace FoodDelivery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet]
        public async Task<ActionResult> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .Where(o => o.UserId == GetUserId())
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            var result = orders.Select(o => new
            {
                o.Id,
                Date = o.OrderDate.ToString("dd.MM.yyyy HH:mm"),
                o.Status,
                o.Address,
                Total = o.TotalPrice,
                Items = o.OrderItems.Select(oi => new { oi.DishName, oi.Quantity, Price = oi.PriceAtPurchase })
            });

            return Ok(result);
        }

        public class CreateOrderRequest
        {
            public string Address { get; set; } = string.Empty;
            public decimal Total { get; set; }
            public List<OrderItemRequest> Items { get; set; } = new();
        }

        public class OrderItemRequest
        {
            public string Name { get; set; } = string.Empty;
            public int Quantity { get; set; }
            public decimal Price { get; set; }
        }

        [HttpPost]
        public async Task<ActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Address) || request.Address.Length < 10 || request.Address.Length > 150 || request.Address.Contains("--") || request.Address.Contains("  ") || !Regex.IsMatch(request.Address, @"[a-zA-Zа-яА-ЯёЁ]") || Regex.IsMatch(request.Address, @"(.)\1{4,}"))
                return BadRequest(new { message = "Отказано. Некорректный адрес доставки (запрещены частые повторения символов и бессмысленные наборы)." });

            if (request.Items == null || !request.Items.Any())
                return BadRequest(new { message = "Пустой заказ" });

            var order = new Order
            {
                UserId = GetUserId(),
                Address = request.Address.Trim(),
                TotalPrice = request.Total,
                Status = "Готовится",
                OrderDate = DateTime.Now
            };

            foreach (var item in request.Items)
            {
                order.OrderItems.Add(new OrderItem
                {
                    DishName = item.Name,
                    Quantity = item.Quantity,
                    PriceAtPurchase = item.Price
                });
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new { order.Id });
        }
    }
}