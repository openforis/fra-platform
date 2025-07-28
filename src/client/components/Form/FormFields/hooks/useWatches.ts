import { FieldProps } from 'client/components/Form/FormFields/types'

import { useClearIf } from './watches/useClearIf'
import { useDisabledOptions } from './watches/useDisabledOptions'
import { useIsDisabled } from './watches/useIsDisabled'
import { useResetIf } from './watches/useResetIf'
import { useTriggerFields } from './watches/useTriggerFields'

type Returned = {
  disabledOptions: Array<string>
  disabled: boolean
}

export const useWatches = (props: FieldProps): Returned => {
  const { watch, ...rest } = props

  const values = watch()

  const propsWatch = { ...rest, values }
  const disabled = useIsDisabled(propsWatch)
  const disabledOptions = useDisabledOptions(propsWatch)
  useClearIf(propsWatch)
  useResetIf(propsWatch)
  useTriggerFields(propsWatch)

  return { disabled, disabledOptions }
}
