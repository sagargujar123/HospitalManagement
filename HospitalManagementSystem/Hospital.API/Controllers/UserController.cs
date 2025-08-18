using Hospital.BAL.Interfaces;
using Hospital.Common.Helpers;
using Hospital.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUser([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var users = await _userService.GetAllUserAsync(pageNumber, pageSize);
            return Ok(ResponseHelper.Success(users, UserMessages.USERS_RETRIEVED));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if(user == null)
            {
                return NotFound(ResponseHelper.Failure(UserMessages.USER_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(user, UserMessages.USERS_RETRIEVED));
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] UserDto userDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdUser = await _userService.AddUserAsync(userDto);

            if(createdUser == null)
            {
                return BadRequest(ResponseHelper.BadRequestError(UserMessages.USER_ALREADY_EXIST));
            }

            return CreatedAtAction(nameof(GetUserById),new { id = createdUser.UserId }, ResponseHelper.Success(createdUser, UserMessages.USER_CREATED));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedUser = await _userService.UpdateUserAsync(id, userDto);

            if(updatedUser == null)
            {
                return NotFound(ResponseHelper.Failure(UserMessages.USER_NOT_FOUND));
            }

            return Ok(ResponseHelper.Success(updatedUser, UserMessages.USER_UPDATED));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deletedUser = await _userService.DeleteUserAsync(id);

            if(deletedUser == null)
            {
                return NotFound(ResponseHelper.Failure(UserMessages.USER_NOT_FOUND));
            }

            return Ok(ResponseHelper.Success(deletedUser, UserMessages.USER_DELETED));
        }
    }
}
