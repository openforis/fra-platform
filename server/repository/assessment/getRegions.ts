import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { Region } from '@core/country'

export const getRegions = async (props: { name: string }, client: BaseProtocol = DB): Promise<Array<Region>> => {
  const { name } = props

  const assessmentName = `assessment_${name}`

  return client
    .many<Region>(
      `
        select * from ${assessmentName}.assessment_region;
    `
    )
    .then((data) => Objects.camelize(data))
}
