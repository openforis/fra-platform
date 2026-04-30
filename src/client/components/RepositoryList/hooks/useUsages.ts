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

type Returned = Array<Usage>
export const useUsages = (usages: Array<FileUsage> | undefined): Returned => {
  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const sections = useSections()
  const subsections = sections?.flatMap((section) => section.subSections)

  return useMemo<Returned>(() => {
    if (Objects.isEmpty(usages)) return []

    return usages.reduce<Returned>((acc, usage) => {
      const locations =
        usage.locations?.map((location) =>
          t(location.key, { assessmentName: assessment.props.name, cycleName: cycle.name })
        ) ?? []

      if (usage.sectionName === SectionNames.originalDataPoints) {
        acc.push({
          anchor: `ODP ${usage.suffix}`,
          locations,
          section: `${t('nationalDataPoint.nationalDataPoint')} ${usage.suffix}`,
        })
        return acc
      }

      const subSection = subsections?.find((s) => s.props.name === usage.sectionName)
      if (Objects.isNil(subSection)) return acc

      const anchor = SubSections.getAnchor({ cycle, subSection })
      const label = Labels.getCycleLabel({ cycle, labels: subSection?.props.labels, t })
      const anchorLabel = t(SubSections.getAnchorLabel({ assessment, cycle, subSection }), anchor)

      acc.push({
        anchor,
        locations,
        section: `${anchorLabel} ${label}`,
      })
      return acc
    }, [])
  }, [assessment, cycle, subsections, t, usages])
}
