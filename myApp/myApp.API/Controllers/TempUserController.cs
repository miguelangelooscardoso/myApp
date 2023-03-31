using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Claim.Helper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using myApp.API.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace myApp.API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class TempUserController : ControllerBase
    {
        private readonly MyDbContext Context;

        public TempUserController(MyDbContext context)
        {
            Context = context;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] tempUser formParams)
        {
            var tempuser = await Context.tempUsers.SingleOrDefaultAsync(x => x.Username == formParams.Username);

            if (tempuser == null)
                return BadRequest(new { message = "Log in failed" });

            var passwordHasher = new PasswordHasher<tempUser>();
            if (passwordHasher.VerifyHashedPassword(tempuser, tempuser.Password, formParams.Password) != PasswordVerificationResult.Success)
                return BadRequest(new { message = "Log in failed" });

            if (tempuser.Status != "Active")
                return BadRequest(new { message = "Registration has not been confirmed" });

            tempuser.Token = CreateToken(tempuser);
            tempuser.RefreshToken = CreateRefreshToken();
            tempuser.RefreshTokenExpiry = DateTime.Now.AddDays(7);
            Context.SaveChanges();

            tempuser.Password = null;

            return Ok(tempuser);
        }


        private string CreateToken(tempUser tempuser)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Constants.SECRET_KEY);
            var identity = new ClaimsIdentity(new System.Security.Claims.Claim[]
                {
            new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, tempuser.Role)
                });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddMinutes(2),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private string CreateRefreshToken()
        {
            var randomNum = new byte[64];
            using (var generator = RandomNumberGenerator.Create())
            {
                generator.GetBytes(randomNum);
                return Convert.ToBase64String(randomNum);
            }
        }

        private string CreateConfirmationToken()
        {
            var randomNum = new byte[64];
            using (var generator = RandomNumberGenerator.Create())
            {
                generator.GetBytes(randomNum);
                var tempString = Convert.ToBase64String(randomNum);
                return tempString.Replace("\\", "").Replace("+", "").Replace("=", "").Replace("/", "");
            }
        }
    }
}

