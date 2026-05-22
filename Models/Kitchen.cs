using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class Kitchen
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Image { get; set; }

        [JsonIgnore] public List<RestaurantKitchen> RestaurantKitchens { get; set; } = new();
    }
}