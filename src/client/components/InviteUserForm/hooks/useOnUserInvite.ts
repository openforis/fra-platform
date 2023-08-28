import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { CountryIso } from 'meta/area'
import { Cycle } from 'meta/assessment'
import { RoleName, User } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useAssessment } from 'client/store/assessment'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useToaster } from 'client/hooks/useToaster'
import { useInitialState } from 'client/components/InviteUserForm/hooks/initialState'
import { UserToInvite } from 'client/components/InviteUserForm/userToInvite'

const validateName = (name: string) => !!name.trim()
const validateRole = (role: string) => !!role
const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const useOnUserInvite = (props: {
  userToInvite: UserToInvite
  countryIso: CountryIso
  setUserToInvite: (value: ((prevState: UserToInvite) => UserToInvite) | UserToInvite) => void
  setErrors: (
    value: ((prevState: Record<string, boolean>) => Record<string, boolean>) | Record<string, boolean>
  ) => void
  cycle: Cycle
  user: User
}) => {
  const { userToInvite, setUserToInvite, countryIso, setErrors, cycle } = props
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { toaster } = useToaster()
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const initialState = useInitialState()

  return useCallback(() => {
    const fieldErrors = {
      name: !validateName(userToInvite.name),
      role: !validateRole(userToInvite.role),
      email: !validateEmail(userToInvite.email),
    }
    setErrors(fieldErrors)

    if (!Object.values(fieldErrors).find((value) => !!value))
      dispatch(
        UserManagementActions.inviteUser({
          countryIso,
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          name: userToInvite.name,
          role: userToInvite.role as RoleName,
          email: userToInvite.email,
          lang: userToInvite.lang,
        })
      )
        .unwrap()
        .then(() => {
          setUserToInvite(initialState)
          toaster.info(t('userManagement.userAdded', { email: userToInvite.email }))
          navigate(-1)
        })
        .catch(() => {
          // Error handled by server
        })
  }, [
    assessment.props.name,
    countryIso,
    cycle.name,
    dispatch,
    initialState,
    navigate,
    setErrors,
    setUserToInvite,
    t,
    toaster,
    userToInvite.email,
    userToInvite.lang,
    userToInvite.name,
    userToInvite.role,
  ])
}
