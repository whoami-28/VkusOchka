using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Name { get; set; } // Для избранных корзин
        public bool IsActive { get; set; } = true;

        [JsonIgnore] public User? User { get; set; }
        [JsonIgnore] public List<CartItem> CartItems { get; set; } = new();
    }
}