import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Labels, SectionNames, SubSections } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useSections } from 'client/store/metadata'
import { useRepositoryFileMeta } from 'client/store/ui/repository'

type Returned = Array<{
  section: string
  locations: Array<string>
}>
export const useUsages = (): Returned => {
  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const fileMeta = useRepositoryFileMeta()
  const sections = useSections()
  const subsections = sections?.flatMap((section) => section.subSections)

  return useMemo<Returned>(() => {
    return (
      fileMeta?.usages?.map((usage) => {
        const locations =
          usage?.locations?.map((location) =>
            t(location.key, { assessmentName: assessment.props.name, cycleName: cycle.name })
          ) ?? []

        if (usage.sectionName === SectionNames.originalDataPoints) {
          return {
            section: t('nationalDataPoint.nationalDataPoint'),
            locations,
          }
        }

        const subSection = subsections?.find((subsection) => subsection.props.name === usage.sectionName)
        const label = Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })
        const anchor = t(
          SubSections.getAnchorLabel({ assessment, cycle, subSection }),
          SubSections.getAnchor({ cycle, subSection })
        )

        return {
          section: `${anchor} ${label} `,
          locations,
        }
      }) ?? []
    )
  }, [assessment, cycle, fileMeta, subsections, t])
}
