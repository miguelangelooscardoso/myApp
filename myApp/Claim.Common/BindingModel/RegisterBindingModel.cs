using System;
namespace Claim.Common.BindingModel
{
	public class RegisterBindingModel
	{
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<string> Roles { get; set; }
    }
}

