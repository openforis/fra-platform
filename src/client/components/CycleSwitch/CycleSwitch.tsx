import React, { ReactNode } from 'react'
import { useParams } from 'react-router'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

type Props = {
  components: Record<AssessmentName, Record<CycleName, React.FC>>
  defaultComponent?: ReactNode
}

const CycleSwitch: React.FC<Props> = (props) => {
  const { assessmentName, cycleName } = useParams()

  const { components, defaultComponent } = props

  const Component = components[assessmentName]?.[cycleName]

  if (Component) {
    return <Component />
  }

  return defaultComponent ?? null
}

export default CycleSwitch
