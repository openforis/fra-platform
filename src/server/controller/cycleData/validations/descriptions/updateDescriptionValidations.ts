import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription } from 'meta/assessment/descriptionValue'

import { updateDataSourcesValidations } from './updateDataSourcesValidations'
import { updateDescriptionTextValidations } from './updateDescriptionTextValidations'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptions: Array<CommentableDescription>
}

export const updateDescriptionValidations = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, descriptions } = props

  await updateDescriptionTextValidations({ assessment, country, cycle, descriptions })
  await updateDataSourcesValidations({ assessment, country, cycle, descriptions })
}
