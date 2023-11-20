using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CartDto
    {
        public int Id {get; set;}
        public string BuyerId {get; set;} = null!;
        
        public List<CartItemDto> Items {get; set;} = null!;

    }
}