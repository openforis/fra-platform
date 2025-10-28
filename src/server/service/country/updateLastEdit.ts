import { Country, CountryStatus } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { AreaController } from 'server/controller/area'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  user: User

  lastEditOdp?: boolean
  notifyClient?: boolean
  lastUpdateTimestamp?: string
}

export const updateLastEdit = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, country, cycle, lastEditOdp, lastUpdateTimestamp, notifyClient = true, user } = props

  if (!country) return

  if (country.props.status === CountryStatus.notStarted) {
    country.props.status = CountryStatus.editing
  }

  // Client is notified through websocket in updateCountry
  await AreaController.updateCountry(
    {
      assessment,
      cycle,
      country,
      user,
      lastEdit: true,
      lastUpdate: true,
      lastEditOdp,
      notifyClient,
      lastUpdateTimestamp,
    },
    client
  )
}
