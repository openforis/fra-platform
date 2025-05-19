import { Props, Returned } from './types'
import { useOnChange } from './useOnChange'
import { useOnChangeNodeValue } from './useOnChangeNodeValue'
import { useOnPaste } from './useOnPaste'

export default (props: Props): Returned => {
  const onChange = useOnChange(props)
  const onChangeNodeValue = useOnChangeNodeValue(props)
  const onPaste = useOnPaste(props)

  return { onChange, onChangeNodeValue, onPaste }
}
