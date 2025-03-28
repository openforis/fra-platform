import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeUpdate } from 'meta/data'
import { User } from 'meta/user'

import { UpdateDependenciesJob } from 'server/controller/cycleData/updateDependencies/props'
import worker from 'server/controller/cycleData/updateDependencies/worker'
import { BaseProtocol, DB } from 'server/db'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  includeSourceNodes?: boolean
  isODP?: boolean
  nodes: Array<NodeUpdate>
  user: User
}

export const updateTableDataDependencies = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, countryIso, nodes, includeSourceNodes, isODP, user } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const nodeUpdates = { assessmentName, cycleName, countryIso, nodes }
  const data: UpdateDependenciesJob['data'] = {
    assessment,
    cycle,
    nodeUpdates,
    user,
    isODP,
    includeSourceNodes,
    client,
  }
  const job = { id: `id-${countryIso}`, name: `name-${countryIso}`, data } as unknown as UpdateDependenciesJob

  await worker(job)
}
