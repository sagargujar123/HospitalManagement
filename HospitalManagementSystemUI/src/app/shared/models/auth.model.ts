export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  password: string;
  fullName: string;
  userId: string;
  roleWithPermissions: RoleWithPermissions;
}

export interface RoleWithPermissions {
  roleId: number;
  roleName: string;
  canAdd: boolean,
  canEdit: boolean,
  canDelete: boolean,
  canView: boolean,
  permissions: UserPermission;
}

export type UserPermission = UserPermissions[];

export interface UserPermissions {
  permissionId: number;
  entityName: string;
  columnName: string;
  isVisible: boolean,
  // canAdd: boolean,
  // canEdit: boolean,
  // canDelete: boolean,
  // canView: boolean,
}


export interface AuthResponse {
  statusCode: number;
  message: string;
  data: LoginResponse;
}