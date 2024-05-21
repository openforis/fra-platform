import { Assessment, Col, ColProps, Cycle, Row } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { ColAdapter } from 'server/repository/adapter'

type Props = {
  assessment: Assessment
  cycles: Array<Cycle>
  row: Row
  colProps: ColProps
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<Col> => {
  const { assessment, cycles, row } = props

  const colProps = { ...props.colProps, cycles: cycles.map(({ uuid }) => uuid) }

  const schemaName = Schemas.getName(assessment)

  return client.one<Col>(
    `
        insert into ${schemaName}.col (props, row_id)
        values ($1::jsonb, $2)
        returning *`,
    [JSON.stringify(colProps), +row.id],
    ColAdapter
  )
}
