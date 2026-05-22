using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class RestaurantKitchen
    {
        public int RestaurantId { get; set; }
        
        [JsonIgnore]
        public Restaurant? Restaurant { get; set; }

        public int KitchenId { get; set; }
        public Kitchen? Kitchen { get; set; }
    }
}