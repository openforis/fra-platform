import './GroupHeading.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { GroupHeadingProps } from 'react-select'

import { UserRoles } from 'meta/user/roles'
import { Users } from 'meta/user/users'

import { Option } from 'client/components/Inputs/Select'
import { OptionsGroupArea } from 'client/components/PageLayout/Toolbar/AreaSelect/types'

type Props = GroupHeadingProps<Option, boolean, OptionsGroupArea>

const GroupHeading: React.FC<Props> = (props) => {
  const { data } = props

  const { t } = useTranslation()

  return (
    <>
      {data.order !== 0 && <hr />}

      {'roleName' in data && data.roleName !== UserRoles.noRole.role && (
        <div className="area-select__group-heading">{t(Users.getI18nRoleLabelKey(data.roleName))}</div>
      )}
    </>
  )
}
export default GroupHeading
