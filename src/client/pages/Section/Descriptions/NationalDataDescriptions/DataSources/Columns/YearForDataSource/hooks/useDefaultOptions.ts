import { Years } from 'meta/assessment/years'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { Option } from 'client/components/Inputs/Select'

export const useDefaultOptions = (): Array<Option> => {
  const cycle = useCycle()
  return Years.annual(cycle).map((o) => ({ value: o, label: o }))
}
