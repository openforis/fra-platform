import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { useExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { Option } from 'client/components/Inputs/Select'

type Returned = Array<Option> | undefined

export const useOptions = (): Returned => {
  const explorerSectionMetadata = useExplorerSectionMetadata()
  const { dimensions } = explorerSectionMetadata ?? {}

  return useMemo<Returned>(() => {
    if (Objects.isNil(explorerSectionMetadata)) return undefined
    return (dimensions ?? []).map(({ name }) => {
      return { label: name, value: name }
    })
  }, [dimensions, explorerSectionMetadata])
}
