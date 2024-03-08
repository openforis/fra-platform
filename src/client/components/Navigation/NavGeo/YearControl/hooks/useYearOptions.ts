import { useMemo } from 'react'

import { Option } from 'client/components/Inputs/Select'

type Props = {
  years: Array<number>
}

type Returned = Array<Option>

export const useYearOptions = (props: Props): Returned => {
  const { years } = props

  return useMemo<Returned>(() => {
    return years.map((year) => {
      const yearString = year.toString()
      return { label: yearString, value: yearString }
    })
  }, [years])
}
