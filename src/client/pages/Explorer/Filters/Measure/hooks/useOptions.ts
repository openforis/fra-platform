import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Measures } from 'meta/measurement/measures'

import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { Option } from 'client/components/Inputs/Select'

type Returned = Array<Option> | undefined

export const useOptions = (): Returned => {
  const { t } = useTranslation()

  const explorerSectionMetadata = useExplorerSectionMetadata()
  const { cellsExportAlways, measures = [] } = explorerSectionMetadata ?? {}

  return useMemo<Returned>(() => {
    if (Objects.isNil(explorerSectionMetadata)) return undefined

    const measuresExportAlways = Measures.getExportAlways(cellsExportAlways)

    return measures.reduce<Returned>((acc, { name }) => {
      if (!measuresExportAlways.includes(name)) {
        acc.push({
          label: t(Measures.getTName(name)),
          value: name,
        })
      }
      return acc
    }, [])
  }, [cellsExportAlways, explorerSectionMetadata, measures, t])
}
