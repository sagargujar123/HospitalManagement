export interface Permission {
  permissionId: number;
  entityName: string;
  columnName: string;
  isVisible: boolean,
  // canAdd: boolean,
  // canEdit: boolean,
  // canDelete: boolean,
  // canView: boolean,
  roleId: number
}

export interface PermissionResponse {
  statusCode: number;
  message: string;
  data: Permission;
}

