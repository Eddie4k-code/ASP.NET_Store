using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.RequestHelpers
{
    /* A list that contains items and pagination information!*/
    public class PagedList<T> : List<T>
    {


        public MetaData MetaData {get; set;} = null!;


        public PagedList(List<T> items, int count, int pageNumber, int pageSize) {
            MetaData = new MetaData 
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };

            AddRange(items);
        }

        //makes a list that contains the pagination information along with the queried items

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize) {
            var count = await query.CountAsync(); //run query against db that was placed as argument
            var items = await query.Skip((pageNumber-1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedList<T>(items, count, pageNumber, pageSize);
        } 



        
    }
}