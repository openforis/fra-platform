import { Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { DB } from 'server/db'
import { NodeDb, NodeRepository } from 'server/repository/assessmentCycle/node'

type Props = {
  assessment: Assessment
  cycle: Cycle
  nodes: Array<NodeDb>
  user: User
}

export const massiveInsert = async (props: Props): Promise<void> => {
  const { assessment, cycle, nodes } = props

  await DB.tx(async (client) => {
    const nodesInsert = await NodeRepository.massiveInsert({ assessment, cycle, nodes }, client)

    // TODO:
    // Update Redis
    // Update Deps
    // ActivityLog
  })
}
