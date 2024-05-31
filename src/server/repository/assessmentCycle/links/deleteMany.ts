import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  excludeApproved?: boolean
  excludedIds: Array<number>
}

export const deleteMany = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, excludeApproved, excludedIds } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  let excludeApprovedClause = ''
  if (excludeApproved) {
    excludeApprovedClause = "and not (jsonb_exists(props, 'approved') AND (props ->> 'approved')::boolean = true)"
  }

  return client.query(
    `delete
     from ${schemaCycle}.link l
     where l.id not in ($1:list)
     ${excludeApprovedClause}
     `,
    [excludedIds]
  )
}
