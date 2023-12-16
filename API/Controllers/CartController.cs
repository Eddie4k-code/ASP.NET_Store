using API.Data;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Controllers {

    
    public class CartController : BaseApiController {

        private readonly StoreContext _context;


        public CartController(StoreContext context) {

            this._context = context;

        }

        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDto>> GetCart() {

            var cart = await FindIfCartExists();


            if (cart == null) {
                return NotFound();
            }

            return new CartDto
            {
                Id = cart.Id,
                BuyerId = cart.BuyerId,
                Items = cart.Items.Select(item => new CartItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };

            
        }

        [HttpPost] 
        public async Task<ActionResult<CartDto>> AddItemToCart(int productId, int quantity)
        {
            //get the cart 
            var cart = await FindIfCartExists();

            //if user does not have one we need to create it.
            if (cart == null) {
                cart = CreateCart();
            }

            


            // get the product
            var product = await this._context.Products.FindAsync(productId);

            if (product == null) {
                return NotFound();
            }


            //add the product
            cart.AddItem(product, quantity);

            //save changes
            var result = await this._context.SaveChangesAsync() > 0;

            if (result) {
                return CreatedAtRoute("GetCart", MapCartToDto(cart));
            } else {
                return BadRequest(new ProblemDetails{Title = "Problem Saving Item to Cart."});
            }
            

            
        }

       

        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity) {
         
            var cart = await FindIfCartExists();
            

    
            if (cart == null) {
                return NotFound();
            }

            cart.RemoveItem(productId, quantity);

            var result = await this._context.SaveChangesAsync() > 0;

            if (result) {
                return Ok();
            } else {
                return BadRequest(new ProblemDetails{Title = "Problem removing an item in the cart"});
            }




    

        } 

         private async Task<Cart> FindIfCartExists()
        {
            var cart = await _context.Carts
                        .Include(i => i.Items)
                        .ThenInclude(p => p.Product)
                        .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);

            return cart;
        }

        private Cart CreateCart()
        {
            //generate a buyer id
            var buyerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};


            //Add cookie to response
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);


            var newCart = new Cart{BuyerId = buyerId};


            this._context.Carts.Add(newCart);

            return newCart;




        }

        private CartDto MapCartToDto(Cart cart) {
            
            return new CartDto
            {
                Id = cart.Id,
                BuyerId = cart.BuyerId,
                Items = cart.Items.Select(item => new CartItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }



    }

}