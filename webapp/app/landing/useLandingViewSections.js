import { isReviewer } from '@common/countryRole'
import { isAllowedToChangeRole } from '@common/userManagementAccessControl'

import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import MessageBoard from '@webapp/app/landing/views/messageBoard'
import RecentActivityView from '@webapp/app/landing/views/recentActivityView'
import AboutView from '@webapp/app/landing/views/aboutView'
import LinksView from '@webapp/app/landing/views/linksView'
import ManageCollaboratorsView from '@webapp/app/landing/views/manageCollaboratorsView'
import ContentCheckView from '@webapp/app/landing/views/contentCheck/contentCheckView'
import StatisticalFactsheets from '@webapp/app/landing/views/statisticalFactsheets'

const getSections = (countryIso, userInfo) => {
  const sections = [
    { name: 'overview', component: StatisticalFactsheets },
    { name: 'messageBoard', component: MessageBoard },
    { name: 'recentActivity', component: RecentActivityView },
    { name: 'about', component: AboutView },
    { name: 'links', component: LinksView },
  ]

  const userManagementSection = { name: 'userManagement', component: ManageCollaboratorsView }
  const contentCheckSection = { name: 'contentCheck', component: ContentCheckView }

  if (isAllowedToChangeRole(countryIso, userInfo)) {
    sections.splice(2, 0, userManagementSection)
  }

  if (isReviewer(countryIso, userInfo)) {
    sections.splice(2, 0, contentCheckSection)
  }
  return sections
}

export default () => {
  const userInfo = useUserInfo()
  const countryIso = useCountryIso()

  if (userInfo) {
    return getSections(countryIso, userInfo)
  }
  return []
}
