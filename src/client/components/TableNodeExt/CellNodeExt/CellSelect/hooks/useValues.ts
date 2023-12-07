import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'

import { ColumnNodeExt } from 'client/components/TableNodeExt/types'

export const useValues = (props: { column: ColumnNodeExt; value: string }) => {
  const { value, column } = props
  const { options } = column.props

  const { t } = useTranslation()

  const _options = useMemo(
    () =>
      options.map((option) => ({
        ...option,
        label: t(
          Labels.getLabel({
            label: option.label,
            t,
          })
        ),
      })),
    [options, t]
  )
  const _value = useMemo(() => _options.find((option) => option.value === value), [_options, value])

  return {
    value: _value,
    options: _options,
  }
}
