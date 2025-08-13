import { Option } from 'client/components/Inputs/Select'

import { useDefaultOptions } from './useDefaultOptions'

export const useCreateOption = (
  options: Array<Option>,
  setOptions: (options: Array<Option>) => void,
  values: Array<string>,
  setValues: (values: Array<string>) => void
) => {
  const defaultOptions = useDefaultOptions()

  return (value: string) => {
    const filterFn = (opt: Option) => !defaultOptions.some((defaultOption) => defaultOption.value === opt.value)
    const newCustomOptions = options.filter(filterFn)
    newCustomOptions.push({ value, label: value })

    // Persist order: first custom options and then default options
    setOptions([...newCustomOptions, ...defaultOptions])
    setValues([...values, value])
  }
}
