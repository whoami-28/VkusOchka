using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<SavedCard> SavedCards { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Kitchen> Kitchens { get; set; }
        public DbSet<RestaurantKitchen> RestaurantKitchens { get; set; }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<FavoriteRestaurant> FavoriteRestaurants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RestaurantKitchen>()
                .HasKey(rk => new { rk.RestaurantId, rk.KitchenId });

            modelBuilder.Entity<RestaurantKitchen>()
                .HasOne(rk => rk.Restaurant)
                .WithMany(r => r.RestaurantKitchens)
                .HasForeignKey(rk => rk.RestaurantId);

            modelBuilder.Entity<RestaurantKitchen>()
                .HasOne(rk => rk.Kitchen)
                .WithMany(k => k.RestaurantKitchens)
                .HasForeignKey(rk => rk.KitchenId);

            modelBuilder.Entity<FavoriteRestaurant>()
                .HasKey(fr => new { fr.UserId, fr.RestaurantId });

            modelBuilder.Entity<User>().Property(u => u.BonusBalance).HasColumnType("decimal(10,2)");
            modelBuilder.Entity<Dish>().Property(d => d.Price).HasColumnType("decimal(10,2)");
            modelBuilder.Entity<Order>().Property(o => o.TotalPrice).HasColumnType("decimal(10,2)");
            modelBuilder.Entity<OrderItem>().Property(oi => oi.PriceAtPurchase).HasColumnType("decimal(10,2)");
            modelBuilder.Entity<Address>().Property(a => a.Latitude).HasColumnType("decimal(18,6)");
            modelBuilder.Entity<Address>().Property(a => a.Longitude).HasColumnType("decimal(18,6)");
        }
    }
}