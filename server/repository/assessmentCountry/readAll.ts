import { BaseProtocol, DB } from '@server/db'
import { Assessment } from '@core/meta/assessment'
import { AssessmentCountry } from '@core/meta/assessmentCountry'
import { Objects } from '@core/utils'
import { Schemas } from '@server/db/schemas'

export const readAll = async (
  props: { assessment: Pick<Assessment, 'props'> },
  client: BaseProtocol = DB
): Promise<Array<AssessmentCountry>> => {
  const { assessment } = props

  const assessmentName = Schemas.getName(assessment)

  const items = await client.many<AssessmentCountry>(
    `
        select * from ${assessmentName}.assessment_country;
    `
  )

  return Objects.camelize(items)
}
