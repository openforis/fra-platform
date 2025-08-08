import React from 'react'
import { useTranslation } from 'react-i18next'

import { MosaicActions } from 'client/store/geo/mosaic/actions'
import { useMosaicStatus, useUiMosaicOptions } from 'client/store/geo/mosaic/hooks/mosaic'
import { useAppDispatch } from 'client/store/hooks'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import ButtonCheckbox from 'client/components/Buttons/ButtonCheckbox'
import InputRange from 'client/components/Inputs/InputRange'
import SelectPrimary from 'client/components/Inputs/SelectPrimary'
import OptionLabel from 'client/components/Navigation/NavGeo/Grid/OptionLabel'
import OptionsGrid from 'client/components/Navigation/NavGeo/Grid/OptionsGrid'

import useMosaicOptionsData from './hooks/useMosaicOptionsData'

const MosaicControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const uiMosaicOptions = useUiMosaicOptions()
  const status = useMosaicStatus()
  const { optionsHaveChanged, sources, yearOptions } = useMosaicOptionsData()

  return (
    <OptionsGrid>
      <OptionLabel>{t('common.sources')}</OptionLabel>
      <div className="geo-options-grid__flex">
        {sources.map(({ key, label }) => {
          const checked = uiMosaicOptions.sources?.[key] ?? false
          return (
            <ButtonCheckbox
              key={key}
              checked={checked}
              label={label}
              onClick={() => dispatch(MosaicActions.setUiOptions({ datum: { sources: { [key]: !checked } } }))}
            />
          )
        })}
      </div>

      <OptionLabel>{t('common.year')}</OptionLabel>
      <SelectPrimary
        isClearable={false}
        maxMenuHeight={126} // 4 options with 28px height each, plus half of another option
        onChange={(value) => dispatch(MosaicActions.setUiOptions({ datum: { year: Number(value) } }))}
        options={yearOptions}
        value={uiMosaicOptions.year.toString()}
      />

      <OptionLabel>{t('geo.maxCloudCoverage')}</OptionLabel>
      <InputRange
        onChange={(e) => dispatch(MosaicActions.setUiOptions({ datum: { maxCloudCoverage: Number(e.target.value) } }))}
        unit="%"
        value={uiMosaicOptions.maxCloudCoverage}
      />

      <ButtonCheckbox
        checked={uiMosaicOptions.snowMasking}
        className="geo-options-grid__one-col"
        label={t('geo.snowMasking')}
        onClick={() => dispatch(MosaicActions.setUiOptions({ datum: { snowMasking: !uiMosaicOptions.snowMasking } }))}
      />

      <Button
        className="geo-options-grid__one-col centered"
        disabled={!optionsHaveChanged}
        label={t('common.apply')}
        onClick={() => dispatch(MosaicActions.applyOptions())}
        size={ButtonSize.s}
      />

      {status === LayerFetchStatus.Failed && (
        <OptionLabel className="geo-options-grid__one-col centered geo-options-grid__error">
          {t('geo.error.mosaic.noMosaicAvailableForConfiguration')}
        </OptionLabel>
      )}
    </OptionsGrid>
  )
}

export default MosaicControl
