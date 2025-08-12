import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { MosaicSource } from 'meta/geo'
import { mosaicYearRange } from 'meta/geo/mosaic'

import { Option } from 'client/components/Inputs/Select'

type Sources = {
  key: MosaicSource
  label: string
}

type Returned = {
  sources: Array<Sources>
  yearOptions: Array<Option>
}

const useMosaicOptionsData = (): Returned => {
  const { t } = useTranslation()

  const yearOptions = useMemo<Array<Option>>(() => {
    const { endYear, startYear } = mosaicYearRange

    const years = Array(endYear - startYear + 1)
      .fill(startYear)
      .map((_, i) => startYear + i)

    const yearOptions = years.map((year) => ({
      label: year.toString(),
      value: year.toString(),
    }))

    return yearOptions
  }, [])

  const sources: Array<Sources> = [
    { key: 'sentinel', label: t('geo.sentinel') },
    { key: 'landsat', label: t('geo.landsat') },
  ]

  return {
    sources,
    yearOptions,
  }
}

export default useMosaicOptionsData
