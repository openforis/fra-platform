import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Htmls } from 'utils/htmls'
import { Objects } from 'utils/objects'

import { visitDescriptionLinks } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/visitDescriptionLinks'

type DescriptionTextValidationUpdate = {
  descriptionName: CommentableDescriptionName
  id: number
  sectionName: SectionName
  value: CommentableDescriptionValue
}

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptions: Array<DescriptionTextValidationUpdate>
}

export const updateDescriptionTextValidations = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, descriptions } = props
  const { countryIso } = country

  if (Objects.isEmpty(descriptions)) return

  const descriptionsWithLinks = descriptions.filter(({ value }) => !Objects.isEmpty(Htmls.getLinks(value.text)))

  if (Objects.isEmpty(descriptionsWithLinks)) return

  await visitDescriptionLinks({
    assessment,
    countryIso,
    cycle,
    descriptionIds: descriptionsWithLinks.map(({ id }) => id),
  })
}
