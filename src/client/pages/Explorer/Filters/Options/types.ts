import { MeasureName } from 'meta/measurement/measure'
import { UnitName } from 'meta/measurement/unit'

import { Option } from 'client/components/Inputs/Select'

export type UnitSelectorItem = {
  measureName: MeasureName
  onChange: (unit: UnitName) => void
  options: Array<Option>
  selectedUnit: UnitName | null
}
