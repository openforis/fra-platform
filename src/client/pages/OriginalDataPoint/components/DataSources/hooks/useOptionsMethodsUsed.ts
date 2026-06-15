import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ODPDataSourceMethod } from 'meta/assessment/originalDataPoint'

import { Option } from 'client/components/Inputs/Select'

type Returned = Array<Option>

export const useOptionsMethodsUsed = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    return Object.values(ODPDataSourceMethod).map((value) => {
      const label = t(`nationalDataPoint.dataSourceMethodsOptions.${value}`)
      return { label, value }
    })
  }, [t])
}
