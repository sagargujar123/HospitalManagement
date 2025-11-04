using Hospital.Models;

namespace Hospital.BAL.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> AuthenticateAsync(AuthRequestDto request);
        Task<AuthRolePermissionsDto> GetRoleWithPermissions(int roleId);
    }
}
