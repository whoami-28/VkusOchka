using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class Dish
    {
        public int Id { get; set; }
        public int RestaurantId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsRecommended { get; set; }

        [JsonIgnore] public Restaurant? Restaurant { get; set; }
    }
}