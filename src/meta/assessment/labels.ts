import { TFunction } from 'i18next'

import { Cycle } from 'meta/assessment/cycle'
import { Label } from 'meta/assessment/label'

const getLabel = (props: { label: Label; t: TFunction }): string | undefined => {
  const { label = {}, t } = props

  let labelString = ''
  if (label.prefixKey) labelString += t(label.prefixKey)
  if (label.key) labelString += t(label.key, { ...label.params })
  if (label.label) labelString += label.label
  return labelString
}

const getCycleLabel = (props: { cycle: Cycle; labels: Record<string, Label>; t: TFunction }): string | undefined => {
  const { cycle, labels = {}, t } = props

  const label = labels[cycle.uuid]
  if (label) {
    return getLabel({ label, t })
  }

  return undefined
}

export const Labels = {
  getLabel,
  getCycleLabel,
}
