using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.RequestHelpers;
using Microsoft.AspNetCore.Http;

namespace api.Extensions
{
    /* Extensions for Http Responses or Requests */
    public static class HttpExtensions
    {

        public static void AddPaginationHeader(this HttpResponse response, MetaData metaData) {
            

            //Add Pagination header that contains metadata about the page
             response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData)); 
             response.Headers.Add("Access-Control-Expose-Headers", "Pagination"); //We want this cors header to be available to our client. (a diff domain)

        }
        
    }
}