import { useCallback, useMemo, useState } from 'react'

import { PropsDataSourceComponent } from 'client/components/DataSources/types'
import { Option } from 'client/components/Inputs/Select'

const _getOptions = (customValues: Array<string>, defaultOptions: Array<Option>): Array<Option> => {
  const customOptions = customValues.reduce<Array<Option>>((acc, value) => {
    const containsValue = defaultOptions.some((option) => option.value === value)
    if (!containsValue) acc.push({ value, label: value })
    return acc
  }, [])
  return [...customOptions, ...defaultOptions]
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

  const defaultOptions = useMemo<Array<Option>>((): Array<Option> => {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 2000 }, (_, i) => String(2000 + i))
    return years.map((year) => ({ value: year, label: year }))
  }, [])

  const initialOptions = useMemo<Array<Option>>(
    (): Array<Option> => _getOptions(dataSource.year, defaultOptions),
    [dataSource.year, defaultOptions]
  )

  const [options, setOptions] = useState<Array<Option>>(initialOptions)
  const [values, setValues] = useState<Array<string>>(dataSource.year)

  const onCreateOption = useCallback<(value: string) => void>(
    (value: string): void => {
      const newValues = [...values, value]
      setOptions(_getOptions(newValues, defaultOptions))
      setValues(newValues)
    },
    [defaultOptions, values]
  )

  const onChange = useCallback<(values: Array<string>) => void>(
    (newValues): void => {
      setValues(newValues)
      _onChange(dataSource, 'year', newValues)
    },
    [_onChange, dataSource]
  )

  return { options, values, onChange, onCreateOption }
}
