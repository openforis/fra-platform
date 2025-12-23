import './Group.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { components, GroupProps } from 'react-select'
import classNames from 'classnames'

import { UserRoles } from 'meta/user/roles'
import { Users } from 'meta/user/users'

import { useAppDispatch } from 'client/store/hooks'
import { AreaSelectorActions } from 'client/store/ui/areaSelector/actions'
import { useIsAreaSelectorExpanded } from 'client/store/ui/areaSelector/hooks/areaSelector'
import { useUser } from 'client/store/user/hooks/user'
import Button from 'client/components/Buttons/Button'
import { Option } from 'client/components/Inputs/Select'
import CountryListDownload from 'client/components/PageLayout/Toolbar/AreaSelect/Group/CountryListDownload'
import { OptionsGroupArea } from 'client/components/PageLayout/Toolbar/AreaSelect/types'

type Props = GroupProps<Option, boolean, OptionsGroupArea>

const Group: React.FC<Props> = (props) => {
  const { data } = props

  const { t } = useTranslation()
  const user = useUser()
  const dispatch = useAppDispatch()
  const expanded = useIsAreaSelectorExpanded()

  const isAdmin = Users.isAdministrator(user)

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

          {expanded && (
            <>
              <div>{t('audit.edited')}</div>
              <div>{t('common.submittedToReview')}</div>
              <div>{t('common.submittedForApproval')}</div>
              <div>{t('common.accepted')}</div>
            </>
          )}
          {!expanded && <div>{t('common.updated')}</div>}

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
