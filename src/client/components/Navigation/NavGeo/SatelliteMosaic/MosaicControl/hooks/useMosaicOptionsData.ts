import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { MosaicOptions, MosaicSource } from 'meta/geo'
import { mosaicYearRange } from 'meta/geo/mosaic'

import { useMosaicOptions, useUiMosaicOptions } from 'client/store/geo/mosaic/hooks/mosaic'
import { Option } from 'client/components/Inputs/Select'

type Sources = {
  key: MosaicSource
  label: string
}

type Returned = {
  optionsHaveChanged: boolean
  sources: Array<Sources>
  yearOptions: Array<Option>
}

const useMosaicOptionsData = (): Returned => {
  const { t } = useTranslation()

  const uiMosaicOptions = useUiMosaicOptions()
  const mosaicOptions = useMosaicOptions()

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

  const optionsHaveChanged = Object.entries(uiMosaicOptions).some(
    ([key, uiOption]: [keyof MosaicOptions, MosaicOptions[keyof MosaicOptions]]) => {
      const currentOption = mosaicOptions[key]
      if (Array.isArray(uiOption) && Array.isArray(currentOption)) {
        return currentOption.length !== uiOption.length || currentOption.some((val) => !uiOption.includes(val))
      }
      return mosaicOptions[key] !== uiOption
    }
  )

  return { optionsHaveChanged, sources, yearOptions }
}

export default useMosaicOptionsData
