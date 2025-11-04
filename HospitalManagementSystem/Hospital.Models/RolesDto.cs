namespace Hospital.Models
{
    public class RolesDto
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public bool CanAdd { get; set; }
        public bool CanEdit { get; set; }
        public bool CanDelete { get; set; }
        public bool CanView { get; set; }
        public List<PermissionsDto> Permissions { get; set; }
    }

    public class CreateRoleDto
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public bool CanAdd { get; set; }
        public bool CanEdit { get; set; }
        public bool CanDelete { get; set; }
        public bool CanView { get; set; }
    }

    public class AuthRolePermissionsDto
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public bool CanAdd { get; set; }
        public bool CanEdit { get; set; }
        public bool CanDelete { get; set; }
        public bool CanView { get; set; }
        public List<AuthPermissionDto> Permissions { get; set; }
    }
}
