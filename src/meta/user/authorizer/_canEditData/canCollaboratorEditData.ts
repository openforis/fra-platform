import { Objects } from 'utils/objects'

import { CanEditDataProps } from 'meta/user/authorizer/_canEditData/types'
import { Collaborator, CollaboratorEditPropertyType } from 'meta/user/userRole'
import { Users } from 'meta/user/users'

export const canCollaboratorEditData = (props: CanEditDataProps): boolean => {
  const { country, cycle, permission, section, user } = props
  const { countryIso } = country
  const role = Users.getRole(user, countryIso, cycle) as Collaborator

  if (Objects.isNil(section)) {
    return (
      !role.permissions[CollaboratorEditPropertyType.descriptions].includes('none') &&
      !role.permissions[CollaboratorEditPropertyType.tableData].includes('none')
    )
  }

  const permissions = role.permissions[permission ?? CollaboratorEditPropertyType.tableData]
  return permissions.includes('all') || permissions.includes(section.uuid)
}
