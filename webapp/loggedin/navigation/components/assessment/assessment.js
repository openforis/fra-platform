import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { assessments } from '@common/assessmentSectionItems'

import AssessmentHeader from '@webapp/loggedin/navigation/components/assessment/assessmentHeader'
import AssessmentSection from '@webapp/loggedin/navigation/components/assessment/assessmentSection'

import * as AssessmentState from '@webapp/country/assessmentState'

const Assessment = (props) => {
  const { name } = props

  const assessment = useSelector(AssessmentState.getAssessment(name))
  const sections = assessments[name]

  return <div className="nav__assessment">

    <AssessmentHeader {...props} assessment={assessment}/>

    {
      sections.map(
        (item, i) => (
          <AssessmentSection
            key={i}
            item={item}
            assessment={assessment}
            {...props}
          />
        )
      )
    }
  </div>
}

Assessment.propTypes = {
  name: PropTypes.string.isRequired
}

export default Assessment





