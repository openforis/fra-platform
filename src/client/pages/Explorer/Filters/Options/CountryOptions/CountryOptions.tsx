import './CountryOptions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ExplorerCountryOptions } from 'meta/explorer/selection'

import ButtonCheckbox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import Hr from 'client/components/Hr'
import Flex from 'client/components/Layout/Flex'
import { useCountryOptionsAvailability } from 'client/pages/Explorer/hooks/useCountryOptionsAvailability'

import { useCheckboxes } from './hooks/useCheckboxes'

type Props = {
  options: ExplorerCountryOptions
  toggleOption: (key: keyof ExplorerCountryOptions) => void
}

const CountryOptions: React.FC<Props> = (props: Props) => {
  const { options, toggleOption } = props
  const { t } = useTranslation()

  const { enabled } = useCountryOptionsAvailability()

  const checkboxes = useCheckboxes()

  return (
    <>
      <h2 className="options-title">{t('common.countryAreaDetails')}</h2>
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
      {!enabled && <div className="country-options__notice">{t('common.explorerCountryOptionsDisabled')}</div>}
      <Hr className="options-hr" />
    </>
  )
}

export default CountryOptions
