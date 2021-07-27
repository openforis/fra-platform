import React from 'react'

import { FRA, PanEuropean } from '@core/assessment'

import AssessmentComponent from '@webapp/components/AssessmentComponent'

import LinksFRA from './LinksFRA'

const LinksPlaceholder = () => <div />

const Components: { [key: any]: React.Component } = {
  [FRA.type]: LinksFRA,
  [PanEuropean.type]: LinksPlaceholder,
  // @ts-ignore
  'null': LinksPlaceholder,
}

const UserLinks = () => <AssessmentComponent components={Components} />

export default UserLinks
