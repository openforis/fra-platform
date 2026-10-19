import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment/labels'
import { Measures } from 'meta/measurement/measures'
import { Objects } from 'utils/objects'

import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { Option, OptionsGroup } from 'client/components/Inputs/Select'

type Returned = Array<Option | OptionsGroup> | undefined

export const useOptions = (): Returned => {
  const { t } = useTranslation()

  const explorerSectionMetadata = useExplorerSectionMetadata()
  const { cellsExportAlways, measures = [] } = explorerSectionMetadata ?? {}

  return useMemo<Returned>(() => {
    if (Objects.isNil(explorerSectionMetadata)) return undefined

    const measuresExportAlways = Measures.getExportAlways(cellsExportAlways)
    const options: Array<Option | OptionsGroup> = []

    measures.forEach((measure) => {
      if (measuresExportAlways.includes(measure.name)) return

      const option: Option = {
        // nested measures are indented by level, see Measures.scss
        className: measure.level > 0 ? `level-${measure.level}` : undefined,
        label: t(Measures.getTName(measure.name)),
        value: measure.name,
      }
      if (!measure.group) {
        options.push(option)
        return
      }

      // measures of the same table heading come one after the other, so they join the group opened last
      const groupLabel = Labels.getLabel({ label: measure.group, t })
      const lastEntry = options.at(-1)
      const isSameGroup = lastEntry && 'options' in lastEntry && lastEntry.label === groupLabel
      if (isSameGroup) lastEntry.options.push(option)
      else options.push({ label: groupLabel, options: [option] })
    })

    return options
  }, [cellsExportAlways, explorerSectionMetadata, measures, t])
}
