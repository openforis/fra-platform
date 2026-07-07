import { Country } from 'meta/area/country'

import { validateCountryTables } from 'server/controller/cycleData/validations/tables/validateCountryTables/validateCountryTables'
import { BaseProtocol, DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

import { AssessmentCycle, Failure } from './types'

type Props = AssessmentCycle & {
  country: Country
}

export const validateTables = async (props: Props, client: BaseProtocol = DB): Promise<Array<Failure>> => {
  Logger.info('Start validateTables')

  const { assessment, country, cycle } = props
  const { countryIso } = country
  const assessmentName = assessment.props.name
  const { name: cycleName } = cycle

  try {
    await validateCountryTables({ assessmentName, countryIso, cycleName }, client)
    Logger.info('Finish validateTables')
    return []
  } catch (error) {
    Logger.error(`validateTables failed for ${assessmentName}/${cycleName}/${countryIso}`)
    return [{ assessmentName, countryIso, cycleName, error }]
  }
}
