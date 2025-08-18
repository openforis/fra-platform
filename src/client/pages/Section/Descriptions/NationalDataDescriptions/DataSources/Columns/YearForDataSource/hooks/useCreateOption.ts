import { Option } from 'client/components/Inputs/Select'

import { useDefaultOptions } from './useDefaultOptions'

type Props = {
  options: Array<Option>
  setOptions: (options: Array<Option>) => void
  values: Array<string>
  setValues: (values: Array<string>) => void
}

type Returned = (value: string) => void

export const useCreateOption = (props: Props): Returned => {
  const { options, setOptions, setValues, values } = props
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
