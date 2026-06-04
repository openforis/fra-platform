import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription } from 'meta/assessment/descriptionValue'

import { updateDataSourceFieldValidations } from './updateDataSourceFieldValidations'
import { updateDescriptionTextValidations } from './updateDescriptionTextValidations'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptions: Array<CommentableDescription>
}

export const updateDescriptionValidations = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, descriptions } = props

  await Promise.all([
    updateDescriptionTextValidations({ assessment, country, cycle, descriptions }),
    updateDataSourceFieldValidations({ assessment, country, cycle, descriptions }),
  ])
}
