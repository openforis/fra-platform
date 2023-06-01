import { Objects } from '@utils/objects'

import { Assessment, Cycle, Table } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getOne = async (
  props: { assessment: Assessment; cycle: Cycle; tableName: string },
  client: BaseProtocol = DB
): Promise<Table> => {
  const { assessment, cycle } = props
  const schemaName = Schemas.getName(assessment)

  return client.oneOrNone<Table>(
    `
          select t.*
          from ${schemaName}.table t
          where props ->> 'name' = $2
            and props -> 'cycles' ? $1;
      `,
    [cycle.uuid, props.tableName],
    (data) => {
      if (!data) return null
      return {
        ...Objects.camelize(data),
        props: data.props,
      }
    }
  )
}
