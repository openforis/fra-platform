import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription, CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { buildDataSourcesValidations } from './buildDataSourcesValidations'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptions: Array<CommentableDescription>
}

export const updateDataSourcesValidations = async (props: Props): Promise<void> => {
  const { descriptions } = props

  const dataSourceDescriptions = descriptions.reduce<Array<CommentableDescription>>((acc, description) => {
    const isDataSources = description.name === CommentableDescriptionName.dataSources
    const hasDataSourcesArray = Array.isArray(description.value.dataSources)

    if (isDataSources && hasDataSourcesArray) {
      acc.push(description)
    }
    return acc
  }, [])

  if (Objects.isEmpty(dataSourceDescriptions)) return

  const descriptionValidations = buildDataSourcesValidations({
    descriptions: dataSourceDescriptions,
  })

  if (Objects.isEmpty(descriptionValidations)) return

  // TODO: Cache data source validations by section.
  // await ValidationRedisRepository.setDescriptionValidations({
  //   assessment: props.assessment,
  //   countryIso: props.country.countryIso,
  //   cycle: props.cycle,
  //   descriptionValidations,
  // })
}
