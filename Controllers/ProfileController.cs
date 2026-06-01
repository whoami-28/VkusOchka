using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodDelivery.Models;
using System.Security.Claims;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace FoodDelivery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfileController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet("settings")]
        public async Task<ActionResult> GetSettings()
        {
            var user = await _context.Users.FindAsync(GetUserId());
            if (user == null) return NotFound();
            return Ok(new { user.Name, user.Email, user.BonusBalance });
        }

        public class UpdateSettingsDto 
        { 
            [Required(ErrorMessage = "Имя обязательно")]
            [StringLength(50, MinimumLength = 2, ErrorMessage = "Имя должно быть от 2 до 50 символов")]
            [RegularExpression(@"^[a-zA-Zа-яА-ЯёЁ\s\-]+$", ErrorMessage = "Имя должно содержать только буквы, пробел и дефис")]
            public string Name { get; set; } = string.Empty; 
        }

        [HttpPut("settings")]
        public async Task<ActionResult> UpdateSettings([FromBody] UpdateSettingsDto dto)
        {
            var name = dto.Name.Trim();
            if (name.Contains("--") || name.Contains("  ") || Regex.IsMatch(name, @"(.)\1{3,}"))
                return BadRequest(new { message = "Имя содержит недопустимые последовательности символов." });

            var user = await _context.Users.FindAsync(GetUserId());
            if (user == null) return NotFound();

            user.Name = name;
            await _context.SaveChangesAsync();
            return Ok(new { user.Name, user.Email });
        }

        [HttpGet("addresses")]
        public async Task<ActionResult> GetAddresses()
        {
            return Ok(await _context.Addresses.Where(a => a.UserId == GetUserId()).ToListAsync());
        }

        [HttpPost("addresses")]
        public async Task<ActionResult> AddAddress([FromBody] Address address)
        {
            if (string.IsNullOrWhiteSpace(address.FullAddress) || address.FullAddress.Length < 10 || address.FullAddress.Length > 150 || address.FullAddress.Contains("--") || address.FullAddress.Contains("  ") || !Regex.IsMatch(address.FullAddress, @"[a-zA-Zа-яА-ЯёЁ]") || Regex.IsMatch(address.FullAddress, @"(.)\1{4,}"))
                return BadRequest(new { message = "Пожалуйста, введите корректный адрес. Запрещены множественные повторения символов и адреса без букв." });

            address.UserId = GetUserId();
            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();
            return Ok(address);
        }

        [HttpDelete("addresses/{id}")]
        public async Task<ActionResult> DeleteAddress(int id)
        {
            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.Id == id && a.UserId == GetUserId());
            if (address != null)
            {
                _context.Addresses.Remove(address);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        [HttpGet("cards")]
        public async Task<ActionResult> GetCards()
        {
            return Ok(await _context.SavedCards.Where(c => c.UserId == GetUserId()).ToListAsync());
        }

        public class CardDto { public string Number { get; set; } = string.Empty; }

        [HttpPost("cards")]
        public async Task<ActionResult> AddCard([FromBody] CardDto dto)
        {
            var num = dto.Number.Replace(" ", "");
            if (num.Length != 16 || !num.All(char.IsDigit)) return BadRequest(new { message = "Некорректный номер карты." });
            
            var card = new SavedCard 
            {
                UserId = GetUserId(),
                MaskedNumber = $"**** {num.Substring(12)}",
                CardToken = Guid.NewGuid().ToString() 
            };
            
            _context.SavedCards.Add(card);
            await _context.SaveChangesAsync();
            return Ok(card);
        }

        [HttpDelete("cards/{id}")]
        public async Task<ActionResult> DeleteCard(int id)
        {
            var card = await _context.SavedCards.FirstOrDefaultAsync(c => c.Id == id && c.UserId == GetUserId());
            if (card != null)
            {
                _context.SavedCards.Remove(card);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        [HttpGet("favorite-restaurants")]
        public async Task<ActionResult> GetFavoriteRestaurants()
        {
            var favs = await _context.FavoriteRestaurants
                .Where(fr => fr.UserId == GetUserId())
                .Select(fr => new {
                    id = fr.RestaurantId,
                    name = fr.Restaurant!.Name,
                    image = fr.Restaurant.Image,
                    rating = fr.Restaurant.Rating,
                    description = fr.Restaurant.Description
                })
                .ToListAsync();
            return Ok(favs);
        }

        [HttpPost("favorite-restaurants/{restaurantId}")]
        public async Task<ActionResult> AddFavoriteRestaurant(int restaurantId)
        {
            var exists = await _context.FavoriteRestaurants.AnyAsync(fr => fr.UserId == GetUserId() && fr.RestaurantId == restaurantId);
            if (!exists)
            {
                _context.FavoriteRestaurants.Add(new FavoriteRestaurant { UserId = GetUserId(), RestaurantId = restaurantId });
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        [HttpDelete("favorite-restaurants/{restaurantId}")]
        public async Task<ActionResult> RemoveFavoriteRestaurant(int restaurantId)
        {
            var fav = await _context.FavoriteRestaurants.FirstOrDefaultAsync(fr => fr.UserId == GetUserId() && fr.RestaurantId == restaurantId);
            if (fav != null)
            {
                _context.FavoriteRestaurants.Remove(fav);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        [HttpGet("favorite-carts")]
        public async Task<ActionResult> GetFavoriteCarts()
        {
            var carts = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Dish)
                .Where(c => c.UserId == GetUserId() && !string.IsNullOrEmpty(c.Name))
                .Select(c => new {
                    c.Id,
                    c.Name,
                    Items = c.CartItems.Select(ci => new { 
                        Id = ci.DishId,
                        Name = ci.Dish != null ? ci.Dish.Name : "Неизвестно", 
                        Quantity = ci.Quantity, 
                        Price = ci.Dish != null ? ci.Dish.Price : 0,
                        Image = ci.Dish != null ? ci.Dish.Image : null,
                        RestaurantId = ci.Dish != null ? ci.Dish.RestaurantId : 0
                    }).ToList()
                })
                .ToListAsync();
            
            return Ok(carts);
        }

        [HttpDelete("favorite-carts/{id}")]
        public async Task<ActionResult> DeleteFavoriteCart(int id)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.Id == id && c.UserId == GetUserId());
            if (cart != null)
            {
                _context.Carts.Remove(cart);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }
    }
}