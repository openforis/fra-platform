import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { Option } from 'client/components/Inputs/Select'

type Returned = Array<Option> | undefined

export const useOptions = (): Returned => {
  const { t } = useTranslation()

  const explorerSectionMetadata = useExplorerSectionMetadata()
  const { measures } = explorerSectionMetadata ?? {}

  return useMemo<Returned>(() => {
    if (Objects.isNil(explorerSectionMetadata)) return undefined
    return (measures ?? []).map(({ name }) => {
      return { label: t(`measures.${name}`), value: name }
    })
  }, [explorerSectionMetadata, measures, t])
}
