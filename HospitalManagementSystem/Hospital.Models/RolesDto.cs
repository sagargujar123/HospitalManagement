namespace Hospital.Models
{
    public class RolesDto
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public List<PermissionsDto> Permissions { get; set; }
    }
}
