namespace FoodDelivery.Models
{
    public enum PaymentMethod
    {
        Cash,
        NewCard,
        SavedCard
    }

    public enum OrderStatus
    {
        Created,
        Preparing,
        Delivering,
        Delivered,
        Cancelled
    }
}