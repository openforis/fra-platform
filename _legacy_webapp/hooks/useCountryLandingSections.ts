import React from 'react'

import { isReviewer } from '@common/countryRole'
import { isAllowedToChangeRole } from '@common/userManagementAccessControl'

import { useCountryIso } from '../store/app'
import MessageBoard from '../app/countryLanding/views/messageBoard'
import RecentActivityView from '../app/countryLanding/views/recentActivityView'
import LinksView from '../app/countryLanding/views/linksView'
import ManageCollaboratorsView from '../app/countryLanding/views/manageCollaboratorsView'
import ContentCheck from '../app/countryLanding/views/contentCheck'
import StatisticalFactsheets from '../pages/StatisticalFactsheets'
import { useUserInfo } from '../store/user'

type Section = {
  name: string
  component: React.FC
}

const getSections = (countryIso: any, userInfo: any): Array<Section> => {
  const sections: Array<Section> = [
    { name: 'overview', component: StatisticalFactsheets },
    { name: 'messageBoard', component: MessageBoard },
    { name: 'recentActivity', component: RecentActivityView },
    { name: 'links', component: LinksView },
  ]

  const userManagementSection: any = { name: 'userManagement', component: ManageCollaboratorsView }
  const contentCheckSection: any = { name: 'contentCheck', component: ContentCheck }

  if (isAllowedToChangeRole(countryIso, userInfo)) {
    sections.splice(2, 0, userManagementSection)
  }

  if (isReviewer(countryIso, userInfo)) {
    sections.splice(2, 0, contentCheckSection)
  }
  return sections
}

export default (): Array<Section> => {
  const userInfo = useUserInfo()
  const countryIso = useCountryIso()

  if (userInfo) {
    return getSections(countryIso, userInfo)
  }
  return []
}
