import { TFunction } from 'i18next'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Descriptions } from 'meta/assessment/description/descriptions'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { Labels } from 'meta/assessment/labels'
import { SubSection } from 'meta/assessment/section'
import { isOriginalDataPointLocation } from 'meta/cycleData/links/isOriginalDataPointLocation'
import { LinkLocation } from 'meta/cycleData/links/link'
import { NDPLinkField } from 'meta/cycleData/links/nationalDataPointLink'

type GetLocationLabelProps = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  includeCountryIso?: boolean
  location: LinkLocation
  subSections: Array<SubSection>
  t: TFunction
}

export const getLocationLabel = (props: GetLocationLabelProps): string => {
  const { assessment, countryIso, cycle, includeCountryIso = true, location, subSections, t } = props

  const { sectionName } = location

  if (isOriginalDataPointLocation(location)) {
    const { ndpSection, year } = location

    const commentFieldLabels: Partial<Record<NDPLinkField, string>> = {
      [NDPLinkField.commentsExtentOfForest]: t('extentOfForest.extentOfForest'),
      [NDPLinkField.commentsForestCharacteristics]: t('nationalDataPoint.forestCharacteristics'),
    }

    const sectionLabel =
      commentFieldLabels[ndpSection] !== undefined
        ? `${commentFieldLabels[ndpSection]} ${t('dataSource.comments')}`
        : t('nationalDataPoint.dataSources')

    const label = `${year} ${t('nationalDataPoint.nationalDataPoint')} - ${sectionLabel}`
    return includeCountryIso ? `${countryIso} - ${label}` : label
  }

  const { descriptionName, path } = location

  const descriptionLabelKey = path.includes('reference')
    ? 'dataSource.referenceToTataSource'
    : Descriptions.getLabelKey({
        assessment,
        name: descriptionName as CommentableDescriptionName,
      })

  const subSection = subSections.find((_subSection) => _subSection.props.name === sectionName)
  if (!subSection) return includeCountryIso ? countryIso : ''

  const subSectionLabel = Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })

  const label = `${subSectionLabel} - ${t(descriptionLabelKey, { cycleName: cycle.name })}`

  return includeCountryIso ? `${countryIso} - ${label}` : label
}
