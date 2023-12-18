import { Label } from 'meta/assessment'

import { Option } from 'client/components/Inputs/Select'

export type Options = Array<{
  label: Label
  value: Option['value']
  type?: 'header'
}>
