import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'

export const getCountryISOs = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<CountryIso>> => {
  const { assessment, cycle } = props

  return AssessmentRepository.getCountryISOs({ assessment, cycle }, client)
}
