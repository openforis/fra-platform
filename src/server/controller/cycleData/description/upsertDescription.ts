import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { User } from 'meta/user/user'

import { saveDescription } from 'server/controller/cycleData/description/saveDescription'
import { BaseProtocol, DB } from 'server/db/db'
import { DataValidationService } from 'server/service/dataValidation'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  sectionName: string
  value: CommentableDescriptionValue
  name: CommentableDescriptionName
  user: User
}

export const upsertDescription = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<CommentableDescriptionValue> => {
  const { assessment, country, cycle } = props

  const description = await saveDescription(props, client)

  await DataValidationService.validateDescriptions({
    assessment,
    country,
    cycle,
    descriptions: [description],
  })

  return description.value
}
