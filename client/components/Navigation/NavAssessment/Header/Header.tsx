import './Header.scss'
import React from 'react'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'

import { Areas } from '@meta/area'
import { AssessmentNames } from '@meta/assessment'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { ClientRoutes } from '@client/clientRoutes'
import Icon from '@client/components/Icon'
import { Breakpoints } from '@client/utils'

import ButtonToggleAll from './ButtonToggleAll'
import Status from './Status'
import Title from './Title'

type Props = {
  showSections: boolean
  setShowSections: (showSections: boolean) => void
}

const Header: React.FC<Props> = (props) => {
  const { showSections, setShowSections } = props
  const assessment = useAssessment()
  const cycle = useCycle()

  const countryIso = useCountryIso()
  const user = useUser()

  const isCountry = Areas.isISOCountry(countryIso)
  const assessmentName = assessment.props.name
  const isFRA = assessmentName === AssessmentNames.fra
  const cycleName = cycle.name

  return (
    <div className="nav-assessment-header">
      <div className="nav-assessment-header__label">
        <Title lockEnabled={Boolean(user && isFRA && isCountry)} />

        {isFRA && isCountry && (
          <MediaQuery minWidth={Breakpoints.laptop}>
            <div className="links-download">
              <Link
                className="btn-s btn-secondary"
                to={ClientRoutes.Assessment.PrintTables.getLink({ countryIso, assessmentName, cycleName })}
                target="_blank"
              >
                <Icon name="small-print" className="icon-margin-left" />
                <Icon name="icon-table2" className="icon-no-margin" />
              </Link>

              <Link
                className="btn-s btn-secondary"
                to={ClientRoutes.Assessment.Print.getLink({ countryIso, assessmentName, cycleName })}
                target="_blank"
              >
                <Icon name="small-print" className="icon-no-margin" />
              </Link>
            </div>
          </MediaQuery>
        )}
      </div>

      <div className="nav-assessment-header__status-container">
        {user && isFRA && isCountry ? <Status /> : <div />}
        <ButtonToggleAll showSections={showSections} setShowSections={setShowSections} />
      </div>
    </div>
  )
}

export default Header
