using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string DishName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal PriceAtPurchase { get; set; }

        [JsonIgnore] public Order? Order { get; set; }
    }
}