import { useAppSelector } from '../../../store'
import { Objects } from '@core/utils'

export default () => useAppSelector((state) => !Objects.isEmpty(state.country.status))
