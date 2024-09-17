import { createI18nPromise } from 'i18n/i18nFactory'
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Lang } from 'meta/lang'
import { RoleName, User, Users } from 'meta/user'

import { UserRoleAdapter } from 'server/repository/adapter'
import { ExportService } from 'server/service/export'

type Props = {
  assessment: Assessment
  cycle: Cycle
  lang: Lang
}

export const exportToCsv = async (props: Props): Promise<Buffer> => {
  const { assessment, cycle, lang } = props

  const query = `
    select u.id,
           u.email,
           u.props,
           u.status,
           u.uuid,
           jsonb_agg(to_jsonb(ur.*) - 'props') as roles
    from public.users u
    join public.users_role ur on (u.id = ur.user_id)
    where 
    (
      ( ur.assessment_id = $1
        and ur.cycle_uuid = $2
        and ((accepted_at is not null and invited_at is not null) or invited_at is null)
       )
      or (ur.role = '${RoleName.ADMINISTRATOR}')
    )
      and u.status in ('active','disabled','invitationPending')
    group by u.id,
             u.email,
             u.props,
             u.status,
             u.uuid
    order by concat(u.props->'name', ' ', u.props->'surname') asc
  `

  const queryValues = [assessment.id, cycle.uuid]

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

  const rowTransformer = (rawUser: any): Record<string, string> => {
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

    const name = Users.getFullName(user)
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

  return ExportService.queryToCsv({ query, queryValues, rowTransformer })
}
