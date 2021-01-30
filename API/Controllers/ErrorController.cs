using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // we overide the routes that we get from our BaseApi controller
    [Route("errors/{code}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : BaseApiController
    {
        public IActionResult Error (int code)
        {
            return new ObjectResult (new ApiResponse(code));
        }
    }
}