import { Assessment } from 'meta/assessment'

import { RowRedisRepository } from 'server/repository/redis/row'
import { Logger } from 'server/utils/logger'

export const generateAssessmentCache = async (props: { assessment: Assessment }): Promise<void> => {
  const { assessment } = props
  const assessmentName = assessment.props.name

  const rows = await RowRedisRepository.getRows({ assessment })
  Logger.info(`${assessmentName}: "${Object.keys(rows).length} rows" generated`)
}
