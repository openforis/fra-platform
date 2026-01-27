import './Group.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { components, GroupProps } from 'react-select'
import classNames from 'classnames'

import { UserRoles } from 'meta/user/roles'
import { Users } from 'meta/user/users'

import { useAppDispatch } from 'client/store/hooks'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { AreaSelectorActions } from 'client/store/ui/areaSelector/actions'
import { useIsAreaSelectorExpanded } from 'client/store/ui/areaSelector/hooks/areaSelector'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Button from 'client/components/Buttons/Button'
import { Option } from 'client/components/Inputs/Select'
import CountryListDownload from 'client/components/PageLayout/Toolbar/AreaSelect/Group/CountryListDownload'
import { useHeaders } from 'client/components/PageLayout/Toolbar/AreaSelect/Group/hooks/useHeaders'
import SortableHeader from 'client/components/PageLayout/Toolbar/AreaSelect/Group/SortableHeader'
import { OptionsGroupArea } from 'client/components/PageLayout/Toolbar/AreaSelect/types'

type Props = GroupProps<Option, boolean, OptionsGroupArea>

const Group: React.FC<Props> = (props) => {
  const { data } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const user = useUser()
  const expanded = useIsAreaSelectorExpanded()
  const headers = useHeaders()

  const isAdmin = Users.isAdministrator(user)
  const isRegionalFocalPoint = Users.isRegionalFocalPoint(user, countryIso, cycle)
  const isReviewer = Users.isReviewer(user, countryIso, cycle)
  // only allow sorting when we have more than one country and user has specific role
  const sortable = data.options.length > 1 && (isAdmin || isRegionalFocalPoint || isReviewer)

  return (
    <>
      {data.order !== 0 && <hr className="area-select__group-hr" />}

      {isAdmin && data.order === 0 && <CountryListDownload />}

      {'roleName' in data && data.roleName !== UserRoles.noRole.role && (
        <div
          className={classNames('area-select__group-heading', 'area-select__country-row', 'withRole', {
            expanded,
            isAdmin,
          })}
        >
          <div>{t(Users.getI18nRoleLabelKey(data.roleName))}</div>
          <div>{t('common.status')}</div>

          {headers.map((header) =>
            sortable ? (
              <SortableHeader
                key={header.sortBy}
                label={header.label}
                roleName={data.roleName}
                sortByProperty={header.sortBy}
              />
            ) : (
              <div key={header.sortBy}>{header.label}</div>
            )
          )}

          {isAdmin && (
            <Button
              className="area-select__show-more"
              inverse
              label={expanded ? t('common.showLess') : t('common.showMore')}
              noBorder
              onClick={(): void => {
                dispatch(AreaSelectorActions.toggleMode())
              }}
            />
          )}
        </div>
      )}

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <components.Group {...props} />
    </>
  )
}
export default Group
