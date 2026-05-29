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
            if (string.IsNullOrWhiteSpace(request.Name) || request.Name.Length < 2 || request.Name.Length > 50 || request.Name.Contains("--") || request.Name.Contains("  ") || Regex.IsMatch(request.Name, @"(.)\1{3,}") || !Regex.IsMatch(request.Name, @"^[a-zA-Zа-яА-ЯёЁ\s\-]+$"))
                return BadRequest(new { message = "Некорректное имя пользователя. Используйте только буквы, пробел или дефис (от 2 до 50 символов)." });

            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
                return BadRequest(new { message = "Email уже используется" });

            var user = new User
            {
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Name = request.Name.Trim()
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { token = GenerateJwtToken(user), user = new { user.Name, user.Email } });
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] AuthRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
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