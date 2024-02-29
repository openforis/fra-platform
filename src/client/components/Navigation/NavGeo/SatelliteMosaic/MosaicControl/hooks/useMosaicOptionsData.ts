import { useTranslation } from 'react-i18next'

import { MosaicOptions, MosaicSource } from 'meta/geo'

import { useAppliedMosaicOptions, useUiMosaicOptions } from 'client/store/ui/geo'

type Sources = {
  key: MosaicSource
  label: string
}

type Returned = {
  optionsHaveChanged: boolean
  sources: Array<Sources>
  years: Array<number>
}

const useMosaicOptionsData = (): Returned => {
  const { t } = useTranslation()

  const uiMosaicOptions = useUiMosaicOptions()
  const appliedMosaicOptions = useAppliedMosaicOptions()

  const startYear = 2000
  const endYear = 2022

  const years = Array(endYear - startYear + 1)
    .fill(startYear)
    .map((_, i) => startYear + i)

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

  return { optionsHaveChanged, sources, years }
}

export default useMosaicOptionsData
