using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions
{
    /* Extensions for a Product Query */

    //Anything we do against the product model for querying, will be done from this class
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy) 
        {
            //sort product by price extension

            if (query == null || string.IsNullOrWhiteSpace(orderBy)) {
                return query!.OrderBy(p => p.Name);
            }
            

           
            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)

            };

            return query;


        }


        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm) {
            //search a product based on keyword extension 

            if (string.IsNullOrWhiteSpace(searchTerm)) {
                return query;
            }

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));

            




        }

        public static IQueryable<Product> Filter
        (
            this IQueryable<Product> query, 
            string brands, 
            string types
        ) {


            List<string> brandList = new();
            List<string> typeList = new();

           return query;


        }
        
    }
}