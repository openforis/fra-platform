import './CountryOptions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { AxisSelection, ExplorerCountryOptions } from 'meta/explorer/selection'

import ButtonCheckbox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import Icon from 'client/components/Icon'
import Flex from 'client/components/Layout/Flex'
import { useCountryOptionsEnabled } from 'client/pages/Explorer/ResultGrid/hooks/useCountryOptionsEnabled'

import { useCheckboxes } from './hooks/useCheckboxes'

type Props = {
  options: ExplorerCountryOptions
  toggleOption: (key: keyof ExplorerCountryOptions) => void
  uiAxisSelection: AxisSelection
}

const CountryOptions: React.FC<Props> = (props: Props) => {
  const { options, toggleOption, uiAxisSelection } = props
  const { t } = useTranslation()

  const enabled = useCountryOptionsEnabled({ axisSelection: uiAxisSelection })

  const checkboxes = useCheckboxes()

  return (
    <>
      <h2 className="options-title">{t('common.countriesAreas')}</h2>
      <Flex alignItems="start" className="country-options" gap="8">
        {checkboxes.map(({ key, label }) => (
          <ButtonCheckbox
            key={key}
            checked={options[key]}
            disabled={!enabled}
            label={label}
            onClick={() => toggleOption(key)}
            variant={ButtonCheckboxVariant.checkbox}
          />
        ))}
      </Flex>
      {!enabled && (
        <Flex alignItems="center" className="country-options__notice" gap="4">
          <Icon className="icon-middle" name="alert" />
          <span>{t('common.explorerCountryOptionsDisabled')}</span>
        </Flex>
      )}
    </>
  )
}

export default CountryOptions
