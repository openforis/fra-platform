import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TFunction } from 'i18next'

import { Col, ColSelectOption, NodeValue } from 'meta/assessment'

import { Option, OptionsGroup, OptionsOrGroups } from 'client/components/Inputs/Select'

const getLabel = (option: ColSelectOption, t: TFunction, labelKeyPrefix = 'yesNoTextSelect'): string => {
  const label = Number.isInteger(+option.name) ? option.name : t(`${labelKeyPrefix}.${option.name}`)
  return option.type === 'header' ? `-- ${label} --` : label
}

type Props = {
  col: Col
  nodeValue: NodeValue
}

type Returned = {
  options: OptionsOrGroups
  value?: Option
}

export const useValues = (props: Props): Returned => {
  const { col, nodeValue } = props
  const { options: optionsProps, labelKeyPrefix } = col.props.select

  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const groups: Array<OptionsGroup> = []
    let options: Array<Option> = []
    let value: Option = null

    optionsProps.forEach((optionProps) => {
      const label = getLabel(optionProps, t, labelKeyPrefix)

      if (optionProps.type === 'header') {
        options = []
        const _group = { label, options }
        groups.push(_group)
      } else {
        const option = { label, value: optionProps.name }
        options.push(option)

        if (optionProps.name === nodeValue.raw) {
          value = option
        }
      }
    })

    return { options: groups.length > 0 ? groups : options, value }
  }, [optionsProps, t, labelKeyPrefix, nodeValue.raw])
}
