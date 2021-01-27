import React from 'react'

import FRA from '@common/assessment/fra'
import PanEuropean from '@common/assessment/panEuropean'

import AssessmentComponent from '@webapp/components/AssessmentComponent'

import LinksFRA from './LinksFRA'

const LinksPlaceholder = () => <div />

const Components: { [key: string]: React.Component } = {
  [FRA.type]: LinksFRA,
  [PanEuropean.type]: LinksPlaceholder,
  // @ts-ignore
  null: LinksPlaceholder,
}

const UserLinks = () => <AssessmentComponent components={Components} />

export default UserLinks
