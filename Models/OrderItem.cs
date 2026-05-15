using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int DishId { get; set; }
        public int Quantity { get; set; }
        public decimal PriceAtPurchase { get; set; } // Фиксируем цену на момент покупки

        [JsonIgnore] public Order? Order { get; set; }
        public Dish? Dish { get; set; }
    }
}