import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Section, Assessment } from '@meta/assessment'

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
