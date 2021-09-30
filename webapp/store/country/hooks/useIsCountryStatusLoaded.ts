import { useAppSelector } from '@webapp/store'
import { Objects } from '@core/utils'

export default () => useAppSelector((state) => !Objects.isEmpty(state.country.status))
