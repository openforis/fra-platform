import { CountryIso } from 'meta/area/countryIso'
import { Bounds } from 'meta/geo/bounds'

import { BaseProtocol, DB } from 'server/db/db'
import { BoundsRepository } from 'server/db/repository/geo/bounds'

type Props = { countryIso: CountryIso }

export const getBounds = async (props: Props, client: BaseProtocol = DB): Promise<Bounds> => {
  return BoundsRepository.getOne(props, client)
}
