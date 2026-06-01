using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodDelivery.Models;
using System.Security.Claims;

namespace FoodDelivery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        public class SaveCartRequest
        {
            public string Name { get; set; } = string.Empty;
            public List<CartItemRequest> Items { get; set; } = new();
        }

        public class CartItemRequest
        {
            public int DishId { get; set; }
            public int Quantity { get; set; }
        }

        [HttpPost("favorite")]
        public async Task<ActionResult> SaveFavoriteCart([FromBody] SaveCartRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name) || request.Items == null || !request.Items.Any())
                return BadRequest(new { message = "Некорректные данные корзины" });

            var cart = new Cart
            {
                UserId = GetUserId(),
                Name = request.Name.Trim(),
                IsActive = false
            };

            foreach (var item in request.Items)
            {
                cart.CartItems.Add(new CartItem
                {
                    DishId = item.DishId,
                    Quantity = item.Quantity
                });
            }

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return Ok(new { id = cart.Id });
        }
    }
}