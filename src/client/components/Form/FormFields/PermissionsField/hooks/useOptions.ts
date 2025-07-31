import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { SubSections } from 'meta/assessment/subSections'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSections } from 'client/store/meta/hooks/sections'
import { Option } from 'client/components/Inputs/Select'

export const useOptions = (): Array<Option> => {
  const { t } = useTranslation()
  const cycle = useCycle()
  const sections = useSections()

  return useMemo<Array<Option>>(() => {
    if (!cycle || !sections) return []
    const anchors = SubSections.getAnchorsByUuid({ cycle, sections })
    return [
      { value: 'all', label: t('common.all') },
      { value: 'none', label: t('contactPersons.none') },
      ...Object.entries(anchors)
        .sort((a, b) => a[1].localeCompare(b[1]))
        .map(([sectionUuid, anchor]) => ({
          value: sectionUuid,
          label: t(anchor),
        })),
    ]
  }, [cycle, sections, t])
}
