import * as PropTypes from 'prop-types'
import useI18n from '@webapp/components/hooks/useI18n'

const Placeholder = (props: any) => {
  const { col } = props
  const { label, labelKey, labelParams } = col
  const i18n = useI18n()
  let labelCell = ''
  if (label) labelCell = label
  if (labelKey) labelCell = (i18n as any).t(labelKey, labelParams)
  return labelCell
}
Placeholder.propTypes = {
  col: PropTypes.object.isRequired,
}
export default Placeholder
