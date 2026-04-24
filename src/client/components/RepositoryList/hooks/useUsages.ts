import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment/labels'
import { SectionNames } from 'meta/assessment/section'
import { SubSections } from 'meta/assessment/subSections'
import { FileUsage } from 'meta/file/meta'
import { Objects } from 'utils/objects'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSections } from 'client/store/meta/hooks/sections'

export type Usage = {
  anchor: string
  locations: Array<string>
  section: string
}

export const useUsages = (usages: Array<FileUsage> | undefined): Array<Usage> => {
  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const sections = useSections()
  const subsections = sections?.flatMap((section) => section.subSections)

  return useMemo<Array<Usage>>(() => {
    if (Objects.isEmpty(usages)) return []

    return usages.map((usage) => {
      const locations =
        usage.locations?.map((location) =>
          t(location.key, { assessmentName: assessment.props.name, cycleName: cycle.name })
        ) ?? []

      if (usage.sectionName === SectionNames.originalDataPoints) {
        return {
          anchor: `ODP ${usage.suffix}`,
          locations,
          section: `${t('nationalDataPoint.nationalDataPoint')} ${usage.suffix}`,
        }
      }

      const subSection = subsections?.find((s) => s.props.name === usage.sectionName)
      const anchor = SubSections.getAnchor({ cycle, subSection })
      const label = Labels.getCycleLabel({ cycle, labels: subSection?.props.labels, t })
      const anchorLabel = t(SubSections.getAnchorLabel({ assessment, cycle, subSection }), anchor)

      return {
        anchor,
        locations,
        section: `${anchorLabel} ${label}`,
      }
    })
  }, [assessment, cycle, subsections, t, usages])
}
