import { Objects } from 'utils/objects'

import { RoleName } from 'meta/user'
import { invitationDefaultExpiryPeriodDays } from 'meta/user/userInvitations'

import { InvitationQueryParams } from 'server/repository/public/userInvitation/InvitationQueryParams'
import { InvitationsGetManyProps } from 'server/repository/public/userInvitation/invitationsGetManyProps'

type Returned = { whereConditions: Array<string>; queryParams: InvitationQueryParams }

export const getPropsToQueryParams = (props: InvitationsGetManyProps): Returned => {
  const { assessment, cycle, filters = {}, limit, offset } = props

  const { accepted, countries, expired, roles } = filters

  const queryParams: InvitationQueryParams = {
    assessmentId: assessment.id,
    cycleId: cycle.id,
  }

  const hasCountries = !Objects.isEmpty(countries)
  if (hasCountries) queryParams.countries = countries

  const allRoles = Object.values(RoleName).filter((role) => role !== RoleName.ADMINISTRATOR)

  const selectedRoles = !Objects.isEmpty(roles) ? roles : allRoles
  if (selectedRoles) queryParams.roles = selectedRoles

  if (!Objects.isNil(accepted)) queryParams.accepted = accepted
  if (!Objects.isNil(expired)) queryParams.expired = expired

  if (!Objects.isNil(limit)) queryParams.limit = limit
  if (!Objects.isNil(offset)) queryParams.offset = offset

  const whereConditions = [
    accepted && `ui.accepted_at is not null`,
    hasCountries && `ui.country_iso in ($(countries:list))`,
    expired &&
      `(ui.invited_at IS NOT NULL AND ui.accepted_at IS NULL AND ui.invited_at < NOW() - interval '${invitationDefaultExpiryPeriodDays} days')`,
    selectedRoles && `(ui.role is not null and ui.role in ($(roles:list)))`,
  ].filter(Boolean)
  whereConditions.push(`a.id = $(assessmentId)`)
  whereConditions.push(`ac.id = $(cycleId)`)

  return { queryParams, whereConditions }
}
