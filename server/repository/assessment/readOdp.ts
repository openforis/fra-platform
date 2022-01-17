import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Section, Assessment, Cycle } from '@meta/assessment'

export const readOdp = async (
  props: { assessment: Assessment; assessmentCycle: Cycle; odpId: string },
  client: BaseProtocol = DB
): Promise<Array<Section>> => {
  const schemaName = Schemas.getNameCycle(props.assessment, props.assessmentCycle)
  return client.one<any>(
    `
          select * from ${schemaName}.original_data_point where id = $1
          ;
      `,
    [props.odpId],
    Objects.camelize
  )
}
