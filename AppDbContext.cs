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
        public DbSet<Orderkit> Orderkits { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Настройка составного ключа для RestaurantKitchen
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

            //Настройка Decimal
            modelBuilder.Entity<User>().Property(u => u.BonusBalance).HasColumnType("decimal(10,2)");
            modelBuilder.Entity<Dish>().Property(d => d.Price).HasColumnType("decimal(10,2)");
            modelBuilder.Entity<Order>().Property(o => o.TotalPrice).HasColumnType("decimal(10,2)");
            modelBuilder.Entity<Order>().Property(o => o.BonusesUsed).HasColumnType("decimal(10,2)");
            modelBuilder.Entity<OrderItem>().Property(oi => oi.PriceAtPurchase).HasColumnType("decimal(10,2)");

            modelBuilder.Entity<Address>().Property(a => a.Latitude).HasColumnType("decimal(18,6)");
            modelBuilder.Entity<Address>().Property(a => a.Longitude).HasColumnType("decimal(18,6)");
            
            modelBuilder.Entity<Orderkit>()
                .HasOne(ok => ok.User)
                .WithMany()
                .HasForeignKey(ok => ok.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Orderkit>()
                .HasOne(ok => ok.Address)
                .WithMany()
                .HasForeignKey(ok => ok.AddressId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Orderkit)
                .WithMany(ok => ok.Orders)
                .HasForeignKey(o => o.OrderkitId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}