import { TableValidationTestCase } from '../../types'
import { diseases } from './diseases'
import { insects } from './insects'
import { other } from './other'
import { severeWeatherEvents } from './severe_weather_events'

export const disturbances: Array<TableValidationTestCase> = [...diseases, ...insects, ...other, ...severeWeatherEvents]
