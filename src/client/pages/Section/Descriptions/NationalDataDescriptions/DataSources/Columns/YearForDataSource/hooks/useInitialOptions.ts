import { DataSource } from 'meta/assessment/descriptionValue'

import { Option } from 'client/components/Inputs/Select'

import { useDefaultOptions } from './useDefaultOptions'

type Props = {
  dataSource: DataSource
}

export const useInitialOptions = (props: Props): Array<Option> => {
  const { dataSource } = props
  const defaultOptions = useDefaultOptions()
  const customOptions: Array<Option> = []

  dataSource.year.forEach((year) => {
    // If the data source has a custom value, prepend it to the list of defaultOptions
    if (!defaultOptions.some((option) => option.value === year)) {
      customOptions.unshift({ value: year, label: year })
    }
  })

  return [...customOptions, ...defaultOptions]
}
