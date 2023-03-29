using System;
using System.Linq.Expressions;
using Claim.Data.Entities;
using Claim.DTO;

namespace Claim.Services.IServices
{
    public interface IUserClaimServices
    {
        Task<List<UserClaimDTO>> GetUserClaims(Expression<Func<AppUserClaim, bool>> expression);
    }
}

