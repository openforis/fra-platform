import { CollaboratorPermissions, CollaboratorSectionsPermission } from 'meta/user'
import { CollaboratorPermissionsNEW } from 'meta/user/userRole'

import { BaseProtocol } from 'server/db'
import { Logger } from 'server/utils/logger'
//
// const _fixInvitations = async () => {
//   await DB.query(`
//     alter table public.users_invitation add permissions jsonb;
//     alter table public.users_invitation drop column props;
//   `)
// }

const _fixPermissions = (permission: CollaboratorPermissions): CollaboratorPermissionsNEW => {
  // -- Cases:
  // -- {"sections": "all"}
  // -- {"sections": "none"}
  // -- {"sections": {"edaa5b7c7dbb44b29614Fb379c145af2": {"tableData": true, "descriptions": true}}}
  // -- If: all or none => { tableData: 'all' or 'none', descriptions: 'all' or 'none' }
  // -- If typeof sections === 'object' then
  // -- 1. const fixedKey = sectionUuid.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/g, '$1-$2-$3-$4-$5')
  // -- 2. convert to format: { tableData: [sectionUuid..], descriptions: [sectionUuid2..] }

  // Case 1: all permissions
  if (permission.sections === 'all') {
    return {
      tableData: ['all'],
      descriptions: ['all'],
    }
  }

  // Case 2: none permissions
  if (permission.sections === 'none') {
    return {
      tableData: ['none'],
      descriptions: ['none'],
    }
  }

  // Case 3: object with section UUIDs
  if (typeof permission.sections === 'object' && permission.sections !== null) {
    const tableDataSections: Array<string> = []
    const descriptionsSections: Array<string> = []

    Object.keys(permission.sections).forEach((sectionUuid) => {
      // Fix UUID format: add dashes
      const fixedKey = sectionUuid.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/g, '$1-$2-$3-$4-$5')

      const sectionPerms = (permission.sections as CollaboratorSectionsPermission)[sectionUuid]
      if (sectionPerms.tableData) {
        tableDataSections.push(fixedKey)
      }
      if (sectionPerms.descriptions) {
        descriptionsSections.push(fixedKey)
      }
    })

    return {
      tableData: tableDataSections,
      descriptions: descriptionsSections,
    }
  }

  Logger.error(`Permissions did not match any case! ${JSON.stringify(permission)}`)
  throw new Error('Permission update failed')
}

const _getRoles = (client: BaseProtocol) => {
  return client.manyOrNone(`select * from users_role ur where permissions ->> 'sections' is not null`)
}

const _fixRoles = async (client: BaseProtocol) => {
  const roles = await _getRoles(client)
  if (roles.length === 0) {
    Logger.info(`Info: users_role table has been already updated. No roles found.`)
    return
  }

  // Todo write db:
  // await Promise.all or each

  roles.forEach((role) => {
    const { permissions } = role
    const fixedPermissions = _fixPermissions(permissions)

    console.log('-----------------------------------------------------------------------------')
    console.log('broken permissions')
    console.log(permissions)
    console.log('-----------------------------------------------------------------------------')
    console.log('fixed permissions')
    console.log(fixedPermissions)
    console.log('-----------------------------------------------------------------------------')
  })
}

export default async (client: BaseProtocol) => {
  // await _fixInvitations()
  await _fixRoles(client)
}
