import { Country } from 'meta/area/country'

import { validateCountryNationalDataPoints } from 'server/controller/cycleData/validations/nationalDataPoint/validateCountryNationalDataPoints'
import { BaseProtocol, DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

import { AssessmentCycle, Failure } from './types'

type Props = AssessmentCycle & {
  country: Country
}

export const validateNationalDataPoints = async (props: Props, client: BaseProtocol = DB): Promise<Array<Failure>> => {
  Logger.info('Start validateNationalDataPoints')
  const { assessment, country, cycle } = props
  const { countryIso } = country
  const assessmentName = assessment.props.name
  const { name: cycleName } = cycle

  if (!cycle.props.ndp) return []

  try {
    await validateCountryNationalDataPoints({ assessment, country, cycle }, client)
    Logger.info('Finish validateNationalDataPoints')

    return []
  } catch (error) {
    Logger.error(`validateNationalDataPoints failed for ${assessmentName}/${cycleName}/${countryIso}`)
    return [{ assessmentName, countryIso, cycleName, error }]
  }
}
