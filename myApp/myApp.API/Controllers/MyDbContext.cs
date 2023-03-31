using System;
using Microsoft.EntityFrameworkCore;
using myApp.API.Models;

namespace myApp.API.Controllers
{
	public class MyDbContext : DbContext
    {
		public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
		}
        public DbSet<tempUser> tempUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // configure the tempUser entity
            modelBuilder.Entity<tempUser>().HasKey(u => u.Id);

            // add any other entity configurations here
            // ...

            base.OnModelCreating(modelBuilder);
        }
    }
}

