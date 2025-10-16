import { EffectCallback, useEffect } from 'react'

export const useOnMount = (effect: EffectCallback): void => {
  // eslint-disable-next-line
  useEffect(effect, [])
}
