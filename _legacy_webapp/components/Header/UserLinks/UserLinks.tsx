import React from 'react'

import { FRA, PanEuropean } from '@core/assessment'

import AssessmentSwitch from '../../../components/Assessment/AssessmentSwitch'

import LinksFRA from './LinksFRA'

const LinksPlaceholder = () => <div />

const Components: Record<string, React.FC> = {
  [FRA.type]: LinksFRA,
  [PanEuropean.type]: LinksPlaceholder,
  null: LinksPlaceholder,
}

const UserLinks: React.FC = () => <AssessmentSwitch components={Components} />

export default UserLinks
