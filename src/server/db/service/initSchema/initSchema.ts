import { initMeasurement } from './initMeasurement'
import { initPublic } from './initPublic'

export const initSchema = async (): Promise<void> => {
  await initPublic()
  await initMeasurement()
}
