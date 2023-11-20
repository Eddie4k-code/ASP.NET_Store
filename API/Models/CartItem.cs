using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models {

    /* Model for a singular cart item */
    [Table("CartItems")]
    public class CartItem 
    {


        public int Id {get; set;}

        public int Quantity {get; set;}

        public int ProductId {get; set;}

        public Product Product {get; set;} = null!;

        public int CartId {get; set;} 

        public Cart Cart {get; set;} = null!;




    }


}