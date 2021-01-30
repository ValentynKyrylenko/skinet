using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        // Request delegate function processes HTTP requests (If there is no exeption we want middleware to move to next middleware)
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;

        }
        // use a middleware method
        public async Task InvokeAsync(HttpContext context)
        {
            try{
               await _next(context);
            }
            catch (Exception ex)
            {
                //Exception method wil be put into our logging system (console) We will also write our own message into the context response to send it to the client
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                //this way we set the Status code to be 500 Internal server error
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                //writing our response
                //before check if we are in development mode
                // one response for development, the other for production
                var response = _env.IsDevelopment()
                ? new ApiException((int)HttpStatusCode.InternalServerError, ex.Message,
                ex.StackTrace.ToString())
                : new ApiException((int)HttpStatusCode.InternalServerError);

                //Giving our json some options
                var options = new JsonSerializerOptions{PropertyNamingPolicy =
                JsonNamingPolicy.CamelCase};
                
                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}