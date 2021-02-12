import { useRef, useEffect } from 'react'

export default (effect: any, inputs: any[] = []) => {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      effect()
    }
  }, inputs)
}
