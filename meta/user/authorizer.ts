import { Assessment, CountryStatus, Cycle, Table } from '@meta/assessment'
import { User } from '@meta/user/user'
import { CountryIso } from '@meta/area'

const canView = (props: { assessment: Assessment; cycle: Cycle; table: Table; user: User }) => {}
const canEdit = (props: {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  table: Table
  status: CountryStatus
  user: User
}) => {}
export const Authorizer = {
  canView,
  canEdit,
}
