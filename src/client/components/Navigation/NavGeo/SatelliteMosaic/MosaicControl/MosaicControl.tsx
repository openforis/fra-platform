import './MosaicControl.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'client/store'
import { GeoActions, useMosaicStatus, useUiMosaicOptions } from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import ButtonCheckBox from 'client/components/ButtonCheckBox'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import InputRange from 'client/components/Inputs/InputRange'
import Select from 'client/components/Inputs/Select'

import useMosaicOptionsData from './hooks/useMosaicOptionsData'

const MosaicControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const uiMosaicOptions = useUiMosaicOptions()
  const status = useMosaicStatus()
  const { optionsHaveChanged, sources, yearOptions } = useMosaicOptionsData()

  return (
    <div className="geo-mosaic-control">
      <p>{t('common.sources')}</p>
      <div>
        {sources.map(({ key, label }) => (
          <ButtonCheckBox
            key={key}
            checked={uiMosaicOptions.sources.includes(key)}
            className="geo-mosaic-control__source"
            label={label}
            onClick={() => dispatch(GeoActions.toggleMosaicSource(key))}
          />
        ))}
      </div>

      <p>{t('common.year')}</p>
      <div className="geo-mosaic-control__year-selector-container">
        <Select
          onChange={(value) => dispatch(GeoActions.setMosaicYear(Number(value)))}
          options={yearOptions}
          value={uiMosaicOptions.year.toString()}
        />
      </div>

      <p>{t('geo.maxCloudCoverage')}</p>
      <div className="geo-mosaic-control__max-cloud-coverage">
        <InputRange
          onChange={(e) => dispatch(GeoActions.setMosaicMaxCloudCoverage(Number(e.target.value)))}
          unit="%"
          value={uiMosaicOptions.maxCloudCoverage}
        />
      </div>

      <Button
        disabled={!optionsHaveChanged}
        label={t('common.apply')}
        onClick={() => dispatch(GeoActions.applyMosaicOptions())}
        size={ButtonSize.m}
      />

      {status === LayerFetchStatus.Failed && (
        <p className="geo-mosaic-control__error-message">{t('geo.error.mosaic.noMosaicAvailableForConfiguration')}</p>
      )}
    </div>
  )
}

export default MosaicControl
