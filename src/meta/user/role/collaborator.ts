import { RoleName } from 'meta/user/role/name'
import { UserRoleBaseProps } from 'meta/user/role/props'
import { UserRole } from 'meta/user/role/role'

export enum CollaboratorEditPropertyType {
  tableData = 'tableData',
  descriptions = 'descriptions',
}

export type CollaboratorPermissions = {
  [CollaboratorEditPropertyType.tableData]: Array<string>
  [CollaboratorEditPropertyType.descriptions]: Array<string>
}

export type Collaborator = UserRole<RoleName.COLLABORATOR, UserRoleBaseProps, CollaboratorPermissions>
