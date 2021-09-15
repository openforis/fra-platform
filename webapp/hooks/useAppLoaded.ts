import { useAppSelector } from '@webapp/store'

export default (): boolean => useAppSelector((state) => state.app.loaded)
