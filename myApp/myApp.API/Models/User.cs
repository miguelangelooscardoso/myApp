using System;

namespace myApp.API.Models
{
    //public class User
    //{
    //       public int Id { get; set; }
    //       public string FirstName { get; set; } = string.Empty;
    //       public string LastName { get; set; } = string.Empty;
    //       public string Email { get; set; } = string.Empty;
    //       public string Address { get; set; } = string.Empty;
    //       public string Mobile { get; set; } = string.Empty;
    //       public string Password { get; set; } = string.Empty;
    //       public string CreatedAt { get; set; } = string.Empty;
    //       public string ModifiedAt { get; set; } = string.Empty;
    //   }
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string UserName { get; set; }
        public string NormalizedUserName { get; set; }
        public string Email { get; set; }
        public string NormalizedEmail { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string ConcurrencyStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
    }

}

