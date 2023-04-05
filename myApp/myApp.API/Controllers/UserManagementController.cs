using Claim.Common.BindingModel;
using System;
using Claim.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Claim.Data.Entities;
using Claim.Helper;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace myApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagement : ControllerBase
    {
        // SignInManager is a concrete class responsible for authenticating a user
        // (signing in and signing out our user)
        private readonly SignInManager<AppUser> _signInManager;

        // UserManager is a concrete class that manages that user
        // (this class create, update and delete our user)
        private readonly UserManager<AppUser> _userManager;

        private readonly RoleManager<IdentityRole<int>> _roleManager;


        public UserManagement(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        //[HttpPost("RegisterUser")]
        //public async Task<ActionResult<UserDTO>> RegisterUser([FromBody] RegisterBindingModel model)
        //{
        //    try
        //    {
        //        // Replace empty string with default role "User"
        //        if (model.Roles == null || model.Roles.Contains(""))
        //        {
        //            model.Roles = new List<string>() { "User" };
        //        }

        //        // Validate the roles
        //        foreach (var role in model.Roles)
        //        {
        //            if (!await _roleManager.RoleExistsAsync(role))
        //            {
        //                return BadRequest("Role does not exist");
        //            }
        //            if (string.Equals(role, "Admin", StringComparison.OrdinalIgnoreCase) ||
        //                string.Equals(role, "Employee", StringComparison.OrdinalIgnoreCase))
        //            {
        //                return BadRequest("You are not authorized to assign this role.");
        //            }

        //        }

        //        // Create the user
        //        var user = new AppUser() { FullName = model.FullName, Email = model.Email, UserName = model.Email, DateCreated = DateTime.UtcNow, DateModified = DateTime.UtcNow };
        //        var result = await _userManager.CreateAsync(user, model.Password);

        //        if (result != null && result.Succeeded)
        //        {
        //            var tempUser = await _userManager.FindByEmailAsync(model.Email);
        //            var userClaims = new List<UserClaimDTO>();
        //            foreach (var role in model.Roles)
        //            {
        //                userClaims.Add(new UserClaimDTO { ClaimType = role, ClaimValue = role });
        //                await _userManager.AddToRoleAsync(tempUser, role);
        //            }

        //            var userDTO = new UserDTO()
        //            {
        //                FullName = tempUser.FullName,
        //                Email = tempUser.Email,
        //                Role = "User",
        //                Claims = userClaims,
        //                Token = GenerateToken(tempUser, userClaims)
        //            };

        //            return Ok(userDTO);
        //        }
        //        else
        //        {
        //            var errorMessages = result.Errors.Select(e => e.Description).ToArray();
        //            return BadRequest(errorMessages);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        // Functional Register (no matter which role you set it automatically creates a new "User")
        [HttpPost("Register")]
        public async Task<ActionResult<UserDTO>> Register([FromBody] RegisterBindingModel model)
        {
            try
            {
                var user = new AppUser()
                {
                    Id = model.Id, // Assign the ID property from the model to the Id property of the AppUser object
                    UserName = model.Email,
                    Email = model.Email,
                    FullName = model.FullName
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "User"); // Assign "User" role to the new user

                    var userDTO = new UserDTO
                    {
                        Id = user.Id,
                        FullName = user.FullName,
                        Email = user.Email,
                        Role = "User", // Set the role to "User"
                        Token = GenerateToken(user)
                    };

                    return userDTO;
                }
                else
                {
                    return BadRequest(result.Errors.FirstOrDefault()?.Description);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        //      [HttpPost("Login")]
        //public async Task<ActionResult<UserDTO>> Login([FromBody] LoginBindingModel model)
        //{
        //	try
        //	{
        //		var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
        //		var userDTO = new UserDTO();
        //		if(result != null && result.Succeeded)
        //		{
        //			var tempUser = await _userManager.FindByEmailAsync(model.Email);
        //			var tempUserClaims = _userManager.GetClaimsAsync(tempUser).Result.ToList();
        //			userDTO.Claims = new List<UserClaimDTO>();
        //			foreach(var claim in tempUserClaims)
        //			{
        //				userDTO.Claims.Add(new UserClaimDTO() { ClaimType = claim.Type, ClaimValue = claim.Value });
        //			}
        //			string role = _userManager.GetRolesAsync(tempUser).Result.FirstOrDefault() ?? "";
        //			if(role==Constants.ROLE_ADMIN)
        //			{
        //				userDTO.Claims.Add(new UserClaimDTO() { ClaimType = Constants.ROLE_ADMIN, ClaimValue = role });
        //			}
        //                  if (role == Constants.ROLE_EMPLOYEE)
        //                  {
        //                      userDTO.Claims.Add(new UserClaimDTO() { ClaimType = Constants.ROLE_EMPLOYEE, ClaimValue = role });
        //                  }

        //			userDTO.FullName = tempUser.FullName;
        //			userDTO.Role = role;
        //			userDTO.Email = tempUser.Email;
        //			userDTO.Token = GenerateToken(tempUser, userDTO.Claims);

        //			return userDTO;
        //              }
        //		else
        //		{
        //			return BadRequest("Email or password is incorrect");
        //		}
        //	}
        //	catch(Exception ex)
        //	{
        //		return BadRequest(ex.Message);
        //	}
        //}

        [HttpPost("Login")]
        public async Task<ActionResult<UserDTO>> Login([FromBody] LoginBindingModel model)
        {
            try
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
                var userDTO = new UserDTO();
                if (result != null && result.Succeeded)
                {
                    var tempUser = await _userManager.FindByEmailAsync(model.Email);
                    string role = _userManager.GetRolesAsync(tempUser).Result.FirstOrDefault() ?? "";
                    userDTO.FullName = tempUser.FullName;
                    userDTO.Role = role;
                    userDTO.Email = tempUser.Email;
                    userDTO.Token = GenerateToken(tempUser);

                    return userDTO;
                }
                else
                {
                    return BadRequest("Email or password is incorrect");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[Authorize]
        [HttpGet("GetAllUser")]
        public async Task<ActionResult<List<UserDTO>>> GetAllUser()
        {
            try
            {
                var users = await _userManager.Users.ToListAsync();
                var userDTOs = users.Select(user => new UserDTO
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = _userManager.GetRolesAsync(user).Result.FirstOrDefault() ?? "",
                    Token = "",
                    //Claims = new List<UserClaimDTO>()
                }).ToList();
                return Ok(userDTOs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpPost("CreateUser")]
        //public async Task<ActionResult<UserDTO>> CreateUser([FromBody] RegisterBindingModel model)
        //{
        //    try
        //    {
        //        if (model.Roles == null)
        //        {
        //            return BadRequest("Roles are missing");
        //        }

        //        foreach (var role in model.Roles)
        //        {
        //            if (!await _roleManager.RoleExistsAsync(role))
        //            {
        //                return BadRequest("Role does not exist");
        //            }
        //        }

        //        var user = new AppUser() { FullName = model.FullName, Email = model.Email, UserName = model.Email, DateCreated = DateTime.UtcNow, DateModified = DateTime.UtcNow };
        //        var result = await _userManager.CreateAsync(user, model.Password);

        //        if (result != null && result.Succeeded)
        //        {
        //            var tempUser = await _userManager.FindByEmailAsync(model.Email);
        //            var userClaims = new List<UserClaimDTO>();
        //            foreach (var role in model.Roles)
        //            {
        //                userClaims.Add(new UserClaimDTO { ClaimType = role, ClaimValue = role });
        //                await _userManager.AddToRoleAsync(tempUser, role);
        //            }

        //            var userDTO = new UserDTO()
        //            {
        //                FullName = tempUser.FullName,
        //                Email = tempUser.Email,
        //                Role = model.Roles.FirstOrDefault(), // Return the first role
        //                //Claims = userClaims,
        //                Token = GenerateToken(tempUser, userClaims)
        //            };

        //            return Ok(userDTO);
        //        }
        //        else
        //        {
        //            var errorMessages = result.Errors.Select(e => e.Description).ToArray();
        //            return BadRequest(errorMessages);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        [HttpPut("UpdateUserRole/{userId}")]
        public async Task<ActionResult> UpdateUserRole(string userId, [FromBody] string newRole)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return NotFound($"User with Id = {userId} not found.");
                }

                var currentRoles = await _userManager.GetRolesAsync(user);
                var result = await _userManager.RemoveFromRolesAsync(user, currentRoles);
                if (!result.Succeeded)
                {
                    return BadRequest($"Failed to remove user {user.Email} from roles.");
                }

                result = await _userManager.AddToRoleAsync(user, newRole);
                if (!result.Succeeded)
                {
                    return BadRequest($"Failed to add user {user.Email} to role {newRole}.");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
            {
                return NoContent();
            }

            return BadRequest(result.Errors);
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost("AddUser")]
        public async Task<ActionResult<UserDTO>> AddUser([FromBody] AddUserBindingModel model)
        {
            try
            {
                var user = new AppUser()
                {
                    Id = model.Id,
                    UserName = model.Email,
                    Email = model.Email,
                    FullName = model.FullName
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    if (!string.IsNullOrEmpty(model.Role))
                    {
                        await _userManager.AddToRoleAsync(user, model.Role);
                    }
                    else
                    {
                        await _userManager.AddToRoleAsync(user, "User");
                    }

                    var userDTO = new UserDTO
                    {
                        Id = user.Id,
                        FullName = user.FullName,
                        Email = user.Email,
                        Role = model.Role ?? "User",
                        Token = GenerateToken(user)
                    };

                    return userDTO;
                }
                else
                {
                    return BadRequest(result.Errors.FirstOrDefault()?.Description);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        //      private string GenerateToken(AppUser appuser, List<UserClaimDTO> userClaims)
        //{
        //	var claims = new List<System.Security.Claims.Claim>
        //	{
        //		new System.Security.Claims.Claim(JwtRegisteredClaimNames.Sub, appuser.Id.ToString()),
        //              new System.Security.Claims.Claim(JwtRegisteredClaimNames.Name, appuser.UserName),
        //              new System.Security.Claims.Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        //          };

        //	var roleClaims = userClaims.Select(c => new System.Security.Claims.Claim(c.ClaimType, c.ClaimValue));
        //	claims.AddRange(roleClaims);
        //	var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Constants.SECRET_KEY));
        //	var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //	var token = new JwtSecurityToken(
        //		issuer: Constants.Issuer,
        //		audience: Constants.Audience,
        //		claims: claims,
        //		expires: DateTime.Now.AddDays(30),
        //		signingCredentials:cred
        //		);
        //	return new JwtSecurityTokenHandler().WriteToken(token);
        //      }

        private string GenerateToken(AppUser appuser)
        {
            var claims = new List<System.Security.Claims.Claim>
    {
        new System.Security.Claims.Claim(JwtRegisteredClaimNames.Sub, appuser.Id.ToString()),
        new System.Security.Claims.Claim(JwtRegisteredClaimNames.Name, appuser.UserName),
        new System.Security.Claims.Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
    };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Constants.SECRET_KEY));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: Constants.Issuer,
                audience: Constants.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: cred
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}

