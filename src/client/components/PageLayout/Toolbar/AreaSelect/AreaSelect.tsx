import './AreaSelect.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { Users } from 'meta/user/users'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useIsAreaSelectorExpanded } from 'client/store/ui/areaSelector/hooks/areaSelector'
import { useUser } from 'client/store/user/hooks/user'
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
  const user = useUser()
  const cycle = useCycle()
  const expanded = useIsAreaSelectorExpanded()
  const withRoles = user && Users.hasRoleInCycle({ cycle, user })

  return (
    <Select
      classNames={{ container: classNames('area-select__container', { withRoles, expanded }) }}
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
