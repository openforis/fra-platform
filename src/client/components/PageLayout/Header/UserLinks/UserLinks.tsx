import React from 'react'

import { AssessmentNames } from 'meta/assessment'

import AssessmentSwitch from 'client/components/AssessmentSwitch'

import LinksFRA from './LinksFRA'

const LinksPlaceholder = () => <div />

const Components: Record<string, React.FC> = {
  [AssessmentNames.fra]: LinksFRA,
  [AssessmentNames.panEuropean]: LinksFRA,
  null: LinksPlaceholder,
}

const UserLinks: React.FC = () => <AssessmentSwitch components={Components} />

export default UserLinks
