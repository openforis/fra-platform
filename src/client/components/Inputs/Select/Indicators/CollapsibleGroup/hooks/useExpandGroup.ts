import { useCallback, useEffect, useState } from 'react'

type Props = {
  inputValue: string
}

type Returned = {
  expanded: boolean
  toggleExpanded: () => void
}

export const useExpandGroup = (props: Props): Returned => {
  const { inputValue } = props
  const [expanded, setExpanded] = useState(false)
  const [manuallyExpanded, setManuallyExpanded] = useState(false)

  useEffect(() => {
    if (inputValue.length > 0) {
      // Expand automatically on search
      if (!expanded) {
        setExpanded(true)
        setManuallyExpanded(false)
      }
    } else if (!manuallyExpanded) {
      // Collapse if not manually expanded
      if (expanded) {
        setExpanded(false)
      }
    }
  }, [expanded, inputValue, manuallyExpanded])

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev)
    setManuallyExpanded(true)
  }, [])

  return { expanded, toggleExpanded }
}
