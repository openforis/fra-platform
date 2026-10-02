import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { Sockets } from 'meta/socket/sockets'

import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptionValidations: RecordDescriptionValidations
  // Without section names, clients replace their whole state instead of updating the given sections.
  sectionNames?: Array<SectionName>
}

export const notifyDescriptionValidationUpdate = (props: Props): void => {
  const { assessment, countryIso, cycle, descriptionValidations, sectionNames } = props

  const eventName = Sockets.getDescriptionValidationsUpdateEvent({
    assessmentName: assessment.props.name,
    countryIso,
    cycleName: cycle.name,
  })

  SocketServer.emit(eventName, { descriptionValidations, sectionNames })
}
