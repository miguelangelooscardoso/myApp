using Claim.Services.IServices;
using System;
using Microsoft.AspNetCore.Mvc;
using Claim.Helper;
using Microsoft.AspNetCore.Authorization;

namespace myApp.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserClaimController:ControllerBase
	{

		private readonly IUserClaimServices _userClaimServices;

        public UserClaimController(IUserClaimServices userClaimServices)
		{
			_userClaimServices = userClaimServices;
        }

		[Authorize]
		[HttpGet("GetAdminClaims")]
		public async Task<IActionResult> GetAdminClaims()
		{
			var result = await _userClaimServices.GetUserClaims(x => x.ClaimType == Constants.ROLE_ADMIN || x.ClaimType == Constants.ROLE_EMPLOYEE);
			return Ok(result);
		}

		[HttpGet("GetEmployeeClaims")]
		public async Task<IActionResult> GetEmployeeClaims()
		{
			var result = await _userClaimServices.GetUserClaims(x => x.ClaimType == Constants.ROLE_EMPLOYEE);
			return Ok(result);
		}
	}
}

