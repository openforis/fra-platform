import './header.less'
import React from 'react'

import PanEuropean from '@common/assessment/panEuropean'
import FRA from '@common/assessment/fra'
import AssessmentComponent from '@webapp/components/AssessmentComponent'

import PanEuropeanHeader from './PanEuropeanHeader'
import FraHeader from './FraHeader'

const Components: any = {
  [FRA.type]: FraHeader,
  [PanEuropean.type]: PanEuropeanHeader,
  null: () => <div />,
}

const Header = () => <AssessmentComponent components={Components} />

export default Header
