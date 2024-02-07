import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Labels, SubSections } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useSections } from 'client/store/metadata'
import { Option, OptionsGroup } from 'client/components/Inputs/Select'

type Returned = Array<OptionsGroup>

export const useOptionsContributions = (): Returned => {
  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const sections = useSections()

  return useMemo<Returned>(() => {
    const optionGroups = sections.map<OptionsGroup>((section) => {
      const options = section.subSections.map<Option>((subSection) => {
        const anchor = t(
          SubSections.getAnchorLabel({ assessment, cycle, subSection }),
          SubSections.getAnchor({ cycle, subSection })
        )
        const _label = Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })
        const label = t(`${anchor} ${_label}`)
        const value = subSection.uuid

        return { label, value }
      })

      const label = t(Labels.getCycleLabel({ cycle, labels: section.props.labels, t }))

      return { label, options }
    })

    return [
      {
        label: `${t('contactPersons.all')}/${t('contactPersons.none')}`,
        options: [
          { label: t('contactPersons.all'), value: 'all' },
          { label: t('contactPersons.none'), value: 'none' },
        ],
      },
      ...optionGroups,
    ]
  }, [assessment, cycle, sections, t])
}
