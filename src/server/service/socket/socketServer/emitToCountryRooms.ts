import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'

import { SocketRooms } from 'server/service/socket/socketRooms'

import { emitToRooms } from './emitToRooms'

// Emit to the users with a role in the country and the admins except the one that made the change,
// or to all of them when socketId is missing
export const emitToCountryRooms = (
  props: { countryIso: CountryIso; cycle: Cycle; eventName: string; socketId?: string },
  ...args: Array<unknown>
): void => {
  const { countryIso, cycle, eventName, socketId } = props
  const rooms = SocketRooms.getCountryRooms({ countryIso, cycle })
  emitToRooms({ eventName, rooms, socketId }, ...args)
}
