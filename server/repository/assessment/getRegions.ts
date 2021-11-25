import { BaseProtocol, DB } from '@server/db'
import { Assessment } from '@core/meta/assessment'
import { Objects } from '@core/utils'
import { Schemas } from '@server/db/schemas'

export const getRegions = async (
  props: { assessment: Pick<Assessment, 'props'> },
  client: BaseProtocol = DB
): Promise<
  Array<{
    regionCode: string
  }>
> => {
  const { assessment } = props

  const assessmentName = Schemas.getName(assessment)

  return client
    .many<{
      regionCode: string
    }>(
      `
        select * from ${assessmentName}.assessment_region;
    `
    )
    .then((data) => Objects.camelize(data))
}
