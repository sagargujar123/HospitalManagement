namespace Hospital.Models
{
    public class PermissionsDto
    {
        public int PermissionId { get; set; }
        public string EntityName { get; set; }
        public string ColumnName { get; set; }
        public bool IsVisible { get; set; }
        public bool CanEdit { get; set; }
        public bool CanDelete { get; set; }
        public bool CanView { get; set; }
        public int RoleId { get; set; }
    }
}
