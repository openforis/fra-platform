import { getNodeValue } from 'meta/data/recordAssessmentDatas/getNodeValue'
import { Props } from 'meta/data/recordAssessmentDatas/props'

export const getDatum = (props: Props): string | undefined => {
  return getNodeValue(props)?.raw
}
