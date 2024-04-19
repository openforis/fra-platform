import { TFunction } from 'i18next'

import { Option, ValueInput } from 'client/components/Inputs/Select/types'

const VALUE = '*'

const newOption = (props: { value: ValueInput; t: TFunction }): Option => {
  const { value, t } = props

  const label = Array.isArray(value) && value.length === 0 ? t('common.selectAll') : t('common.unselectAll')
  return { label, value: VALUE }
}

export const ToggleAllOptions = {
  VALUE,
  newOption,
}
