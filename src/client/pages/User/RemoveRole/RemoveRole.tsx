import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { Authorizer } from 'meta/auth/authorizer'
import { User } from 'meta/user/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import Flex from 'client/components/Layout/Flex'

import { useOnClick } from './hooks/useOnClick'

type Props = {
  targetUser: User
}

const RemoveRole: React.FC<Props> = (props) => {
  const { targetUser } = props
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  const cycle = useCycle()
  const user = useUser()
  const onClick = useOnClick({ targetUser })

  if (!Areas.isISOCountry(countryIso)) return null
  if (user?.id === targetUser.id) return null
  if (!Authorizer.canDisableUser({ countryIso, cycle, target: targetUser, user })) return null

  return (
    <Flex className="remove-role" justifyContent="end">
      <Button
        iconName={'remove'}
        inverse
        label={t('editUser.removeRole')}
        onClick={onClick}
        size={ButtonSize.l}
        type={ButtonType.danger}
      />
    </Flex>
  )
}

export default RemoveRole
