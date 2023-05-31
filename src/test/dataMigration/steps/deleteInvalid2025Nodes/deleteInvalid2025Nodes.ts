import { Assessment } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
}

export const deleteInvalid2025Nodes = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const cycle2025 = assessment.cycles.find((c) => c.name === '2025')

  const schema = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle2025)

  await client.query(`
      delete
      from ${schemaCycle}.node n
      where n.id in (select n.id
                     from ${schemaCycle}.node n
                              left join ${schema}.col c on n.col_uuid = c.uuid
                     where not (c.props -> 'cycles' ? '${cycle2025.uuid}'))
  `)
}
