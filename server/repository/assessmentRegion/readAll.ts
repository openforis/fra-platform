import { BaseProtocol, DB } from '@server/db'
import { Assessment } from '@core/meta/assessment'
import { AssessmentRegion } from '@core/meta/assessmentRegion'
import { Objects } from '@core/utils'
import { Schemas } from '@server/db/schemas'

export const readAll = async (
  props: { assessment: Pick<Assessment, 'props'> },
  client: BaseProtocol = DB
): Promise<Array<AssessmentRegion>> => {
  const { assessment } = props

  const assessmentName = Schemas.getName(assessment)

  return client
    .many<AssessmentRegion>(
      `
        select * from ${assessmentName}.assessment_region;
    `
    )
    .then((data) => Objects.camelize(data))
}
