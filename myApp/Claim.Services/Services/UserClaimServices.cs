using System;
using System.Linq.Expressions;
using Claim.Data;
using Claim.Data.Entities;
using Claim.DTO;
using Claim.Services.IServices;
using Microsoft.EntityFrameworkCore;

namespace Claim.Services.Services
{
    public class UserClaimServices : IUserClaimServices
    {

        private readonly AppDbContext _AppDbContext;

        public UserClaimServices(AppDbContext AppDbContext)
        {
            _AppDbContext = AppDbContext;
        }

        public async Task<List<UserClaimDTO>> GetUserClaims(Expression<Func<AppUserClaim, bool>> expression)
        {
            return await (from claim in _AppDbContext.AppUserClaim.Where(expression)
                   select new UserClaimDTO()
                   {
                       ClaimType = claim.ClaimType,
                       ClaimValue = claim.ClaimValue,
                   }).ToListAsync();
        }
    }
}

