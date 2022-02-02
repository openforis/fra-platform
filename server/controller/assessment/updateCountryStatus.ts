import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { CountryIso } from '@core/country'
import { AssessmentName, CountryStatus } from '@meta/assessment'

export const updateCountryStatus = async (
  props: { countryStatus: CountryStatus; countryIso: CountryIso | string; name: AssessmentName; cycleName: string },
  client: BaseProtocol = DB
): Promise<CountryStatus> => {
  const { countryStatus, countryIso, name, cycleName } = props

  return AssessmentRepository.updateCountryStatus({ countryStatus, countryIso, name, cycleName }, client)
}
