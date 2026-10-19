import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'
import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user/role/name'
import { Users } from 'meta/user/users'
import { Objects } from 'utils/objects'

import { UserRepository, UsersGetManyProps } from 'server/db/repository/public/user'
import { UserQueryParams } from 'server/db/repository/public/user/UserQueryParams'
import { I18n } from 'server/utils/i18n'

type Props = UsersGetManyProps & {
  lang: Lang
}

type RawExportRow = {
  email: string
  name: string
  surname: string
  title: string
  lang: string
  status: string
  role: Record<string, unknown>
}

type Returned = {
  query: string
  queryParams: UserQueryParams
  rowTransformer: (rawRow: RawExportRow) => Record<string, string>
}

// Fields to remove from the return user row object
const fieldsToRemove = [
  'id',
  'uuid',
  'userUuid',
  'createdAt',
  'cycleUuid',
  'assessmentUuid',
  'invitationUuid',
  'permissions',
]

const emptyRow: Record<string, string> = {
  email: '',
  name: '',
  surname: '',
  title: '',
  lang: '',
  status: '',
  role: '',
  countryIso: '',
  professionalTitle: '',
  organizationalUnit: '',
  organization: '',
  primaryEmail: '',
  secondaryEmail: '',
  primaryPhoneNumber: '',
  secondaryPhoneNumber: '',
  'address.street': '',
  'address.zipCode': '',
  'address.poBox': '',
  'address.city': '',
  'address.countryIso': '',
  'contactPreference.method': '',
  'contactPreference.options.phone': '',
}

export const getManyExport = async (props: Props): Promise<Returned> => {
  const { lang } = props
  const { query, queryParams } = UserRepository.buildGetManyExportQuery(props)

  const i18n = await I18n.getInstance({ lang })

  const rowTransformer = (rawRow: RawExportRow): Record<string, string> => {
    const { role: rawRole, ...userFields } = rawRow
    const { props: roleProps, ...roleRest } = Objects.camelize(rawRole)
    const { address = {}, contactPreference = {}, ...propsRest } = roleProps ?? {}

    // Flatten the records to a single csv row
    const flat: Record<string, unknown> = {
      ...userFields,
      ...roleRest,
      ...propsRest,
      ...Objects.flatten(address as Record<string, unknown>, 'address'),
      ...Objects.flatten(contactPreference as Record<string, unknown>, 'contactPreference'),
    }

    // Remove fields we don't want to include
    fieldsToRemove.forEach((f) => delete flat[f])

    // Translate role and countryIso
    flat.role = i18n.t(Users.getI18nRoleLabelKey(flat.role as RoleName))
    flat.countryIso = i18n.t(Areas.getTranslationKey(flat.countryIso as AreaCode))

    // Transform null/undefined values to ''
    const stringified = Object.fromEntries(Object.entries(flat).map(([k, v]) => [k, String(v ?? '')]))
    return { ...emptyRow, ...stringified }
  }

  return { query, queryParams, rowTransformer }
}
