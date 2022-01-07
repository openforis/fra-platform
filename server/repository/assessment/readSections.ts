import { Assessment } from '@meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const readSections = async (
  props: { assessmentName: string; assessmentUuid: string },
  client: BaseProtocol = DB
): Promise<any> =>
  client.one<Assessment>(
    `
        select * from assessment_${props.assessmentName}.section where (props->'cycles')::jsonb ? $1;
    `,
    [props.assessmentUuid],
    Objects.camelize
  )
