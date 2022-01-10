import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const readSections = async (
  props: { assessmentName: string; assessmentCycleUuid: string },
  client: BaseProtocol = DB
): Promise<any> =>
  client
    .manyOrNone<any>(
      `
        select * from assessment_${props.assessmentName}.section where (props->'cycles')::jsonb ? $1;
    `,
      [props.assessmentCycleUuid]
    )
    .then(Objects.camelize)
