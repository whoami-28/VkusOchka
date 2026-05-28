using Microsoft.EntityFrameworkCore;
using FoodDelivery.Models;

namespace FoodDelivery.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            if (context.Kitchens.Any())
            {
                return;
            }

            var kitchens = new Kitchen[]
            {
                new Kitchen { Name = "Бургеры", Image = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop" },
                new Kitchen { Name = "Пицца", Image = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop" },
                new Kitchen { Name = "Суши", Image = "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500&auto=format&fit=crop" },
                new Kitchen { Name = "Здоровая еда", Image = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop" },
                new Kitchen { Name = "Десерты", Image = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500&auto=format&fit=crop" },
                new Kitchen { Name = "Грузинская", Image = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80" },
                new Kitchen { Name = "Азиатская", Image = "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=500&auto=format&fit=crop" },
                new Kitchen { Name = "Кофе", Image = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500&auto=format&fit=crop" },
                new Kitchen { Name = "Итальянская", Image = "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500&auto=format&fit=crop" },
                new Kitchen { Name = "Мексиканская", Image = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop" }
            };

            context.Kitchens.AddRange(kitchens);
            context.SaveChanges();

            var restaurants = new Restaurant[]
            {
                new Restaurant { Name = "Burger Empire", Description = "Лучшие бургеры в городе из мраморной говядины", Rating = "4.9", Image = "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop" },
                new Restaurant { Name = "Pizza Mafia", Description = "Настоящая неаполитанская пицца из дровяной печи", Rating = "4.8", Image = "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&h=600&fit=crop" },
                new Restaurant { Name = "Tokyo Roll", Description = "Свежайшие суши и роллы от шефа", Rating = "4.7", Image = "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop" },
                new Restaurant { Name = "Green Bowl", Description = "Полезная еда, боулы и смузи", Rating = "4.9", Image = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop" },
                new Restaurant { Name = "Sweet Tooth", Description = "Авторские десерты и спешелти кофе", Rating = "5.0", Image = "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop" },
                new Restaurant { Name = "Хинкальная №1", Description = "Традиционная грузинская кухня", Rating = "4.6", Image = "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop" },
                new Restaurant { Name = "Pasta La Vista", Description = "Домашняя итальянская паста ручной лепки", Rating = "4.8", Image = "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=600&fit=crop" },
                new Restaurant { Name = "Wok N Roll", Description = "Жгучий вок и паназиатские специалитеты", Rating = "4.5", Image = "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&h=600&fit=crop" },
                new Restaurant { Name = "Meat & Fire", Description = "Стейки, ребрышки и брискет из смокера", Rating = "4.9", Image = "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&h=600&fit=crop" },
                new Restaurant { Name = "Taco Fiesta", Description = "Горячие тако, буррито и начос с гуакамоле", Rating = "4.7", Image = "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop" }
            };

            context.Restaurants.AddRange(restaurants);
            context.SaveChanges();

            var restaurantKitchens = new RestaurantKitchen[]
            {
                new RestaurantKitchen { RestaurantId = restaurants[0].Id, KitchenId = kitchens[0].Id },
                new RestaurantKitchen { RestaurantId = restaurants[1].Id, KitchenId = kitchens[1].Id },
                new RestaurantKitchen { RestaurantId = restaurants[1].Id, KitchenId = kitchens[8].Id },
                new RestaurantKitchen { RestaurantId = restaurants[2].Id, KitchenId = kitchens[2].Id },
                new RestaurantKitchen { RestaurantId = restaurants[2].Id, KitchenId = kitchens[6].Id },
                new RestaurantKitchen { RestaurantId = restaurants[3].Id, KitchenId = kitchens[3].Id },
                new RestaurantKitchen { RestaurantId = restaurants[4].Id, KitchenId = kitchens[4].Id },
                new RestaurantKitchen { RestaurantId = restaurants[4].Id, KitchenId = kitchens[7].Id },
                new RestaurantKitchen { RestaurantId = restaurants[5].Id, KitchenId = kitchens[5].Id },
                new RestaurantKitchen { RestaurantId = restaurants[6].Id, KitchenId = kitchens[8].Id },
                new RestaurantKitchen { RestaurantId = restaurants[7].Id, KitchenId = kitchens[6].Id },
                new RestaurantKitchen { RestaurantId = restaurants[8].Id, KitchenId = kitchens[0].Id },
                new RestaurantKitchen { RestaurantId = restaurants[9].Id, KitchenId = kitchens[9].Id }
            };

            context.RestaurantKitchens.AddRange(restaurantKitchens);
            context.SaveChanges();

            var dishes = new Dish[]
            {
                new Dish { RestaurantId = restaurants[0].Id, Name = "Чизбургер Классика", Description = "Говяжья котлета, чеддер, салат, томат, фирменный соус", Price = 8.99m, IsRecommended = true, Image = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop", Calories = 520, Protein = 28, Carbs = 42, Fat = 26 },
                new Dish { RestaurantId = restaurants[0].Id, Name = "Двойной Удар", Description = "Две сочные котлеты, бекон, халапеньо, сыр гауда", Price = 12.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop", Calories = 850, Protein = 45, Carbs = 40, Fat = 55 },
                new Dish { RestaurantId = restaurants[0].Id, Name = "Трюфельный бургер", Description = "Котлета блэк ангус, трюфельный соус, карамелизованный лук", Price = 14.00m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&h=400&fit=crop", Calories = 610, Protein = 30, Carbs = 44, Fat = 34 },
                new Dish { RestaurantId = restaurants[0].Id, Name = "Картофель фри", Description = "Золотистый хрустящий картофель", Price = 3.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&h=400&fit=crop", Calories = 340, Protein = 4, Carbs = 41, Fat = 16 },

                new Dish { RestaurantId = restaurants[1].Id, Name = "Маргарита", Description = "Томатный соус, моцарелла, свежий базилик", Price = 10.00m, IsRecommended = true, Image = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop", Calories = 780, Protein = 28, Carbs = 95, Fat = 32 },
                new Dish { RestaurantId = restaurants[1].Id, Name = "Пепперони", Description = "Острая пепперони, моцарелла, томатный соус", Price = 11.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop", Calories = 920, Protein = 34, Carbs = 96, Fat = 45 },
                new Dish { RestaurantId = restaurants[1].Id, Name = "Четыре сыра", Description = "Моцарелла, горгонзола, пармезан, эмменталь", Price = 13.00m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop", Calories = 980, Protein = 42, Carbs = 94, Fat = 52 },
                new Dish { RestaurantId = restaurants[1].Id, Name = "Мясная пицца", Description = "Бекон, пепперони, ветчина, куриная грудка", Price = 15.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&h=400&fit=crop", Calories = 1120, Protein = 55, Carbs = 98, Fat = 58 },

                new Dish { RestaurantId = restaurants[2].Id, Name = "Филадельфия", Description = "Лосось, сливочный сыр, огурец", Price = 14.00m, IsRecommended = true, Image = "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop", Calories = 320, Protein = 16, Carbs = 38, Fat = 12 },
                new Dish { RestaurantId = restaurants[2].Id, Name = "Калифорния", Description = "Снежный краб, авокадо, огурец, тобико", Price = 12.00m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=400&fit=crop", Calories = 280, Protein = 12, Carbs = 42, Fat = 8 },
                new Dish { RestaurantId = restaurants[2].Id, Name = "Дракон", Description = "Угорь, авокадо, унаги соус, кунжут", Price = 16.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1558985250-27a406d64cb3?w=600&h=400&fit=crop", Calories = 360, Protein = 14, Carbs = 48, Fat = 14 },
                new Dish { RestaurantId = restaurants[2].Id, Name = "Сет Самурай", Description = "Ассорти из 24 роллов", Price = 35.00m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&h=400&fit=crop", Calories = 1150, Protein = 45, Carbs = 160, Fat = 32 },

                new Dish { RestaurantId = restaurants[3].Id, Name = "Боул с лососем", Description = "Киноа, лосось, авокадо, бобы эдамаме, чука", Price = 15.00m, IsRecommended = true, Image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop", Calories = 460, Protein = 24, Carbs = 45, Fat = 22 },
                new Dish { RestaurantId = restaurants[3].Id, Name = "Куриный боул", Description = "Бурый рис, куриное филе гриль, брокколи, томаты черри", Price = 12.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop", Calories = 410, Protein = 32, Carbs = 50, Fat = 9 },
                new Dish { RestaurantId = restaurants[3].Id, Name = "Веган боул", Description = "Тофу, киноа, сладкий картофель, хумус", Price = 11.00m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop", Calories = 380, Protein = 18, Carbs = 55, Fat = 14 },
                
                new Dish { RestaurantId = restaurants[4].Id, Name = "Чизкейк Нью-Йорк", Description = "Классический песочный корж и нежный творожный сыр", Price = 6.50m, IsRecommended = true, Image = "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&h=400&fit=crop", Calories = 480, Protein = 8, Carbs = 42, Fat = 32 },
                new Dish { RestaurantId = restaurants[4].Id, Name = "Шоколадный фондан", Description = "Горячий кекс с жидким шоколадным центром", Price = 7.00m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop", Calories = 520, Protein = 7, Carbs = 56, Fat = 34 },
                new Dish { RestaurantId = restaurants[4].Id, Name = "Макаронс сет", Description = "5 французских пирожных разных вкусов", Price = 9.00m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&h=400&fit=crop", Calories = 350, Protein = 5, Carbs = 48, Fat = 16 },
                new Dish { RestaurantId = restaurants[4].Id, Name = "Капучино", Description = "Эспрессо с густой молочной пенкой", Price = 4.00m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop", Calories = 120, Protein = 6, Carbs = 10, Fat = 6 },

                new Dish { RestaurantId = restaurants[5].Id, Name = "Хинкали классические", Description = "Сочные хинкали с говядиной и свининой (5 шт)", Price = 8.00m, IsRecommended = true, Image = "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80", Calories = 650, Protein = 30, Carbs = 75, Fat = 24 },
                new Dish { RestaurantId = restaurants[5].Id, Name = "Хачапури по-аджарски", Description = "Лодочка из теста с сыром сулугуни и яйцом", Price = 9.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1627308595229-7830b5c91f9f?auto=format&fit=crop&w=800&q=80", Calories = 850, Protein = 35, Carbs = 80, Fat = 45 },
                new Dish { RestaurantId = restaurants[5].Id, Name = "Шашлык из свинины", Description = "Мясо на углях с маринованным луком", Price = 14.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop", Calories = 540, Protein = 48, Carbs = 8, Fat = 36 },

                new Dish { RestaurantId = restaurants[6].Id, Name = "Карбонара", Description = "Паста с гуанчиале, яичным желтком и пекорино", Price = 12.00m, IsRecommended = true, Image = "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=400&fit=crop", Calories = 720, Protein = 24, Carbs = 70, Fat = 38 },
                new Dish { RestaurantId = restaurants[6].Id, Name = "Феттуччине Альфредо", Description = "Паста в сливочно-сырном соусе с курицей", Price = 13.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=400&fit=crop", Calories = 810, Protein = 38, Carbs = 68, Fat = 42 },
                new Dish { RestaurantId = restaurants[6].Id, Name = "Лазанья", Description = "Слоистая паста с рагу болоньезе и бешамель", Price = 15.00m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&h=400&fit=crop", Calories = 860, Protein = 45, Carbs = 72, Fat = 40 },

                new Dish { RestaurantId = restaurants[7].Id, Name = "Пад Тай", Description = "Тайская рисовая лапша с креветками и арахисом", Price = 13.00m, IsRecommended = true, Image = "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=400&fit=crop", Calories = 580, Protein = 22, Carbs = 85, Fat = 18 },
                new Dish { RestaurantId = restaurants[7].Id, Name = "Удон с говядиной", Description = "Пшеничная лапша в соусе терияки с овощами", Price = 12.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&h=400&fit=crop", Calories = 620, Protein = 28, Carbs = 80, Fat = 22 },
                new Dish { RestaurantId = restaurants[7].Id, Name = "Том Ям", Description = "Острый тайский суп с морепродуктами", Price = 14.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80", Calories = 320, Protein = 24, Carbs = 18, Fat = 16 },

                new Dish { RestaurantId = restaurants[8].Id, Name = "Стейк Рибай", Description = "Премиальный отруб мраморной говядины", Price = 29.00m, IsRecommended = true, Image = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop", Calories = 780, Protein = 65, Carbs = 0, Fat = 55 },
                new Dish { RestaurantId = restaurants[8].Id, Name = "Свиные ребрышки BBQ", Description = "Томленые ребра в фирменном соусе барбекю", Price = 19.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80", Calories = 920, Protein = 45, Carbs = 35, Fat = 62 },
                new Dish { RestaurantId = restaurants[8].Id, Name = "Брискет", Description = "Копченая говяжья грудинка 12 часов томления", Price = 22.00m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80", Calories = 850, Protein = 55, Carbs = 5, Fat = 68 },

                new Dish { RestaurantId = restaurants[9].Id, Name = "Тако Аль Пастор", Description = "Кукурузные лепешки со свининой и ананасом (3 шт)", Price = 11.00m, IsRecommended = true, Image = "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop", Calories = 480, Protein = 26, Carbs = 45, Fat = 20 },
                new Dish { RestaurantId = restaurants[9].Id, Name = "Буррито с курицей", Description = "Пшеничная тортилья, рис, фасоль, курица, сальса", Price = 12.50m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop", Calories = 650, Protein = 38, Carbs = 75, Fat = 22 },
                new Dish { RestaurantId = restaurants[9].Id, Name = "Начос Гранде", Description = "Кукурузные чипсы с сырным соусом, халапеньо и гуакамоле", Price = 9.00m, IsRecommended = false, Image = "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&h=400&fit=crop", Calories = 710, Protein = 15, Carbs = 85, Fat = 35 }
            };

            context.Dishes.AddRange(dishes);
            context.SaveChanges();
        }
    }
}