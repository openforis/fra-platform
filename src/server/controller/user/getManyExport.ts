import { Lang } from 'meta/lang'
import { Objects } from 'utils/objects'

import { UserRepository, UsersGetManyProps } from 'server/db/repository/public/user'
import { UserQueryParams } from 'server/db/repository/public/user/UserQueryParams'

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
  skype: '',
  'address.street': '',
  'address.zipCode': '',
  'address.poBox': '',
  'address.city': '',
  'address.countryIso': '',
  'contactPreference.method': '',
  'contactPreference.options.phone': '',
}

const _rowTransformer = (rawRow: RawExportRow): Record<string, string> => {
  const { role: rawRole, ...userFields } = rawRow
  const { props, ...roleRest } = Objects.camelize(rawRole)
  const { address = {}, contactPreference = {}, ...propsRest } = (props as Record<string, unknown>) ?? {}

  // Flatten the records to a single csv row
  const flat: Record<string, unknown> = {
    ...userFields,
    ...roleRest,
    ...propsRest,
    ...Objects.flatten(address as Record<string, unknown>, 'address'),
    ...Objects.flatten(contactPreference as Record<string, unknown>, 'contactPreference'),
  }

  // Remove rows we don't want to include
  fieldsToRemove.forEach((f) => delete flat[f])

  // Transform null objects to ''
  const stringified = Object.fromEntries(Object.entries(flat).map(([k, v]) => [k, String(v ?? '')]))
  return { ...emptyRow, ...stringified }
}

export const getManyExport = async (props: Props): Promise<Returned> => {
  const { query, queryParams } = UserRepository.buildGetManyExportQuery(props)

  return { query, queryParams, rowTransformer: _rowTransformer }
}
