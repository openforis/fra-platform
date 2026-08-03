import React from 'react'
import { useTranslation } from 'react-i18next'

import { LayerFetchStatus } from 'client/store/geo/layers/state'
import { MosaicActions } from 'client/store/geo/mosaic/actions'
import { useMosaicOptions, useMosaicStatus } from 'client/store/geo/mosaic/hooks/mosaic'
import { useAppDispatch } from 'client/store/hooks'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import ButtonCheckbox from 'client/components/Buttons/ButtonCheckbox'
import InputRange from 'client/components/Inputs/InputRange'
import SelectPrimary from 'client/components/Inputs/SelectPrimary'
import OptionLabel from 'client/components/Navigation/NavGeo/Grid/OptionLabel'
import OptionsGrid from 'client/components/Navigation/NavGeo/Grid/OptionsGrid'

import useApplyOptions from './hooks/useApplyOptions'
import useMosaicOptionsData from './hooks/useMosaicOptionsData'

const MosaicControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const mosaicOptions = useMosaicOptions()
  const status = useMosaicStatus()
  const { sources, yearOptions } = useMosaicOptionsData()
  const { applyOptions, disabled } = useApplyOptions()

  return (
    <OptionsGrid>
      <OptionLabel>{t('common.sources')}</OptionLabel>
      <div className="geo-options-grid__flex">
        {sources.map(({ key, label }) => {
          const uiSources = mosaicOptions.sources ?? {}
          const checked = uiSources[key] ?? false
          return (
            <ButtonCheckbox
              key={key}
              checked={checked}
              label={label}
              onClick={() =>
                dispatch(MosaicActions.setOption({ key: 'sources', value: checked ? {} : { [key]: true } }))
              }
            />
          )
        })}
      </div>

      <OptionLabel>{t('common.year')}</OptionLabel>
      <SelectPrimary
        isClearable={false}
        maxMenuHeight={126} // 4 options with 28px height each, plus half of another option
        onChange={(value) => dispatch(MosaicActions.setOption({ key: 'year', value: Number(value) }))}
        options={yearOptions}
        value={mosaicOptions.year.toString()}
      />

      <OptionLabel>{t('geo.maxCloudCoverage')}</OptionLabel>
      <InputRange
        onChange={(e) => dispatch(MosaicActions.setOption({ key: 'maxCloudCoverage', value: Number(e.target.value) }))}
        unit="%"
        value={mosaicOptions.maxCloudCoverage}
      />

      <ButtonCheckbox
        checked={mosaicOptions.snowMasking}
        className="geo-options-grid__one-col"
        label={t('geo.snowMasking')}
        onClick={() => dispatch(MosaicActions.setOption({ key: 'snowMasking', value: !mosaicOptions.snowMasking }))}
      />

      <Button
        className="geo-options-grid__one-col centered"
        disabled={disabled}
        label={t('common.apply')}
        onClick={applyOptions}
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
