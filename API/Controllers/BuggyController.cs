using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using API.Controllers;

namespace API.Controllers
{

    public class BuggyController : BaseApiController {

        [HttpGet("get-not-found")]
        public ActionResult GetNotFound() {
            return NotFound();
        }

         [HttpGet("get-bad-request")]
        public ActionResult GetBadRequest() {
            return BadRequest("This is a bad request");
        }

         [HttpGet("not-authorized")]
        public ActionResult GetUnauthorized() {
            return Unauthorized("NOT AUTHORIZED");
        }

         [HttpGet("validation-error")]
        public ActionResult GetValidationError() {
            return ValidationProblem();
        }

         [HttpGet("server-error")]
        public ActionResult GetServerError() {
            throw new Exception("Server Error created by me");
        }


    }


}