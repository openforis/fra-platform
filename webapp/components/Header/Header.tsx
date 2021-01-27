import './header.less'
import React from 'react'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as PanEuropean from '@common/assessment/panEuropean'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as Fra from '@common/assessment/fra'
import AssessmentComponent from '@webapp/components/AssessmentComponent'

import PanEuropeanHeader from './PanEuropeanHeader'
import FraHeader from './FraHeader'

const Components = {
  [Fra.type]: FraHeader,
  [PanEuropean.type]: PanEuropeanHeader,
  null: () => <div />,
}

const Header = () => <AssessmentComponent components={Components} />

export default Header
