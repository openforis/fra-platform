import { Objects } from '@core/utils'
import { useAppSelector } from '@webapp/store'

export default () => useAppSelector((state) => [Objects.isEmpty(state.app.printView), state.app.printView?.onlyTables])
