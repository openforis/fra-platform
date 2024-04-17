import { TFunction } from 'i18next'

import { DataSourceVariable } from 'meta/assessment/description/nationalDataDataSourceDescription'
import { Labels } from 'meta/assessment/labels'

const getVariableLabel = (props: { variable: DataSourceVariable; t: TFunction }): string => {
  const { variable, t } = props
  const { label: _label, prefixLabel } = variable

  let label = ''
  if (prefixLabel) {
    label = Labels.getLabel({ label: prefixLabel, t })
    label += ' '
  }
  label += Labels.getLabel({ label: _label, t })

  return label
}

export const DataSources = {
  getVariableLabel,
}
