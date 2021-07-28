import './header.scss'
import React from 'react'

import { FRA, PanEuropean } from '@core/assessment'
import AssessmentComponent from '@webapp/components/AssessmentComponent'

import PanEuropeanHeader from './PanEuropeanHeader'
import FraHeader from './FraHeader'

const Components: any = {
  [FRA.type]: FraHeader,
  [PanEuropean.type]: PanEuropeanHeader,
  null: () => <div />,
}

const Header: React.FC = () => <AssessmentComponent components={Components} />

export default Header
