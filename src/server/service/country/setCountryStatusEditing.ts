import { AssessmentStatus, Country } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { AreaController } from 'server/controller/area'
import { BaseProtocol, DB } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  user: User
}

export const setCountryStatusEditing = async (props: Props, client: BaseProtocol = DB) => {
  const { assessment, cycle, country, user } = props

  if (!country) return

  if (country.props.status === AssessmentStatus.notStarted) {
    country.props.status = AssessmentStatus.editing
    await AreaController.updateCountry({ assessment, cycle, country, user }, client)
  }
  // TODO: Websocket
  // NotifyCountryStatusUpdate through websocket
  // This should be used also when admin or reviewers or whatever changes the country status to next or previous
}
