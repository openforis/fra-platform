import { Assessment } from 'meta/assessment/assessment'
import { Col, ColProps } from 'meta/assessment/col'
import { Cycle } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'

import { BaseProtocol, DB } from 'server/db/db'
import { ColAdapter } from 'server/db/repository/adapter'
import { Schemas } from 'server/db/schemas'

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
        insert into ${schemaName}.col (props, row_uuid)
        values ($1::jsonb, $2)
        returning *`,
    [JSON.stringify(colProps), row.uuid],
    ColAdapter
  )
}
