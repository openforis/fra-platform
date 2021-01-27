import { useRef, useEffect } from 'react'

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'initialValue' implicitly has an 'any' t... Remove this comment to see the full error message
export default (value: any, initialValue = null) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef(initialValue)

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}
