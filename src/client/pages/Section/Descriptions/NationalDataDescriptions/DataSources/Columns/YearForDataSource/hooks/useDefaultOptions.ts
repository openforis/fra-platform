import { Years } from 'meta/assessment/years'

import { useCycle } from 'client/store/meta/hooks/cycles'

export const useDefaultOptions = () => {
  const cycle = useCycle()
  return Years.annual(cycle).map((o) => ({ value: o, label: o }))
}
