import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { visitDescriptionLinks } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/visitDescriptionLinks'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptions: Array<CommentableDescription>
}

export const updateDescriptionTextValidations = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, descriptions } = props
  const { countryIso } = country

  if (Objects.isEmpty(descriptions)) return

  await visitDescriptionLinks({
    assessment,
    countryIso,
    cycle,
    descriptionIds: descriptions.map(({ id }) => id),
  })
}
