using System.Text.Json;
using api.Extensions;
using api.RequestHelpers;
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
        public async Task<ActionResult<PagedList<Product>>> GetProducts
        (
            [FromQuery] string? orderBy, 
            [FromQuery] string? searchTerm,
            [FromQuery] PaginationParams paginationParams
        ) {
            //var products = await this._context.Products.ToListAsync<Product>();

            //use our extension method we created to query
            var query = this._context.Products
                .Sort(orderBy)
                .Search(searchTerm)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, paginationParams.PageNumber, paginationParams.PageSize);

            Response.AddPaginationHeader(products.MetaData); //add pagination info in header


           


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