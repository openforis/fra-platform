import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { CountryStatus } from '@meta/area/country'

export const updateCountryStatus = async (
  props: {
    countryStatus: CountryStatus
    countryIso: CountryIso | string
    assessmentName: AssessmentName
    cycleName: string
  },
  client: BaseProtocol = DB
): Promise<CountryStatus> => {
  const { countryStatus, countryIso, assessmentName, cycleName } = props

  return AssessmentRepository.updateCountryStatus({ countryStatus, countryIso, assessmentName, cycleName }, client)
}
