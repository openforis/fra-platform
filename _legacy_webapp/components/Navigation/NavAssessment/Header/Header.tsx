import './Header.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import { Assessment, AssessmentType } from '@core/assessment'
import { Areas } from '@core/country'
import * as BasePaths from '../../../../main/basePaths'

import { useCountryIso } from '../../../../store/app'
import { Breakpoints } from '../../../../utils/breakpoints'

import Icon from '../../../../components/icon'
import { useUserInfo } from '../../../../store/user'
import Title from './Title'
import Status from './Status'
import ButtonToggleAll from './ButtonToggleAll'

type Props = {
  assessment: Assessment
  showSections: boolean
  setShowSections: (showSections: boolean) => void
}

const Header: React.FC<Props> = (props) => {
  const { assessment, showSections, setShowSections } = props

  const countryIso = useCountryIso()
  const userInfo = useUserInfo()

  const isCountry = Areas.isISOCountry(countryIso)
  const assessmentType = assessment.type
  const isFRA = assessmentType === AssessmentType.fra2020

  return (
    <div className="nav-assessment-header">
      <div className="nav-assessment-header__label">
        <Title assessment={assessment} lockEnabled={Boolean(userInfo && isFRA && isCountry)} />

        {isFRA && isCountry && (
          <MediaQuery minWidth={Breakpoints.laptop}>
            <div className="links-download">
              <Link
                className="btn-s btn-secondary"
                to={BasePaths.getAssessmentPrintLink(countryIso, assessmentType, true)}
                target="_blank"
              >
                <Icon name="small-print" className="icon-margin-left" />
                <Icon name="icon-table2" className="icon-no-margin" />
              </Link>

              <Link
                className="btn-s btn-secondary"
                to={BasePaths.getAssessmentPrintLink(countryIso, assessmentType)}
                target="_blank"
              >
                <Icon name="small-print" className="icon-no-margin" />
              </Link>
            </div>
          </MediaQuery>
        )}
      </div>

      <div className="nav-assessment-header__status-container">
        {userInfo && isFRA && isCountry ? <Status assessment={assessment} /> : <div />}
        <ButtonToggleAll showSections={showSections} setShowSections={setShowSections} />
      </div>
    </div>
  )
}

export default Header
