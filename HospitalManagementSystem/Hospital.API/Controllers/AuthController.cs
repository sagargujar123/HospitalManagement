using Azure;
using Hospital.BAL.Interfaces;
using Hospital.Common.Helpers;
using Hospital.Models;
using Microsoft.AspNetCore.Mvc;



namespace Hospital.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthRequestDto request)
        {
            var response = await _authService.AuthenticateAsync(request);
            if (response == null)
            {
                return Unauthorized(ResponseHelper.Unauthorize(UserMessages.INVALID_CREDENTIALS));
            }
            return Ok(ResponseHelper.Success(response, UserMessages.USER_LOGIN));
        }

    }
}
