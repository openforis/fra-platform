import { BaseProtocol, DB } from '@server/db'
import { Assessment } from '@core/meta/assessment'
import { Objects } from '@core/utils'
import { Schemas } from '@server/db/schemas'

export const getCountries = async (
  props: { assessment: Pick<Assessment, 'props'> },
  client: BaseProtocol = DB
): Promise<Array<{ countryIso: string }>> => {
  const { assessment } = props

  const assessmentName = Schemas.getName(assessment)

  return client
    .many<{ countryIso: string }>(
      `
        select * from ${assessmentName}.assessment_country;
    `
    )
    .then((data) => Objects.camelize(data))
}
