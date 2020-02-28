import './header.less'

import React from 'react'
import PropTypes from 'prop-types'

import * as CountryStatusAssessment from '@common/country/countryStatusAssessment'

import Icon from '@webapp/components/icon'
import { Link } from 'react-router-dom'
import Lock from '@webapp/loggedin/navigation/components/assessment/header/lock'
import Status from '@webapp/loggedin/navigation/components/assessment/header/status'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'

const Header = props => {

  const { assessment, showSections, setShowSections } = props
  const type = CountryStatusAssessment.getType(assessment)

  const countryIso = useCountryIso()
  const i18n = useI18n()

  return (
    <div className="nav-assessment-header">

      <div className="nav-assessment-header__label">

        <Lock assessment={assessment}/>

        <div>
          <Link
            className="btn-s btn-secondary"
            to={`/country/${countryIso}/print/${type}?onlyTables=true`}
            target="_blank">
            <Icon name="small-print" className="icon-margin-left"/>
            <Icon name="icon-table2" className="icon-no-margin"/>
          </Link>
          <Link
            className="btn-s btn-secondary"
            to={`/country/${countryIso}/print/${type}`}
            target="_blank">
            <Icon name="small-print" className="icon-no-margin"/>
          </Link>
        </div>

      </div>

      <Status assessment={assessment}/>

      <button
        className="btn-s nav-assessment-header__btn-toggle-sections"
        onClick={() => setShowSections(!showSections)}>
        {
          i18n.t(`navigation.${showSections ? 'hideAll' : 'showAll'}`)
        }
      </button>
    </div>
  )
}

Header.propTypes = {
  assessment: PropTypes.object.isRequired,
  showSections: PropTypes.bool.isRequired,
  setShowSections: PropTypes.func.isRequired,
}

export default Header
