import React from 'react'

import * as Fra from '@common/assessment/fra'
import * as PanEuropean from '@common/assessment/panEuropean'

import AssessmentComponent from '@webapp/components/AssessmentComponent'

import LinksFRA from './LinksFRA'

const LinksPlaceholder = () => <div />

const Components = {
  [Fra.type]: LinksFRA,
  [PanEuropean.type]: LinksPlaceholder,
  null: LinksPlaceholder,
}

const UserLinks = () => <AssessmentComponent components={Components} />

export default UserLinks
