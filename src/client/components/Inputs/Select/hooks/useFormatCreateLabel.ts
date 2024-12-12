import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { SelectProps } from 'client/components/Inputs/Select/types'

type Returned = ((value: string) => string) | undefined

export const useFormatCreateLabel = (props: SelectProps): Returned => {
  const { isCreatable, createOptionLabelKey } = props

  const { t } = useTranslation()

  if (isCreatable && !Objects.isEmpty(createOptionLabelKey)) {
    return (value: string) => t(createOptionLabelKey, { value })
  }

  return undefined
}
