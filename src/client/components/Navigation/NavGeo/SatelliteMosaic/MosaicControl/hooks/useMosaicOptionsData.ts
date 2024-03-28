import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { MosaicOptions, MosaicSource } from 'meta/geo'

import { useAppliedMosaicOptions, useUiMosaicOptions } from 'client/store/ui/geo'
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
  const appliedMosaicOptions = useAppliedMosaicOptions()

  const yearOptions = useMemo<Array<Option>>(() => {
    const startYear = 2000
    const endYear = 2022

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
    ([key, uiValue]: [keyof MosaicOptions, MosaicOptions[keyof MosaicOptions]]) => {
      const appliedValue = appliedMosaicOptions[key]
      if (Array.isArray(uiValue) && Array.isArray(appliedValue)) {
        return appliedValue.length !== uiValue.length || appliedValue.some((val) => !uiValue.includes(val))
      }
      return appliedMosaicOptions[key] !== uiValue
    }
  )

  return { optionsHaveChanged, sources, yearOptions }
}

export default useMosaicOptionsData
