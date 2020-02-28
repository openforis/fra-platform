import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { assessments } from '@common/assessmentSectionItems'

import NavAssessmentHeader from '@webapp/loggedin/navigation/components/navAssessment/navAssessmentHeader'
import NavAssessmentSection from '@webapp/loggedin/navigation/components/navAssessment/navAssessmentSection'

import * as AssessmentState from '@webapp/country/assessmentState'

const NavAssessment = (props) => {
  const { name } = props

  const assessment = useSelector(AssessmentState.getAssessment(name))
  const sections = assessments[name]

  return (
    <div className="nav__assessment">

      <NavAssessmentHeader {...props} assessment={assessment}/>

      {
        sections.map(
          (item, i) => (
            <NavAssessmentSection
              key={i}
              item={item}
              assessment={assessment}
              {...props}
            />
          )
        )
      }
    </div>
  )
}

NavAssessment.propTypes = {
  name: PropTypes.string.isRequired
}

export default NavAssessment





