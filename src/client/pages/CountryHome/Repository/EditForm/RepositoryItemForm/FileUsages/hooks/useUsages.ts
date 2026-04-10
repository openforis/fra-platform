import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment/labels'
import { SectionNames } from 'meta/assessment/section'
import { SubSections } from 'meta/assessment/subSections'
import { FileMeta } from 'meta/file/meta'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSections } from 'client/store/meta/hooks/sections'

type Usage = {
  section: string
  locations: Array<string>
}

export const useUsages = (fileMeta: FileMeta | undefined): Array<Usage> => {
  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const sections = useSections()
  const subsections = sections?.flatMap((section) => section.subSections)

  return useMemo<Array<Usage>>(() => {
    return (
      fileMeta?.usages?.map((usage) => {
        const locations =
          usage.locations?.map((location) =>
            t(location.key, { assessmentName: assessment.props.name, cycleName: cycle.name })
          ) ?? []

        if (usage.sectionName === SectionNames.originalDataPoints) {
          return {
            section: `${t('nationalDataPoint.nationalDataPoint')} ${usage.suffix}`,
            locations,
          }
        }

        const subSection = subsections?.find((subsection) => subsection.props.name === usage.sectionName)
        const label = Labels.getCycleLabel({ cycle, labels: subSection?.props.labels, t })
        const anchor = t(
          SubSections.getAnchorLabel({ assessment, cycle, subSection }),
          SubSections.getAnchor({ cycle, subSection })
        )

        return {
          section: `${anchor} ${label}`,
          locations,
        }
      }) ?? []
    )
  }, [assessment, cycle, fileMeta, subsections, t])
}
