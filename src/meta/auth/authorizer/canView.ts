import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { CountryStatus } from 'meta/area/countryStatus'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = {
  assessment: Assessment
  country?: Country
  cycle: Cycle
  areaCode: AreaCode
  user: User
}
/**
 *  CanView
 *  if country is published, everyone can view
 *  if cycle is published, everyone can view
 *  if not, admin can view, any other logged user in whom have a role in that country for that cycle can view
 *  @param props
 *  @param props.areaCode - used to handle regions
 *  @param props.country
 *  @param props.cycle
 *  @param props.User
 *  @returns boolean
 */
export const canView = (props: Props): boolean => {
  const { areaCode, assessment, country, cycle, user } = props

  // Country can be undefined when passed from middleware when countryIso: RegionCode
  if (country?.props.status === CountryStatus.published) return true
  if (Cycles.isPublished(cycle)) return true
  if (Users.isAdministrator(user)) return true
  // if global or region, user must have at least one role in that assessment
  if (Areas.isGlobal(areaCode) || Areas.isRegion(areaCode)) return Users.hasRoleInAssessment({ assessment, user })

  return Users.hasRoleInCountry({ user, countryIso: areaCode, cycle })
}
