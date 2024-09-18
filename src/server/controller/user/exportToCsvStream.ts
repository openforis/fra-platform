import { createI18nPromise } from 'i18n/i18nFactory'
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'
import { Lang } from 'meta/lang'
import { RoleName, User, Users } from 'meta/user'

import { UserRoleAdapter } from 'server/repository/adapter'
import { usersBuildGetManyQuery, UsersGetManyProps } from 'server/repository/public/user'
import { ExportService } from 'server/service/export'

type Props = UsersGetManyProps & {
  lang: Lang
}

export const exportToCsvStream = async (props: Props): Promise<NodeJS.ReadableStream> => {
  const { lang } = props

  const { query, queryParams } = usersBuildGetManyQuery(props)

  const i18n = await createI18nPromise(lang)
  const nameHeader = i18n.t('common.name')
  const emailHeader = i18n.t('common.email')

  const roleHeaders: Record<RoleName, string> = {
    [RoleName.ADMINISTRATOR]: i18n.t(Users.getI18nRoleLabelKey(RoleName.ADMINISTRATOR)),
    [RoleName.REVIEWER]: i18n.t(Users.getI18nRoleLabelKey(RoleName.REVIEWER)),
    [RoleName.NATIONAL_CORRESPONDENT]: i18n.t(Users.getI18nRoleLabelKey(RoleName.NATIONAL_CORRESPONDENT)),
    [RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]: i18n.t(
      Users.getI18nRoleLabelKey(RoleName.ALTERNATE_NATIONAL_CORRESPONDENT)
    ),
    [RoleName.COLLABORATOR]: i18n.t(Users.getI18nRoleLabelKey(RoleName.COLLABORATOR)),
    [RoleName.VIEWER]: i18n.t(Users.getI18nRoleLabelKey(RoleName.VIEWER)),
  }

  const rowTransformer = (rawUser: User): Record<string, string> => {
    const { roles, ...user } = rawUser
    const userRow: User = {
      ...Objects.camelize(user),
      roles: roles.map(UserRoleAdapter),
    }

    const getRoleCountries = (roleName: RoleName) => {
      const roleCountries = userRow.roles
        .filter((role) => role.role === roleName)
        .map((role) =>
          role.role === RoleName.ADMINISTRATOR
            ? i18n.t(Users.getI18nRoleLabelKey(role.role))
            : i18n.t(Areas.getTranslationKey(role.countryIso))
        )
        .join(', ')
      return roleCountries
    }

    const name = Users.getFullName(userRow)
    const { email } = user

    const rowData: Record<string, string> = {
      [nameHeader]: name,
    }
    Object.entries(roleHeaders).forEach(([roleName, header]) => {
      rowData[header] = getRoleCountries(roleName as RoleName)
    })
    rowData[emailHeader] = email

    return rowData
  }

  return ExportService.queryToCsvStream<User>({ query, queryParams, rowTransformer })
}
