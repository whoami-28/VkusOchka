using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Rating { get; set; }
        public string? ImageUrl { get; set; }

        [JsonIgnore] public List<Dish> Dishes { get; set; } = new();
        [JsonIgnore] public List<RestaurantKitchen> RestaurantKitchens { get; set; } = new();
    }
}