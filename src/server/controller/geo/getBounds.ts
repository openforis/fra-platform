import { CountryIso } from 'meta/area'
import { Bounds } from 'meta/geo'

import { BaseProtocol, DB } from 'server/db'
import { BoundsRepository } from 'server/repository/geo/bounds'

type Props = { countryIso: CountryIso }

export const getBounds = async (props: Props, client: BaseProtocol = DB): Promise<Bounds> => {
  return BoundsRepository.getOne(props, client)
}
