import { Permission } from "./permission.model";

export interface Role {
  roleId: number;
  roleName: string;
  canAdd: boolean,
  canEdit: boolean,
  canDelete: boolean,
  canView: boolean,
  permissions?: Permission[];
}

export interface RoleResponse {
  statusCode: number;
  message: string;
  data: Role;
}

export interface mappedRole {
  id: number;
  name: string;
}