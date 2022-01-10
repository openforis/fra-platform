import { Assessment } from '@meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const readCycle = async (props: { assessmentCycleName: string }, client: BaseProtocol = DB): Promise<any> =>
  client.one<Assessment>(
    `
        select * from public.assessment_cycle where name = $1;
    `,
    [props.assessmentCycleName],
    Objects.camelize
  )
