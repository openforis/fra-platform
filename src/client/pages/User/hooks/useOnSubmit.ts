import { useCallback } from 'react'
import { SubmitHandler } from 'react-hook-form'

import { UserEditForm } from 'meta/form/userEdit'

import { useToaster } from 'client/hooks/useToaster'

type Returned = SubmitHandler<UserEditForm>

export const useOnSubmit = (): Returned => {
  // const dispatch = useAppDispatch()
  // const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  // const navigate = useNavigate()
  // const { t } = useTranslation()
  const { toaster } = useToaster()

  return useCallback<Returned>(
    (user) => {
      // toaster.info(t('userManagement.userAdded', { email: userInvitation.email }))
      toaster.info(JSON.stringify(user, null, 2))
    },
    [toaster]
  )
}
