import { DataSource } from 'meta/assessment/descriptionValue'

import { Option } from 'client/components/Inputs/Select'

import { useDefaultOptions } from './useDefaultOptions'

export const useInitialOptions = (dataSource: DataSource) => {
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
