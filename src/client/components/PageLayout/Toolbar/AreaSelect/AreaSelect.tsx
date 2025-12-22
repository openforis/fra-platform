import './AreaSelect.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import Select from 'client/components/Inputs/Select'

import { useComponents } from './hooks/useComponents'
import { useOnChange } from './hooks/useOnChange'
import { useOptionGroups } from './hooks/useOptionGroups'

const AreaSelect: React.FC = () => {
  const { t } = useTranslation()

  const { countryIso } = useCountryRouteParams()
  const components = useComponents()
  const groups = useOptionGroups()
  const onChange = useOnChange()

  return (
    <Select
      classNames={{ container: 'area-select__container' }}
      components={components}
      isClearable={false}
      onChange={onChange}
      options={groups}
      placeholder={`- ${t('common.selectArea')} -`}
      value={countryIso}
    />
  )
}

export default AreaSelect
