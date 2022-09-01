import { Objects } from '@utils/objects'

import { Assessment, Cycle, Section } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getOne = async (
  props: { assessment: Assessment; cycle: Cycle; sectionName: string },
  client: BaseProtocol = DB
): Promise<Section> => {
  const { assessment, cycle, sectionName } = props
  const schemaName = Schemas.getName(assessment)
  return client
    .oneOrNone<any>(
      `
          select s.*
          from ${schemaName}.section s
          where props ->> 'name' = $2
            and props -> 'cycles' ? $1;
      `,
      [cycle.uuid, sectionName]
    )
    .then(Objects.camelize)
}
