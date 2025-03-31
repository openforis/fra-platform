import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Col } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'
import { NodeValue } from 'meta/assessment/node'

import { useCycle } from 'client/store/assessment'
import { Option, OptionsGroup, OptionsOrGroups } from 'client/components/Inputs/Select'

type Props = {
  col: Col
  nodeValue: NodeValue
}

export const useOptions = (props: Props): OptionsOrGroups => {
  const { col } = props

  const { t } = useTranslation()
  const cycle = useCycle()

  const { labelKeyPrefix } = Cols.getSelectProps({ cycle, col })
  const optionsProps = Cols.getSelectOptions({ cycle, col })

  return useMemo<OptionsOrGroups>(() => {
    const groups: Array<OptionsGroup> = []
    let options: Array<Option> = []

    optionsProps.forEach((optionProps) => {
      const label = Cols.getSelectOptionLabel(optionProps, t, labelKeyPrefix)

      if (optionProps.type === 'header') {
        options = []
        const _group = { label, options }
        groups.push(_group)
      } else {
        const option = { label, value: optionProps.name }
        options.push(option)
      }
    })

    return groups.length > 0 ? groups : options
  }, [labelKeyPrefix, optionsProps, t])
}
