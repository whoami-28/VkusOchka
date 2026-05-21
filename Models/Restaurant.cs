namespace FoodDelivery.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Rating { get; set; }
        public string? Image { get; set; }
        public ICollection<Dish> Dishes { get; set; } = new List<Dish>();
        public ICollection<RestaurantKitchen> RestaurantKitchens { get; set; } = new List<RestaurantKitchen>();
    }
}