using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {

        private readonly StoreContext _context;

        public ProductController(StoreContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts() {
            var products = await this._context.Products.ToListAsync<Product>();

            return Ok(products);
        }

        [HttpGet("{id}")]
         public async Task<ActionResult<Product>> GetProduct(int id) {

            var product = await this._context.Products.FindAsync(id);

            if (product == null) {
                return NotFound();
            }

            return Ok(product);

        }


        
    }
}