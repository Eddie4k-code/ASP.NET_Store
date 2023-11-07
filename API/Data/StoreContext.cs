
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {

        public StoreContext(DbContextOptions options) : base(options) {



        }
        
        //DB Set for the Product Model representing the Product Table in the DB.
        public DbSet<Product> Products {get; set;}


        
    }
}