import './GroupHeading.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { GroupHeadingProps } from 'react-select'
import classNames from 'classnames'

import { UserRoles } from 'meta/user/roles'
import { Users } from 'meta/user/users'

import { useIsAreaSelectorExpanded } from 'client/store/ui/areaSelector/hooks/areaSelector'
import { Option } from 'client/components/Inputs/Select'
import { OptionsGroupArea } from 'client/components/PageLayout/Toolbar/AreaSelect/types'

type Props = GroupHeadingProps<Option, boolean, OptionsGroupArea>

const GroupHeading: React.FC<Props> = (props) => {
  const { data } = props

  const { t } = useTranslation()
  const expanded = useIsAreaSelectorExpanded()

  return (
    <>
      {data.order !== 0 && <hr />}

      {'roleName' in data && data.roleName !== UserRoles.noRole.role && (
        <div className={classNames('area-select__group-heading', 'area-select__country-row', 'withRole')}>
          <div>{t(Users.getI18nRoleLabelKey(data.roleName))}</div>
          <div>{t('common.status')}</div>
          {!expanded && <div>{t('common.updated')}</div>}
        </div>
      )}
    </>
  )
}
export default GroupHeading
