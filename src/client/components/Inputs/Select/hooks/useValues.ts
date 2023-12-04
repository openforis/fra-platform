import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'

import { Props } from '../props'
import { Option, TranslatedOption } from '../types'

type TranslatedOptions = Array<TranslatedOption>

type Returned = {
  options: TranslatedOptions
  defaultValue: TranslatedOption | undefined
}

export const useValues = (props: Pick<Props, 'options' | 'value'>): Returned => {
  const { options: _options, value } = props
  const { t } = useTranslation()

  const options: TranslatedOptions = useMemo(
    () =>
      _options.map(
        (item: Option): TranslatedOption => ({
          ...item,
          label: Labels.getLabel({ label: item.label, t }),
        })
      ),
    [_options, t]
  )

  const defaultValue = useMemo(() => {
    return options.find((item) => {
      return item.value === value
    })
  }, [options, value])

  return {
    options,
    defaultValue,
  }
}
