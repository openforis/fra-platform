import './Header.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import { Breakpoints } from '@client/utils'

import Icon from '@client/components/Icon'
import { useAssessment } from '@client/store/assessment'
import { AssessmentName } from '@meta/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { Areas } from '@meta/area'
import { BasePaths } from '@client/basePaths'
import Title from './Title'
// import Status from './Status'
import ButtonToggleAll from './ButtonToggleAll'

type Props = {
  showSections: boolean
  setShowSections: (showSections: boolean) => void
}

const Header: React.FC<Props> = (props) => {
  const { showSections, setShowSections } = props
  const assessment = useAssessment()

  const countryIso = useCountryIso()
  const user = useUser()

  const isCountry = Areas.isISOCountry(countryIso)
  const assessmentType = assessment.props.name
  const isFRA = assessmentType === AssessmentName.fra

  return (
    <div className="nav-assessment-header">
      <div className="nav-assessment-header__label">
        <Title lockEnabled={Boolean(user && isFRA && isCountry)} />

        {isFRA && isCountry && (
          <MediaQuery minWidth={Breakpoints.laptop}>
            <div className="links-download">
              <Link
                className="btn-s btn-secondary"
                to={BasePaths.Assessment.print(countryIso, assessmentType, true)}
                target="_blank"
              >
                <Icon name="small-print" className="icon-margin-left" />
                <Icon name="icon-table2" className="icon-no-margin" />
              </Link>

              <Link
                className="btn-s btn-secondary"
                to={BasePaths.Assessment.print(countryIso, assessmentType)}
                target="_blank"
              >
                <Icon name="small-print" className="icon-no-margin" />
              </Link>
            </div>
          </MediaQuery>
        )}
      </div>

      <div className="nav-assessment-header__status-container">
        {/* {user && isFRA && isCountry ? <Status /> : <div />} */}
        <ButtonToggleAll showSections={showSections} setShowSections={setShowSections} />
      </div>
    </div>
  )
}

export default Header
