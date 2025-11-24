import { initMeasurement } from './initMeasurement'
import { initPublic } from './initPublic'

export const initSchemas = async (): Promise<void> => {
  await initPublic()
  await initMeasurement()
}
