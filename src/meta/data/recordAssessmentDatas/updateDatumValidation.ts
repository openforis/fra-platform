import { NodeValue } from '@meta/assessment'

import { RecordAssessmentData } from '../RecordAssessmentData'
import { getNodeValue } from './getNodeValue'
import { Props } from './props'
import { updateDatum } from './updateDatum'

export const updateDatumValidation = (props: Props & Pick<NodeValue, 'validation'>): RecordAssessmentData => {
  const { validation } = props
  const value = getNodeValue(props)
  return updateDatum({ ...props, value: { ...value, validation } })
}
