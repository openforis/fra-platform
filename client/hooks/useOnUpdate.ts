import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export const useOnUpdate = (effect: EffectCallback, deps?: DependencyList): void => {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      effect()
    }
  }, deps)
}
