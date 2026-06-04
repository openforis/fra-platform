import { useMemo } from 'react'

import { FileUsage } from 'meta/file/meta'
import { Objects } from 'utils/objects'

import { useUsages } from 'client/components/RepositoryList/hooks/useUsages'

export const useLinkedTooltip = (usages: Array<FileUsage> | undefined): string | null => {
  const usageItems = useUsages(usages)

  return useMemo<string | null>(() => {
    if (Objects.isEmpty(usageItems)) return null
    return usageItems.map((u) => u.anchor).join(', ')
  }, [usageItems])
}
