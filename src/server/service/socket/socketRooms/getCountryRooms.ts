import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'

import { adminRoom, getCountryRoom } from './_roomNames'

type Props = {
  countryIso: CountryIso
  cycle: Cycle
}

export const getCountryRooms = (props: Props): Array<string> => {
  const { countryIso, cycle } = props
  return [getCountryRoom({ countryIso, cycleUuid: cycle.uuid }), adminRoom]
}
