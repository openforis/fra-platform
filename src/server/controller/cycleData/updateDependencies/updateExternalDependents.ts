import { CountryIso } from 'meta/area'
import { NodeUpdates } from 'meta/data'
import { User } from 'meta/user'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { updateDependents } from 'server/controller/cycleData/updateDependencies/updateDependents'
import { BaseProtocol } from 'server/db'

type Props = {
  countryIso: CountryIso
  nodeUpdates: NodeUpdates
  user: User
}

export const updateExternalDependents = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { countryIso, nodeUpdates, user } = props

  const { assessmentName, cycleName } = nodeUpdates

  const propsAssessment = { assessmentName, cycleName, metaCache: true }
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(propsAssessment)
  const country = await AreaController.getCountry({ assessment, cycle, countryIso })

  if (country) {
    await updateDependents({ assessment, cycle, country, nodeUpdates, includeSourceNodes: true, user }, client)
  }
}
