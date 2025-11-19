import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'
import { getRole } from 'meta/user/users/getRole'
import { isAdministrator } from 'meta/user/users/isRole'

export const hasEditorRole = (props: { user: User; countryIso: AreaCode; cycle: Cycle }): boolean => {
  const { countryIso, cycle, user } = props

  if (!user || !Areas.isISOCountry(countryIso)) return false
  if (isAdministrator(user)) return true

  const role = getRole(user, countryIso, cycle)
  return role && role.role !== RoleName.VIEWER
}

export const hasRoleInAssessment = (props: { user: User; assessment: Assessment }): boolean => {
  const { assessment, user } = props
  if (isAdministrator(user)) return true
  return user?.roles?.some((role) => role.assessmentUuid === assessment.uuid)
}

export const hasRoleInCycle = (props: { user: User; cycle: Cycle }): boolean => {
  const { cycle, user } = props
  if (isAdministrator(user)) return true
  return user.roles.some((role) => role.cycleUuid === cycle.uuid)
}

export const hasRoleInCountry = (props: { user: User; cycle: Cycle; countryIso: AreaCode }): boolean => {
  const { countryIso, cycle, user } = props
  if (!user) return false
  if (isAdministrator(user)) return true
  return user.roles.some((role) => role.cycleUuid === cycle.uuid && role.countryIso === countryIso)
}
