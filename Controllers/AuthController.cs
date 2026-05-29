using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FoodDelivery.Models;
using System.Text.RegularExpressions;

namespace FoodDelivery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] AuthRequest request)
        {
            var email = request.Email?.Trim().ToLower() ?? "";
            var name = request.Name?.Trim() ?? "";

            if (string.IsNullOrWhiteSpace(name) || name.Length < 2 || name.Length > 50 || name.Contains("--") || name.Contains("  ") || Regex.IsMatch(name, @"(.)\1{3,}") || !Regex.IsMatch(name, @"^[a-zA-Zа-яА-ЯёЁ\s\-]+$"))
                return BadRequest(new { message = "Некорректное имя пользователя. Используйте только буквы, пробел или дефис (от 2 до 50 символов)." });

            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == email))
                return BadRequest(new { message = "Email уже используется" });

            var user = new User
            {
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Name = name
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { token = GenerateJwtToken(user), user = new { user.Name, user.Email } });
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] AuthRequest request)
        {
            var email = request.Email?.Trim().ToLower() ?? "";
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return Unauthorized(new { message = "Неверный email или пароль" });

            return Ok(new { token = GenerateJwtToken(user), user = new { user.Name, user.Email } });
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]!);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.Name)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}