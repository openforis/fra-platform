import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { useCountryRouteParams } from 'client/hooks/routeParams'

type Props = {
  targetUser: User
}

export const useOnClick = (props: Props): (() => Promise<void>) => {
  const { targetUser } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useCallback(async () => {
    const name = Users.getFullName(targetUser)
    const country = t(Areas.getTranslationKey(countryIso))
    const cycleLabel = t('common.cycleLabel', { assessmentName, cycleName })
    // eslint-disable-next-line no-alert
    if (!window.confirm(t('editUser.disassociateRoleConfirm', { name, country, cycleLabel }))) return
    const params = { assessmentName, cycleName, countryIso, userUuid: targetUser.uuid }
    await axios.delete(ApiEndPoint.User.role(), { params })
    navigate(-1)
  }, [assessmentName, countryIso, cycleName, navigate, t, targetUser])
}
