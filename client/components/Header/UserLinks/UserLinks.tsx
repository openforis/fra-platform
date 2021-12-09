import React from 'react'

import AssessmentSwitch from '@client/components/AssessmentSwitch'
import { AssessmentName } from '@core/meta/assessment'

import LinksFRA from './LinksFRA'

const LinksPlaceholder = () => <div />

const Components: Record<string, React.FC> = {
  [AssessmentName.fra]: LinksFRA,
  [AssessmentName.panEuropean]: LinksPlaceholder,
  null: LinksPlaceholder,
}

const UserLinks: React.FC = () => <AssessmentSwitch components={Components} />

export default UserLinks
