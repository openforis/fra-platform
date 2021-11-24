import './header.scss'
import React from 'react'

import { FRA, PanEuropean } from '@core/assessment'
import AssessmentSwitch from '../../components/Assessment/AssessmentSwitch'

import PanEuropeanHeader from './PanEuropeanHeader'
import FraHeader from './FraHeader'

const Components: any = {
  [FRA.type]: FraHeader,
  [PanEuropean.type]: PanEuropeanHeader,
  null: () => <div />,
}

const Header: React.FC = () => <AssessmentSwitch components={Components} />

export default Header
