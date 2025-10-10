import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Global } from 'meta/area'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAppDispatch } from 'client/store/hooks'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { UserActions } from 'client/store/user/actions'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryIso } from 'client/hooks'
import { useToaster } from 'client/hooks/useToaster'
import { PopoverItem } from 'client/components/PopoverControl'

export const useUserLinks = (): Array<PopoverItem> => {
  const { t } = useTranslation()
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const dispatch = useAppDispatch()
  const user = useUser()
  const toaster = useToaster()
  const navigate = useNavigate()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const userCountryIso = countryIso ?? UserRoles.getLastRole({ assessment, user })?.countryIso ?? Global.WO

  if (!user) return []

  const userProfileProps = { assessmentName, cycleName, countryIso: userCountryIso, id: String(user.id) }
  const items: Array<PopoverItem> = [
    {
      content: t<string>('header.editProfile'),
      link: Routes.CountryUser.generatePath(userProfileProps),
    },
  ]

  if (Users.isAdministrator(user)) {
    items.push({
      content: t<string>('admin.admin'),
      link: Routes.Admin.generatePath({ assessmentName, cycleName }),
    })
  }

  items.push(
    {
      divider: true,
    },
    {
      content: t<string>('header.logout'),
      onClick: async () => {
        await dispatch(UserActions.logout()).unwrap()
        toaster.toaster.info(t('login.logoutSuccessful'))
        const path = Routes.Assessment.generatePath({ assessmentName })
        navigate(path)
      },
    }
  )

  return items
}
