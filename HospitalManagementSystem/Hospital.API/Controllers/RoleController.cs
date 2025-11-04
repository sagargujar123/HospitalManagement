using Hospital.BAL.Interfaces;
using Hospital.BAL.Services;
using Hospital.Common.Helpers;
using Hospital.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllRolesWithPermissions([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var roles = await _roleService.GetAllRolesAsync(pageNumber, pageSize);
            return Ok(ResponseHelper.Success(roles, RoleMessages.ROLES_RETRIEVED));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoleById(int id)
        {
            var role = await _roleService.GetRoleByIdAsync(id);
            if(role == null)
            {
                return NotFound(ResponseHelper.Failure(RoleMessages.ROLE_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(role, RoleMessages.ROLE_RETRIEVED));
        }


        [HttpPost]
        public async Task<IActionResult> AddRole([FromBody] CreateRoleDto rolesDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdRole = await _roleService.CreateRoleAsync(rolesDto);
            if(createdRole == null)
            {
                return NotFound(ResponseHelper.Failure(RoleMessages.ROLE_ALREADY_EXIST));
            }
            return CreatedAtAction(nameof(GetRoleById), new { id = createdRole.RoleId }, ResponseHelper.Success(createdRole, RoleMessages.ROLE_CREATED));
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRole(int id, [FromBody] CreateRoleDto rolesDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedRole = await _roleService.UpdateRoleAsync(id, rolesDto);

            if (updatedRole == null)
            {
                return NotFound(ResponseHelper.Failure(RoleMessages.ROLE_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(updatedRole, RoleMessages.ROLE_UPDATED));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            var role = await _roleService.DeleteRoleAsync(id);
            if (role == null)
            {
                return NotFound(ResponseHelper.Failure(RoleMessages.ROLE_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(role, RoleMessages.ROLE_DELETED));
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetRoleList()
        {
            var roles = await _roleService.GetRoleListAsync();
            return Ok(ResponseHelper.Success(roles, RoleMessages.ROLES_RETRIEVED));
        }

    }
}
