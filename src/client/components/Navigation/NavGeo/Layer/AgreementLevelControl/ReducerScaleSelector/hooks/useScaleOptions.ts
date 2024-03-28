import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Option } from 'client/components/Inputs/Select'

type Props = {
  scales: Array<number>
}

type Returned = Array<Option>

export const useScaleOptions = (props: Props): Returned => {
  const { scales } = props

  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    return scales.map((meters) => {
      const label = t('geo.metersReducerScale', { meters })
      const value = meters.toString()
      return { label, value }
    })
  }, [scales, t])
}
