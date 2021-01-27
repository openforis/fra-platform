// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { isReviewer } from '@common/countryRole'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { isAllowedToChangeRole } from '@common/userManagementAccessControl'

import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import MessageBoard from '@webapp/app/countryLanding/views/messageBoard'
import RecentActivityView from '@webapp/app/countryLanding/views/recentActivityView'
import LinksView from '@webapp/app/countryLanding/views/linksView'
import ManageCollaboratorsView from '@webapp/app/countryLanding/views/manageCollaboratorsView'
import ContentCheck from '@webapp/app/countryLanding/views/contentCheck'
import StatisticalFactsheets from '@webapp/app/countryLanding/views/statisticalFactsheets'

const getSections = (countryIso: any, userInfo: any) => {
  const sections = [
    { name: 'overview', component: StatisticalFactsheets },
    { name: 'messageBoard', component: MessageBoard },
    { name: 'recentActivity', component: RecentActivityView },
    { name: 'links', component: LinksView },
  ]

  const userManagementSection = { name: 'userManagement', component: ManageCollaboratorsView }
  const contentCheckSection = { name: 'contentCheck', component: ContentCheck }

  if (isAllowedToChangeRole(countryIso, userInfo)) {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ name: string; component: Conne... Remove this comment to see the full error message
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
