import { TFunction } from 'i18next'
import { Objects } from 'utils/objects'

import { Option, ValueInput } from 'client/components/Inputs/Select/types'

const VALUE = '*'

const newOption = (props: { value: ValueInput; t: TFunction }): Option => {
  const { value, t } = props

  const label = Objects.isEmpty(value) ? t('common.selectAll') : t('common.unselectAll')
  return { label, value: VALUE }
}

export const ToggleAllOptions = {
  VALUE,
  newOption,
}
