import { isReviewer } from '@common/countryRole'
import { isAllowedToChangeRole } from '@common/userManagementAccessControl'

import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import OverviewView from '@webapp/landing/views/overviewView'
import RecentActivityView from '@webapp/landing/views/recentActivityView'
import AboutView from '@webapp/landing/views/aboutView'
import LinksView from '@webapp/landing/views/linksView'
import ManageCollaboratorsView from '@webapp/landing/views/manageCollaboratorsView'
import ContentCheckView from '@webapp/landing/views/contentCheck/contentCheckView'

const getSections = (countryIso, userInfo) => {
  const sections = [
    { name: 'overview', component: OverviewView },
    { name: 'recentActivity', component: RecentActivityView },
    { name: 'about', component: AboutView },
    { name: 'links', component: LinksView }
  ]

  const userManagementSection = { name: 'userManagement', component: ManageCollaboratorsView }
  const contentCheckSection = { name: 'contentCheck', component: ContentCheckView }

  if (isAllowedToChangeRole(countryIso, userInfo)) {
    sections.splice(1, 0, userManagementSection)
  }

  if (isReviewer(countryIso, userInfo)) {
    sections.splice(1, 0, contentCheckSection)
  }
  return sections
}

export default () => {

  const userInfo = useUserInfo()
  const countryIso = useCountryIso()

  if (userInfo) {
    return getSections(countryIso, userInfo)
  } else {
    return []
  }

}
