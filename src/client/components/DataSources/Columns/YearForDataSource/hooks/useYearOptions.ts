import { useCallback, useMemo, useState } from 'react'

import { DataSourceNotApplicable } from 'meta/assessment/descriptionValue/dataSource'

import { useNotApplicableOption } from 'client/components/DataSources/hooks/useNotApplicableOption'
import { PropsDataSourceComponent } from 'client/components/DataSources/types'
import { Option } from 'client/components/Inputs/Select'

const _getOptions = (customValues: Array<string>, defaultOptions: Array<Option>): Array<Option> => {
  const customOptions = customValues.reduce<Array<Option>>((acc, value) => {
    const containsValue = defaultOptions.some((option) => option.value === value)
    // Not applicable has no option when it's hidden, so it must not be shown as a custom year
    if (!containsValue && value !== DataSourceNotApplicable) acc.push({ value, label: value })
    return acc
  }, [])
  return [...customOptions, ...defaultOptions]
}

// Not applicable and years exclude each other, the last picked one is kept
const _getValues = (newValues: Array<string>): Array<string> => {
  if (newValues.at(-1) === DataSourceNotApplicable) return [DataSourceNotApplicable]
  return newValues.filter((value) => value !== DataSourceNotApplicable)
}

type Props = Pick<PropsDataSourceComponent, 'dataSource' | 'onChange'>

type Returned = {
  options: Array<Option>
  values: Array<string>
  onChange: (values: Array<string>) => void
  onCreateOption: (value: string) => void
}

export const useYearOptions = (props: Props): Returned => {
  const { dataSource, onChange: _onChange } = props

  const notApplicableOption = useNotApplicableOption()

  const defaultOptions = useMemo<Array<Option>>((): Array<Option> => {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => String(2000 + i))
    const options: Array<Option> = years.reverse().map((year) => ({ value: year, label: year }))
    if (notApplicableOption) options.push(notApplicableOption)
    return options
  }, [notApplicableOption])

  const initialOptions = useMemo<Array<Option>>(
    (): Array<Option> => _getOptions(dataSource.year, defaultOptions),
    [dataSource.year, defaultOptions]
  )

  const [options, setOptions] = useState<Array<Option>>(initialOptions)
  const [values, setValues] = useState<Array<string>>(dataSource.year)

  const onCreateOption = useCallback<(value: string) => void>(
    (value: string): void => {
      const newValues = _getValues([...values, value])
      setOptions(_getOptions(newValues, defaultOptions))
      setValues(newValues)
    },
    [defaultOptions, values]
  )

  const onChange = useCallback<(values: Array<string>) => void>(
    (newValues): void => {
      const valuesUpdate = _getValues(newValues)
      setValues(valuesUpdate)
      _onChange(dataSource, 'year', valuesUpdate)
    },
    [_onChange, dataSource]
  )

  return { options, values, onChange, onCreateOption }
}
