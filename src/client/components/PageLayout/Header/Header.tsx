import './Header.scss'
import React from 'react'

import { AssessmentName, AssessmentNames } from 'meta/assessment'

import AssessmentSwitch from 'client/components/AssessmentSwitch'

import FraHeader from './FraHeader'
import PanEuropeanHeader from './PanEuropeanHeader'

const Components: { [key: AssessmentName]: React.FC } = {
  [AssessmentNames.fra]: FraHeader,
  [AssessmentNames.panEuropean]: PanEuropeanHeader,
  null: () => <div />,
}

const Header: React.FC = () => <AssessmentSwitch components={Components} />

export default Header
