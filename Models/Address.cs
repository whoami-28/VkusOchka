using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class Address
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FullAddress { get; set; } = string.Empty;
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public bool IsDefault { get; set; }

        [JsonIgnore] public User? User { get; set; }
    }
}