using Hospital.BAL.Interfaces;
using Hospital.BAL.Services;
using Hospital.Common.Helpers;
using Hospital.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionService _permissionService;
        private readonly IAuthService _authService;

        public PermissionController(IPermissionService permissionService, IAuthService authService)
        {
            _permissionService = permissionService;
            _authService = authService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var permissions = await _permissionService.GetAllPermissionsAsync(pageNumber, pageSize);
            return Ok(ResponseHelper.Success(permissions, PermissionMessages.PERMISSIONS_RETRIEVED));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPermissionById(int id)
        {
            var permission = await _permissionService.GetPermissionByIdAsync(id);
            if (permission == null)
            {
                return NotFound(ResponseHelper.Failure(PermissionMessages.PERMISSION_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(permission, PermissionMessages.PERMISSION_RETRIEVED));
        }


        [HttpGet("Permissions/{roleId}")]
        public async Task<IActionResult> GetRoleWithPermissions(int roleId)
        {
            var result = await _authService.GetRoleWithPermissions(roleId);
            if (result == null)
            {
                return NotFound("Role with permissions not found");
            }
            return Ok(ResponseHelper.Success(result, "Data retrieved successfully."));
        }


        [HttpPost]
        public async Task<IActionResult> AddPermission([FromBody] CreatePermissionDto permissionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdPermission = await _permissionService.CreatePermissionAsync(permissionDto);
            if (createdPermission == null)
            {
                return NotFound(ResponseHelper.Failure(PermissionMessages.PERMISSION_ALREADY_EXIST));
            }
            return CreatedAtAction(nameof(GetPermissionById), new { id = createdPermission.RoleId }, ResponseHelper.Success(createdPermission, PermissionMessages.PERMISSION_CREATED));
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePermission(int id, [FromBody] CreatePermissionDto permissionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedPermission = await _permissionService.UpdatePermissionAsync(id, permissionDto);

            if (updatedPermission == null)
            {
                return NotFound(ResponseHelper.Failure(PermissionMessages.PERMISSION_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(updatedPermission, PermissionMessages.PERMISSION_UPDATED));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePermission(int id)
        {
            var permission = await _permissionService.DeletePermissionAsync(id);
            if (permission == null)
            {
                return NotFound(ResponseHelper.Failure(PermissionMessages.PERMISSION_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(permission, PermissionMessages.PERMISSION_DELETED));
        }
    }
}
