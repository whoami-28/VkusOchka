using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class FavoriteRestaurant
    {
        public int UserId { get; set; }
        public int RestaurantId { get; set; }

        [JsonIgnore] public User? User { get; set; }
        public Restaurant? Restaurant { get; set; }
    }
}