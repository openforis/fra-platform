import { getNodeValue } from 'meta/data/recordDatas/getNodeValue'
import { Props } from 'meta/data/recordDatas/props'

export const getDatum = (props: Props): string | undefined => {
  return getNodeValue(props)?.raw
}
