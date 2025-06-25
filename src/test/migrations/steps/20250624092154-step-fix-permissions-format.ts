import { CollaboratorPermissionsNEW } from 'meta/user/userRole'

import { BaseProtocol, DB } from 'server/db'
import { Logger } from 'server/utils/logger'

/*
 Deprecated types - needed for when deleted from meta
 */

export enum CollaboratorEditPropertyType {
  tableData = 'tableData',
  descriptions = 'descriptions',
}

type PermissionsBySection = Record<string, { [key in keyof typeof CollaboratorEditPropertyType]?: boolean }>

export type CollaboratorSectionsPermission =
  /**
   * all = all sections enabled for editing
   * none = no sections enabled for editing
   * Record<string, { tableData: boolean, descriptions: boolean }> = key is sectionUuid, value contains an object which specifies permission by key
   */
  'all' | 'none' | PermissionsBySection

export type CollaboratorPermissionsDeprecated = {
  sections: CollaboratorSectionsPermission
}

const _fixInvitations = async () => {
  await DB.query(`
    alter table public.users_invitation add permissions jsonb;
    alter table public.users_invitation drop column props;
  `)
}

const _fixPermissions = (permission: CollaboratorPermissionsDeprecated): CollaboratorPermissionsNEW => {
  // -- Cases:
  // -- {"sections": "all"}
  // -- {"sections": "none"}
  // -- {"sections": {"edaa5b7c7dbb44b29614Fb379c145af2": {"tableData": true, "descriptions": true}}}
  // -- If: all or none => { tableData: ['all'] or ['none'], descriptions: ['all'] or ['none'] }
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

      const { sections } = permission
      const sectionPerms = (sections as PermissionsBySection)[sectionUuid]
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
  const lenRoles = roles.length

  if (lenRoles === 0) {
    Logger.info(`Info:\tusers_role table has been already updated. No roles found.`)
    return
  }

  Logger.info(`Info:\tStarting update of ${lenRoles} roles with new permissions format`)

  await Promise.all(
    roles.map(async (role, i) => {
      const { id, permissions } = role
      const fixedPermissions = _fixPermissions(permissions)

      Logger.info(
        `Info:\t[${i + 1}/${lenRoles}]\tUpdating\t${role.user_uuid}\tfor role\t${role.role}\tx\t${role.country_iso}`
      )

      return client.none('update users_role set permissions = $1 where id = $2', [JSON.stringify(fixedPermissions), id])
    })
  )

  Logger.info(`Successfully updated ${lenRoles} roles`)
}

export default async (client: BaseProtocol) => {
  await _fixInvitations()
  await _fixRoles(client)
}
