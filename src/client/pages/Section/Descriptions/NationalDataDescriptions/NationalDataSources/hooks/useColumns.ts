import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DataSourceType } from 'meta/assessment/description'

import { useNotApplicableOption } from 'client/components/DataSources/hooks/useNotApplicableOption'
import { PropsDataSources } from 'client/components/DataSources/types'
import { Option } from 'client/components/Inputs/Select'

type Returned = PropsDataSources['columns']

export const useColumns = (): Returned => {
  const { t } = useTranslation()
  const notApplicableOption = useNotApplicableOption()

  return useMemo<Returned>(() => {
    const options: Array<Option> = Object.keys(DataSourceType).map((type) => {
      return {
        label: t(`dataSource.${type}`),
        value: type,
      }
    })
    if (notApplicableOption) options.push(notApplicableOption)

    return { type: { options } }
  }, [notApplicableOption, t])
}
