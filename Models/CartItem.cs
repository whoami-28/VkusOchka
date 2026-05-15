using System.Text.Json.Serialization;

namespace FoodDelivery.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int DishId { get; set; }
        public int Quantity { get; set; }

        [JsonIgnore] public Cart? Cart { get; set; }
        public Dish? Dish { get; set; }
    }
}