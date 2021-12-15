import './header.scss'
import React from 'react'

import AssessmentSwitch from '@client/components/AssessmentSwitch'

import { AssessmentName } from '@meta/assessment'
import PanEuropeanHeader from './PanEuropeanHeader'
import FraHeader from './FraHeader'

const Components: any = {
  [AssessmentName.fra]: FraHeader,
  [AssessmentName.panEuropean]: PanEuropeanHeader,
  null: () => <div />,
}

const Header: React.FC = () => <AssessmentSwitch components={Components} />

export default Header
