import { useState } from 'react'

type Returned = {
  collapsed: Record<string, boolean>
  onToggle: (uuid: string) => void
}

export const useOnToggle = (): Returned => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const onToggle = (uuid: string): void => setCollapsed((prev) => ({ ...prev, [uuid]: !prev[uuid] }))

  return { collapsed, onToggle }
}
