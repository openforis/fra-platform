import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TFunction } from 'i18next'

import { Col, Cols, ColSelectOption, NodeValue } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { Option, OptionsGroup, OptionsOrGroups } from 'client/components/Inputs/Select'

const getLabel = (option: ColSelectOption, t: TFunction, labelKeyPrefix = 'yesNoTextSelect'): string => {
  const label = Number.isInteger(+option.name) ? option.name : t(`${labelKeyPrefix}.${option.name}`)
  return option.type === 'header' ? `-- ${label} --` : label
}

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
      const label = getLabel(optionProps, t, labelKeyPrefix)

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
