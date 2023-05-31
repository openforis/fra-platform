import { Objects } from 'utils/objects'

import { Assessment, Cycle, TableSection } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

// get One element from table_section table in database
export const getOne = async (
  props: { assessment: Assessment; cycle: Cycle; id: number },
  client: BaseProtocol = DB
): Promise<TableSection> => {
  const { assessment, cycle } = props
  const schemaName = Schemas.getName(assessment)

  return client.one<TableSection>(
    `
      select ts.*
      from ${schemaName}.table_section ts
      where ts.id = $2
        and ts.props -> 'cycles' ? $1;
    `,
    [cycle.uuid, +props.id],
    (tableSection) => {
      const { props, ...rest } = tableSection
      return {
        ...Objects.camelize(rest),
        props,
      }
    }
  )
}
