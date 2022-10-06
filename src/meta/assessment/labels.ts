import { TFunction } from 'i18next'

import { Cycle } from '@meta/assessment/cycle'
import { Label } from '@meta/assessment/label'

const getLabel = (props: { cycle: Cycle; labels: Record<string, Label>; t: TFunction }): string | undefined => {
  const { cycle, labels = {}, t } = props

  const label = labels[cycle.uuid]
  if (label) {
    let labelString = ''
    if (label.prefixKey) labelString += t(label.prefixKey)
    if (label.key) labelString += t(label.key, { ...label.params })
    if (label.label) labelString += label.label
    return labelString
  }

  return undefined
}

export const Labels = {
  getLabel,
}
