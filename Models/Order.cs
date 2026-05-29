using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Address { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = "Готовится";
        public DateTime OrderDate { get; set; } = DateTime.Now;

        [JsonIgnore] public User? User { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new();
    }
}