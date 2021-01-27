import { useRef, useEffect } from 'react'

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'inputs' implicitly has an 'any[]' type.
export default (effect: any, inputs = []) => {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      effect()
    }
  }, inputs)
}
