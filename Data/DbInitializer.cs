using FoodDelivery.Models;
using System.Linq;

namespace FoodDelivery.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            if (context.Restaurants.Any())
            {
                return;
            }

            var r1 = new Restaurant 
            { 
                Name = "Osteria Francescana", 
                Description = "Итальянская • Ресторан • $$$", 
                Rating = 4.9, 
                Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuBMs2lzyoz89lpzIfWTlyjg8YY6ygNIEeL0GxlKiY1HL2WWm1deXiOhAdtaCAtAt0NazOWpc_vWO5aSeyWpTlN02xagzjKtY7rpwBo0YHihVjFmPOOivPpgn83kw6bBk3QXGEWjG0B_yOQF5jQoSVNCH-lkie0Ly8gnvNS1pOvLnCoxXj2DnHk0tLSjRhFlNUpZB6HYb1fSJOP3c1FYym18Fs_XSbG8yJzlbHuJ_Cl4VYMDoT1zlTxvdWGunlVBBzbYOOYVhIxm2-4" 
            };
            
            var r2 = new Restaurant 
            { 
                Name = "Sushi Nakazawa", 
                Description = "Японская • Суши • $$", 
                Rating = 4.8, 
                Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuC3YozdwWIpl96e74z6iUVNJbG58cHp3qhqKQHpp5ex2Qpzd615rQS2JHsaviqTZ3FDit0ZvE0R8ZcW1seONu_b_JxmMRF9LQN6LXqfFBdP1gUDWJlKncvXKjJHV-KCGVfJ8ITvehCJoP-4_3PPfQdPIXKt0KLz2mVvB4IXpjxzEPXOIE2dZOC6swKkpf5ErxyaSMGUGYolmp5t-2Ec12uWeLw4c3FjNThhQ2SgwoGy24GNcGEFOYauziZmgDVC05U9wZVjsp3kusA" 
            };
            
            var r3 = new Restaurant 
            { 
                Name = "The Golden Harvest", 
                Description = "Фермерская • Американская • $$", 
                Rating = 4.7, 
                Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuAf1v9_OEsCcN6Xp4Srp1m84n0XtTQSqg4f12KEob3FpkkMWYw7aFYlGXP-8xs0prvPh1_Xb_aBLEQUhO6SsKDMp3yGVwU_dKlWHG-DbEtbDlvpiTgcXlYAM3GZaO230SOBPqbzOkFYvQcuZekQCXi_dIkW2RncqU4byPdPporvg5YUWfVdutgWXyifR8FMky34cV2A11OE2Bo6Xc-Psp1hO5lnzYxieghBnQ3kt55X_xC9B2BmpLMqrAUdVZ9f8V1u4aoVV7vmMH0" 
            };
            
            var r4 = new Restaurant 
            { 
                Name = "The Prime Cut Steakhouse", 
                Description = "Стейки • Гриль • $$$", 
                Rating = 4.9, 
                Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuAIUBe7VKH3z9CMd9hv_4zziGkPJsvy_wvQPgeDQ1FZgyy2RQkcaW5yjMUFyw-vVcW_m0ru4SWN-hPr6nVH5S0NrLJo89U-lsA8MEdAfdH-EQo4uWzlUcHRh74NlAU1XjlloKbgy0dphNZvEIWX05szWoAlzal-23f8muf7UO4tKkCO5Z7NRS-TYsq2NSf558qYL8Q3Fyk0E_7D6EjitqDVrWNVkZnmCf3qCEmO-T1VfsQAWnYxnsLZSuBpEcK-wFG74DgarnSvNaU" 
            };
            
            var r5 = new Restaurant 
            { 
                Name = "The Burger Joint", 
                Description = "Бургеры • Фастфуд • $", 
                Rating = 4.6, 
                Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuC5vY6TW1TiYj9VQiKEgiHlNyA7RwE6-ZrHFsq2cYH3SNcozGlwpNxUksSArf3IZEnFGt0V0dJ1vUfW75KWZjBpcyA3YMXesaWTic25zGrzI4dM02mkN3yyvYUEP3UsbCbakVGQEicqYdJnxHUR-TMyjGpgAWeNZYQU5rvp26AK5XxURfdCtcgzfRXjYJIR7bsEwlNCWxmEOwTGztLYsH9pKjL7sYGxZwvFd_-y5M0DRO1kzRxG1lVSk7m-DlsVBeCEZfomJpACN60" 
            };

            context.Restaurants.AddRange(r1, r2, r3, r4, r5);
            context.SaveChanges();

            var dishes = new Dish[]
            {
                new Dish { RestaurantId = r1.Id, Name = "Грибное ризотто с трюфелем", Description = "Рис арборио, белые грибы, трюфельное масло, пармезан.", Price = 24.00m, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuCKvwaul0G7SoHN5mWI3YLuODmLdgO-LkVRgKB5kbc09Gat8l3hkgDH4NAt6RcPruQ1vsl5On76qsK2ZMt8WOZ-Ep8S-UcVagZmkF7kyAK4NKmjOkUCQybT_xm2unHhFMb3YeqoVI8U1StV2-uvRGg-TSwfPCsPvGzfKRtlKLuPS_c_xnzcnKsv6r-CAb6jBQnb9V7HtYBVHLeM7VyjjDImdM3LYzC9SQdjQZzV1MU8c3Z1mTHgeOq68aN81QWYlCQ38z8VlpZUJz0", IsRecommended = true },
                new Dish { RestaurantId = r1.Id, Name = "Сырная тарелка", Description = "Ассорти фермерских сыров, соты, сезонный джем.", Price = 18.00m, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuBAWcDYt4wsRFDqeb6MJ1x6wB0bT8vDai0PfLm_uHou8G1DVHdmHHI_y5Ra1btWvmYXYriIFGv0Jncm1vyN_CAhb75wi2_o-w14vbyvJ7Tsy8oKm6CMjblDqnZAyZt-cQRN_X9znj3YjLcXu7bsukBfvJfU_B74i_Vltjs2AW2htzHhm3m3lzf7-j5V1oGWI9XqFhMKd-j6KJjfsrBBvUle6vrhIxR3CADJPoGjpIOjoGKT-FO-NQulFIWtoHSxYrQI4DaAUJoAz6c", IsRecommended = false },
                new Dish { RestaurantId = r1.Id, Name = "Томатный суп", Description = "Запеченные фермерские томаты, чеснок и свежий базилик.", Price = 12.00m, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuBhbduNoYg59lgI1DQ_5fW-fR5YwBn5MveJQdzzpbWXKWP46KRUf58zGyvjbOjBaGN22006blcquhoCEpCH1q-pcLMIFxIYIyUgaQfckYehC1lAv33cKtjacOZVhRn1nWRYXGx9VoAg2OJmhwJjP5PZwKHWo1_syv0zMxnEtuSYxzKgFxDmFlDLflito-qPm1TxceY5DamO_k5U6aA7eG7D2Lq42L12fwXhlQjct5fp1hZGYk-KVJs13h6bjsyXhMgaPX9rWD_2VEY", IsRecommended = false },
                new Dish { RestaurantId = r2.Id, Name = "Сет от шефа (12 шт)", Description = "Свежайшие суши и сашими, отобранные шефом.", Price = 45.00m, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuA--e8tCEd_Qhzv2RQ_SFTevDkyfspPZJn5KdoP-GLCezGovkZLbl-7F2QHfJOOdXwBzr12LF3BrRP0HqOU9pUgWtGiVp7JIsxEHORtmtPSAfuh1ltLFZXU_diuryXT7AJCZni1vnvVtFEVdKLDnBOwl0ztk2AkVR_jCiU2atSILuGPi7jG8bNyGbypSGqRM7CinvgNd7skGoJ6cArQykolFOdaUXx7vfAGxm_bTWuxsmgeDeBCGgOhaV0iuHWKA7KF8OLetg3seyI", IsRecommended = true },
                new Dish { RestaurantId = r2.Id, Name = "Острый ролл с тунцом", Description = "Тунец, спайси соус, огурец, кунжут.", Price = 14.50m, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuDn1E-cK_2kYh27gaqLlusOx3W8D-N3j_ttRBZztMldzvYMcSFbrF6mYQ-MErDTxFXTNsDbuXuLW3OpK5UQkpeN3aLqT13vzhGsXudIkzVCj4C_4jOmcsEzg02otcESiw5MU8GB0t9w75ScGipBG_q6vhR0GFko4iGDISGKQOQJTmoHfQdABHK6LK3eT7o2II83YqG8tL6gJZeZWu0aqXb3a8E2QUmJ2fCwxV44tPUGsa7G45-e3gJcEcGiQktD27atg9ifeySbRaE", IsRecommended = false },
                new Dish { RestaurantId = r3.Id, Name = "Боул 'Урожай'", Description = "Микс батата, кейла, киноа и нута.", Price = 14.95m, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuDSLCgtR3sOKEvei80z9MMpJOPy6A8T0A6qB2HXoUKk5jdW_mIq3Q5Opa0GV6jMbcFRY5wnoOkTKU9Qk64gjNYBqvWyfc8hU6zJrjTrGvRdqt6-SFEr0OdfrEwEUfrP71V4YcJ5012tQ8GmNrj6n0dU5kKa-jf_QNRAUCJY4uOBqNipOf0tm9NEp9eSqWIaw3m50SLr7WoU3GZfGnRIj5UrcFwHNTfJ_kEUh3RoL8KHqjFrzPSDxKsmrj8AV_koJcOWN5T0bx9lv2g", IsRecommended = true },
                new Dish { RestaurantId = r3.Id, Name = "Каре ягненка в травах", Description = "Нежный ягненок в панировке из фисташек.", Price = 42.00m, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuAqZM4eIgKLuHPc6AmBMfbatm0LGVmKYYEQ426-Qg4ZsBB7uuuxSASNONRFMwAwbM2L4D_vEddAiCEHqI__hRIE7Hj-URT-1oKpBhgjTSP8f6EDAs-_8b12-UVF2K71i7LmzV0UXMcB1tbPsWUFa3PVlst_EP1PwpOagDuXYrB1SDzWokrjxoNewZpSK1jg5Sqizqhekt7Pj_37qRnz_CCxcxIF8tvggmW_d5ssw7ih36zG0zP70JnZsNjR4SZ6tIgSHglz9o2m9lY", IsRecommended = true },
                new Dish { RestaurantId = r4.Id, Name = "Стейк Рибай 16oz", Description = "Мраморная говядина сухой выдержки.", Price = 55.00m, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuAIUBe7VKH3z9CMd9hv_4zziGkPJsvy_wvQPgeDQ1FZgyy2RQkcaW5yjMUFyw-vVcW_m0ru4SWN-hPr6nVH5S0NrLJo89U-lsA8MEdAfdH-EQo4uWzlUcHRh74NlAU1XjlloKbgy0dphNZvEIWX05szWoAlzal-23f8muf7UO4tKkCO5Z7NRS-TYsq2NSf558qYL8Q3Fyk0E_7D6EjitqDVrWNVkZnmCf3qCEmO-T1VfsQAWnYxnsLZSuBpEcK-wFG74DgarnSvNaU", IsRecommended = true },
                new Dish { RestaurantId = r5.Id, Name = "Крафтовый бургер", Description = "Котлета из мраморной говядины, сыр чеддер.", Price = 18.50m, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuC5vY6TW1TiYj9VQiKEgiHlNyA7RwE6-ZrHFsq2cYH3SNcozGlwpNxUksSArf3IZEnFGt0V0dJ1vUfW75KWZjBpcyA3YMXesaWTic25zGrzI4dM02mkN3yyvYUEP3UsbCbakVGQEicqYdJnxHUR-TMyjGpgAWeNZYQU5rvp26AK5XxURfdCtcgzfRXjYJIR7bsEwlNCWxmEOwTGztLYsH9pKjL7sYGxZwvFd_-y5M0DRO1kzRxG1lVSk7m-DlsVBeCEZfomJpACN60", IsRecommended = true }
            };

            context.Dishes.AddRange(dishes);
            context.SaveChanges();
        }
    }
}