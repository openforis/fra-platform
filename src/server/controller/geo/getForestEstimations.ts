import { CountryIso } from '@meta/area'
import { ForestEstimations } from '@meta/geo'

import { BaseProtocol, DB } from '@server/db'
import { ForestEstimationsRepository } from '@server/repository/geo/forestEstimations'

type Props = { countryIso: CountryIso; year: number }

export const getForestEstimations = async (props: Props, client: BaseProtocol = DB): Promise<ForestEstimations> => {
  return ForestEstimationsRepository.getOne(props, client)
}
