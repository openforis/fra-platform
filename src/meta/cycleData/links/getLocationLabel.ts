import { TFunction } from 'i18next'

import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { Descriptions } from 'meta/assessment/description/descriptions'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { Labels } from 'meta/assessment/labels'
import { SubSection } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'
import { LinkLocation } from 'meta/cycleData/links/link'

import { ODPCommentColumns } from 'server/db/repository/assessmentCycle/originalDataPoint/commentColumns'

type GetLocationLabelProps = {
  countryIso: CountryIso
  cycle: Cycle
  includeCountryIso?: boolean
  isPanEuropean: boolean
  location: LinkLocation
  subSections: Array<SubSection>
  t: TFunction
}

export const getLocationLabel = (props: GetLocationLabelProps): string => {
  const { countryIso, cycle, includeCountryIso = true, isPanEuropean, location, subSections, t } = props

  const { sectionName } = location

  // is an ODP location
  if ('year' in location) {
    const { odpSection, year } = location

    const commentColumnsLabel = {
      [ODPCommentColumns[TableNames.extentOfForest]]: t('extentOfForest.extentOfForest'),
      [ODPCommentColumns[TableNames.forestCharacteristics]]: t('nationalDataPoint.forestCharacteristics'),
    }

    const sectionLabel =
      commentColumnsLabel[odpSection] !== undefined
        ? `${commentColumnsLabel[odpSection]} ${t('dataSource.comments')}`
        : t('nationalDataPoint.dataSources')

    const label = `${year} ${t('nationalDataPoint.nationalDataPoint')} - ${sectionLabel}`
    return includeCountryIso ? `${countryIso} - ${label}` : label
  }

  const { descriptionName, path } = location

  const descriptionLabelKey = path.includes('reference')
    ? 'dataSource.referenceToTataSource'
    : Descriptions.getLabelKey({
        name: descriptionName as CommentableDescriptionName,
        isPanEuropean,
      })

  const subSection = subSections.find((_subSection) => _subSection.props.name === sectionName)
  if (!subSection) return includeCountryIso ? countryIso : ''

  const subSectionLabel = Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })

  const label = `${subSectionLabel} - ${t(descriptionLabelKey, { cycleName: cycle.name })}`

  return includeCountryIso ? `${countryIso} - ${label}` : label
}
