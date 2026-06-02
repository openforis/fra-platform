import { useState } from 'react'

type Returned = {
  expanded: Record<string, boolean>
  onCollapseAll: () => void
  onExpandAll: (uuids: Array<string>) => void
  onToggle: (uuid: string) => void
}

export const useOnToggle = (): Returned => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const onToggle = (uuid: string): void => setExpanded((prev) => ({ ...prev, [uuid]: !prev[uuid] }))
  const onExpandAll = (uuids: Array<string>): void => setExpanded(Object.fromEntries(uuids.map((uuid) => [uuid, true])))
  const onCollapseAll = (): void => setExpanded({})

  return { expanded, onCollapseAll, onExpandAll, onToggle }
}
