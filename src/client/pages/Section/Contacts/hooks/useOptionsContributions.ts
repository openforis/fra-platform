import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Label, Labels, SubSections } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useSections } from 'client/store/metadata'
import { Option } from 'client/components/Inputs/Select'

type Options = Array<{
  label: Label
  value: Option['value']
  type?: 'header'
}>

export const useOptionsContributions = (): Options => {
  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const sections = useSections()

  return useMemo<Options>(
    () =>
      sections.flatMap((section) => {
        const subSections = section.subSections.flatMap((subSection) => {
          const anchor = t(
            SubSections.getAnchorLabel({ assessment, cycle, subSection }),
            SubSections.getAnchor({ cycle, subSection })
          )

          const _label = Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })

          const label = { key: `${anchor} ${_label}` }
          const value = subSection.uuid

          return { label, value }
        })

        const label = { key: Labels.getCycleLabel({ cycle, labels: section.props.labels, t }) }

        return [{ label, value: section.uuid, type: 'header' }, ...subSections]
      }),
    [assessment, cycle, sections, t]
  )
}
