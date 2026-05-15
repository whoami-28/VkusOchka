using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int OrderkitId { get; set; } 
        
        public decimal TotalPrice { get; set; }
        public decimal BonusesUsed { get; set; } 
        public PaymentMethod PaymentMethod { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Created;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Orderkit? Orderkit { get; set; } 
        [JsonIgnore] public List<OrderItem> OrderItems { get; set; } = new();
    }
}