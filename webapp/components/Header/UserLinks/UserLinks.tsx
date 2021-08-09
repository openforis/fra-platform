import React from 'react'

import { FRA, PanEuropean } from '@core/assessment'

import AssessmentSwitch from '@webapp/components/Assessment/AssessmentSwitch'

import LinksFRA from './LinksFRA'

const LinksPlaceholder = () => <div />

const Components: { [key: any]: React.Component } = {
  [FRA.type]: LinksFRA,
  [PanEuropean.type]: LinksPlaceholder,
  // @ts-ignore
  'null': LinksPlaceholder,
}

const UserLinks = () => <AssessmentSwitch components={Components} />

export default UserLinks
