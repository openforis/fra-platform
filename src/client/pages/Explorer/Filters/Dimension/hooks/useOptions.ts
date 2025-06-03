import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Dimensions } from 'meta/measurement/dimensions'

import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { Option } from 'client/components/Inputs/Select'

type Returned = Array<Option> | undefined

export const useOptions = (): Returned => {
  const { t } = useTranslation()

  const explorerSectionMetadata = useExplorerSectionMetadata()
  const { dimensions } = explorerSectionMetadata ?? {}

  return useMemo<Returned>(() => {
    if (Objects.isNil(explorerSectionMetadata)) return undefined
    return (dimensions ?? []).map(({ name }) => {
      return {
        label: t(Dimensions.getTName(name), { defaultValue: name }),
        value: name,
      }
    })
  }, [dimensions, explorerSectionMetadata, t])
}
