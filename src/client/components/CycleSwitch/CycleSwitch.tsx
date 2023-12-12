import React from 'react'
import { useParams } from 'react-router-dom'

import { AssessmentName, CycleName } from 'meta/assessment'

type Props = {
  components: Record<AssessmentName, Record<CycleName, React.FC>>
}

const CycleSwitch: React.FC<Props> = (props) => {
  const { assessmentName, cycleName } = useParams()

  const { components } = props

  const Component = components[assessmentName]?.[cycleName]

  if (Component) {
    return <Component />
  }

  return null
}

export default CycleSwitch
