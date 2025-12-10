import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { AxisType } from 'meta/explorer/selection'
import { Dimensions } from 'meta/measurement/dimensions'

import MeasureTitle from 'client/pages/Explorer/ResultGrid/MeasureTitle/MeasureTitle'
import { CountryEntry } from 'client/pages/Explorer/ResultGrid/types'

type Returned = (props: { axisType: AxisType; value: string | CountryEntry }) => React.ReactNode

export const useRenderLabel = (): Returned => {
  const { t } = useTranslation()

  return useCallback<Returned>(
    (props) => {
      const { axisType, value } = props
      switch (axisType) {
        case AxisType.countries: {
          const { label } = value as CountryEntry
          return label
        }
        case AxisType.dimensions:
          return t(Dimensions.getTName(value as string), { defaultValue: value })
        case AxisType.measures:
          return <MeasureTitle measureName={value as string} />
        default:
          return null
      }
    },
    [t]
  )
}
