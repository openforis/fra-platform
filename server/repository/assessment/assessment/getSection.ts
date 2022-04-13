import { Objects } from '@core/utils'
import { Assessment, Section } from '@meta/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'

export const getSection = async (
  props: { assessment: Assessment; assessmentCycleUuid: string; sectionName: string },
  client: BaseProtocol = DB
): Promise<Section> => {
  const schemaName = Schemas.getName(props.assessment)
  return client
    .oneOrNone<any>(
      `
          select s.*
          from ${schemaName}.section s
          where props ->> 'name' = $2 
            and props -> 'cycles' ? $1;
      `,
      [props.assessmentCycleUuid, props.sectionName]
    )
    .then(Objects.camelize)
}
