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
        public string? Image { get; set; }
        public bool IsRecommended { get; set; }
        
        public int Calories { get; set; }
        public int Protein { get; set; }
        public int Carbs { get; set; }
        public int Fat { get; set; }

        [JsonIgnore]
        public Restaurant? Restaurant { get; set; }
    }
}