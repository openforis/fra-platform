import { CountryIso } from 'meta/area/countryIso'
import { NodeUpdates } from 'meta/data/nodeUpdates'
import { User } from 'meta/user/user'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { updateDependents } from 'server/controller/cycleData/tableData/updateDependencies/updateDependents'
import { BaseProtocol } from 'server/db/db'

type Props = {
  countryIso: CountryIso
  nodeUpdates: NodeUpdates
  notifyClients?: boolean
  user: User
}

export const updateExternalDependents = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { countryIso, nodeUpdates, notifyClients = true, user } = props

  const { assessmentName, cycleName } = nodeUpdates

  const propsAssessment = { assessmentName, cycleName, metaCache: true }
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(propsAssessment, client)
  const countriesMap = await AreaController.getCountriesMap({ assessment, cycle }, client)
  const country = countriesMap[countryIso]

  if (country) {
    await updateDependents(
      { assessment, cycle, country, nodeUpdates, notifyClients, includeSourceNodes: true, user },
      client
    )
  }
}
