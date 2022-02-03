import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { CountryIso } from '@meta/area'
import { AssessmentName, CountryStatus } from '@meta/assessment'

export const getCountryStatus = async (
  props: { countryIso: CountryIso | string; name: AssessmentName; cycleName: string },
  client: BaseProtocol = DB
): Promise<CountryStatus> => {
  const { countryIso, name, cycleName } = props

  return AssessmentRepository.getCountryStatus({ countryIso, name, cycleName }, client)
}
