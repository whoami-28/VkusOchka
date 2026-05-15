using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class Orderkit
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int AddressId { get; set; }
        public int? SavedCardId { get; set; }

        [JsonIgnore] public User? User { get; set; }
        public Address? Address { get; set; }
        public SavedCard? SavedCard { get; set; }
        
        [JsonIgnore] public List<Order> Orders { get; set; } = new();
    }
}