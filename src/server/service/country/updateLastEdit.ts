import { Country, CountryStatus } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user'

import { AreaController } from 'server/controller/area'
import { BaseProtocol, DB } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  user: User
  lastEditOdp?: boolean
  notifyClient?: boolean
}

export const updateLastEdit = async (props: Props, client: BaseProtocol = DB) => {
  const { assessment, country, cycle, lastEditOdp, notifyClient = true, user } = props

  if (!country) return

  if (country.props.status === CountryStatus.notStarted) {
    country.props.status = CountryStatus.editing
  }

  // Client is notified through websocket in updateCountry
  await AreaController.updateCountry(
    { assessment, cycle, country, user, lastEdit: true, lastUpdate: true, lastEditOdp, notifyClient },
    client
  )
}
