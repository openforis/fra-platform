import './AreaSelect.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { AreaCode } from 'meta/area/areaCode'
import { TrackId } from 'meta/tracking/id'
import { Users } from 'meta/user/users'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useIsAreaSelectorExpanded } from 'client/store/ui/areaSelector/hooks/areaSelector'
import { useUser } from 'client/store/user/hooks/user'
import { useNavigateToArea } from 'client/hooks/navigateToArea'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Select from 'client/components/Inputs/Select'
import { Tracking } from 'client/utils/tracking'

import { useComponents } from './hooks/useComponents'
import { useIsSortable } from './hooks/useIsSortable'
import { useOptionGroups } from './hooks/useOptionGroups'

const AreaSelect: React.FC = () => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const components = useComponents()
  const groups = useOptionGroups()
  const navigateToArea = useNavigateToArea()
  const user = useUser()
  const cycle = useCycle()
  const expanded = useIsAreaSelectorExpanded()
  const withRoles = user && Users.hasRoleInCycle({ cycle, user })
  const sortable = useIsSortable()

  const handleChange = (areaCode: AreaCode): void => {
    Tracking.select({ elementId: TrackId.toolbarSelectArea, value: areaCode })
    navigateToArea(areaCode)
  }

  return (
    <Select
      classNames={{ container: classNames('area-select__container', { withRoles, expanded, sortable }) }}
      components={components}
      isClearable={false}
      onChange={handleChange}
      options={groups}
      placeholder={`- ${t('common.selectArea')} -`}
      value={countryIso}
    />
  )
}

export default AreaSelect
