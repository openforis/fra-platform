import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Descriptions } from 'meta/assessment/description/descriptions'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { Labels } from 'meta/assessment/labels'
import { LinkLocation } from 'meta/cycleData'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSections } from 'client/store/meta/hooks/sections'
import { useIsPanEuropeanRoute } from 'client/hooks'

type Returned = (location: LinkLocation) => string

export const useGetLocationLabel = (): Returned => {
  const { t } = useTranslation()
  const isPanEuropean = useIsPanEuropeanRoute()
  const sections = useSections()
  const cycle = useCycle()

  return useCallback<Returned>(
    (location) => {
      const { tableName } = location
      if (tableName === 'original_data_point') {
        const { colName, year } = location
        const descriptionLabelKey = colName === 'description' ? 'dataSource.comments' : 'nationalDataPoint.dataSources'
        return `${year} ${t('nationalDataPoint.nationalDataPoint')} - ${t(descriptionLabelKey)}`
      }

      const { descriptionName, path, sectionName } = location

      const descriptionLabelKey = path.includes('reference')
        ? 'dataSource.referenceToTataSource'
        : Descriptions.getI18nCommentableDescriptionLabelKey({
            name: descriptionName as CommentableDescriptionName,
            isPanEuropean,
          })

      const subsections = sections?.flatMap((section) => section.subSections)
      const subSection = subsections?.find((subsection) => subsection.props.name === sectionName)
      if (!subSection) return ''

      const subSectionLabel = Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })

      return `${subSectionLabel} - ${t(descriptionLabelKey, { cycleName: cycle.name })}`
    },
    [cycle, isPanEuropean, sections, t]
  )
}
