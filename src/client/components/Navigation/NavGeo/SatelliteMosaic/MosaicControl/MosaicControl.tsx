import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'client/store'
import { GeoActions, useMosaicStatus, useUiMosaicOptions } from 'client/store/ui/geo'
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
        {sources.map(({ key, label }) => (
          <ButtonCheckbox
            key={key}
            checked={uiMosaicOptions.sources.includes(key)}
            label={label}
            onClick={() => dispatch(GeoActions.toggleMosaicSource(key))}
          />
        ))}
      </div>

      <OptionLabel>{t('common.year')}</OptionLabel>
      <SelectPrimary
        isClearable={false}
        onChange={(value) => dispatch(GeoActions.setMosaicYear(Number(value)))}
        options={yearOptions}
        value={uiMosaicOptions.year.toString()}
      />

      <OptionLabel>{t('geo.maxCloudCoverage')}</OptionLabel>
      <InputRange
        onChange={(e) => dispatch(GeoActions.setMosaicMaxCloudCoverage(Number(e.target.value)))}
        unit="%"
        value={uiMosaicOptions.maxCloudCoverage}
      />

      <ButtonCheckbox
        checked={uiMosaicOptions.snowMasking}
        label={t('geo.snowMasking')}
        onClick={() => dispatch(GeoActions.setMosaicSnowMasking(!uiMosaicOptions.snowMasking))}
      />

      <Button
        className="geo-options-grid__one-col centered"
        disabled={!optionsHaveChanged}
        label={t('common.apply')}
        onClick={() => dispatch(GeoActions.applyMosaicOptions())}
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
