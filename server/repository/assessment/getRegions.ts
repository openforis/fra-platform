import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const getRegions = async (
  props: { name: string },
  client: BaseProtocol = DB
): Promise<
  Array<{
    regionCode: string
  }>
> => {
  const { name } = props

  const assessmentName = `assessment_${name}`

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
