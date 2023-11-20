namespace API.Models {

/* Model for a users cart */
public class Cart
{
    public int Id {get; set;}


    public string BuyerId {get; set;} = null!;

    public List<CartItem> Items {get; set;} = new List<CartItem>();


    public void AddItem(Product product, int quantity) {
        if (this.Items.All(item => item.ProductId != product.Id)) {
            Items.Add(new CartItem{Product = product, Quantity = quantity, ProductId = product.Id});
        }

        //item already in cart
        var existingProductInCart = this.Items.FirstOrDefault(item => item.ProductId == product.Id);

        if (existingProductInCart != null) {
            existingProductInCart.Quantity ++;
        }


    }


    public void RemoveItem(int productId, int quantity) {

        var cartItem = this.Items.FirstOrDefault(item => item.ProductId == productId);

        if (cartItem == null) {
            return;
        }
        //Decrease the quantity.
        cartItem.Quantity --;

        //Cant have negative quantity so we need to remove it totally.
        if (cartItem.Quantity == 0) {
            this.Items.Remove(cartItem);
            return;
        }

        



    } 


}

}