using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class SavedCard
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string MaskedNumber { get; set; } = string.Empty; // Например: "**** 1234"
        public string CardToken { get; set; } = string.Empty;

        [JsonIgnore] public User? User { get; set; }
    }
}