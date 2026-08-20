import { NodeUpdate, NodeUpdates } from 'meta/data/nodeUpdates'

import { BaseProtocol, DB } from 'server/db/db'
import { DataValidationService } from 'server/service/dataValidation'

import { CountryProps } from '../common/types'

type Props = CountryProps & { nodes: Array<NodeUpdate> }

export const validateCountryTables = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, country, cycle, nodes } = props
  const { countryIso } = country
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const nodeUpdates: NodeUpdates = { assessmentName, countryIso, cycleName, nodes }

  await DataValidationService.removeTableValidations({ assessment, countryIso, cycle })

  await DataValidationService.validateNodes(
    {
      assessment,
      country,
      cycle,
      nodeUpdates,
      notifyClients: false,
    },
    client
  )
}
