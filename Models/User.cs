using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal BonusBalance { get; set; } = 0; 

        [JsonIgnore] public List<Address> Addresses { get; set; } = new();
        [JsonIgnore] public List<SavedCard> SavedCards { get; set; } = new();
        [JsonIgnore] public List<Cart> Carts { get; set; } = new();
        [JsonIgnore] public List<FavoriteRestaurant> FavoriteRestaurants { get; set; } = new();
    }
}