import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Props = {
  targetUser: User
}

export const useOnClick = (props: Props): (() => Promise<void>) => {
  const { targetUser } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const cycle = useCycle()
  const { name: cycleName } = cycle
  const { assessmentName, countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback(async () => {
    const name = Users.getFullName(targetUser)
    const country = t(Areas.getTranslationKey(countryIso))
    const cycleLabel = t('common.cycleLabel', { assessmentName, cycleName })
    const countryRole = Users.getRole(targetUser, countryIso, cycle)
    const role = t(Users.getI18nRoleLabelKey(countryRole.role))
    // eslint-disable-next-line no-alert
    if (!window.confirm(t('editUser.disassociateRoleConfirm', { name, country, role, cycleLabel }))) return
    const params = { assessmentName, cycleName, countryIso, userUuid: targetUser.uuid }
    await axios.delete(ApiEndPoint.User.role(), { params })
    navigate(-1)
  }, [assessmentName, countryIso, cycle, cycleName, navigate, t, targetUser])
}
