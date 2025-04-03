import { AssessmentStatus, Country } from 'meta/area'
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
}

export const updateLastEdit = async (props: Props, client: BaseProtocol = DB) => {
  const { assessment, cycle, country, user, lastEditOdp } = props

  if (!country) return

  if (country.props.status === AssessmentStatus.notStarted) {
    country.props.status = AssessmentStatus.editing
  }

  // Client is notified through websocket in updateCountry
  await AreaController.updateCountry(
    { assessment, cycle, country, user, lastEdit: true, lastUpdate: true, lastEditOdp },
    client
  )
}
