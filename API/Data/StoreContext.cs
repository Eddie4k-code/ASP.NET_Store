
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User>
    {

        public StoreContext(DbContextOptions options) : base(options) {



        }
        
        //DB Set for the Product Model representing the Product Table in the DB.
        public DbSet<Product> Products {get; set;}

        public DbSet<Cart> Carts {get; set;}


        //Add different identity roles to database (member and admin)
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole{Name = "Member", NormalizedName = "MEMBER"},
                    new IdentityRole{Name = "Admin", NormalizedName = "ADMIN"}
                );
        }

    }
}