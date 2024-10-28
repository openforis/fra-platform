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

  useEffect(() => {
    if (inputValue.length > 0) {
      setExpanded(true)
    }
  }, [inputValue])

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  return { expanded, toggleExpanded }
}
