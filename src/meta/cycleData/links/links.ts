import { TFunction } from 'i18next'

import { Cycle } from 'meta/assessment/cycle'
import { Descriptions } from 'meta/assessment/description/descriptions'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { Labels } from 'meta/assessment/labels'
import { SubSection } from 'meta/assessment/section'
import { LinkLocation, LinkValidationStatusCode } from 'meta/cycleData/links/link'

const getI18nValidationStatusLabelKey = (code: LinkValidationStatusCode): string => {
  if ([LinkValidationStatusCode.success, LinkValidationStatusCode.empty].includes(code)) {
    return `common.${code}`
  }
  return `admin.${code}`
}

type GetLocationLabelProps = {
  cycle: Cycle
  isPanEuropean: boolean
  location: LinkLocation
  subSections: Array<SubSection>
  t: TFunction
}

const getLocationLabel = (props: GetLocationLabelProps): string => {
  const { cycle, isPanEuropean, location, subSections, t } = props

  const { sectionName } = location

  // is an ODP location
  if ('year' in location) {
    const { odpSection, year } = location
    const descriptionLabelKey = odpSection === 'description' ? 'dataSource.comments' : 'nationalDataPoint.dataSources'
    return `${year} ${t('nationalDataPoint.nationalDataPoint')} - ${t(descriptionLabelKey)}`
  }

  const { descriptionName, path } = location

  const descriptionLabelKey = path.includes('reference')
    ? 'dataSource.referenceToTataSource'
    : Descriptions.getLabelKey({
        name: descriptionName as CommentableDescriptionName,
        isPanEuropean,
      })

  const subSection = subSections.find((_subSection) => _subSection.props.name === sectionName)
  if (!subSection) return ''

  const subSectionLabel = Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })

  return `${subSectionLabel} - ${t(descriptionLabelKey, { cycleName: cycle.name })}`
}

export const Links = {
  getI18nValidationStatusLabelKey,
  getLocationLabel,
}
