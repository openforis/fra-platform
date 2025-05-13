import { CountryIso } from 'meta/area'
import { UUID } from 'meta/uuid'

export type ObservationValue<VALUE> = {
  calculated?: boolean
  estimationUuid?: string
  faoEstimate?: boolean
  imported?: boolean
  odpId?: number
  raw: VALUE
  taxonCode?: string
}

type BaseObservation<VALUE> = {
  countryIso: CountryIso
  dimensionUUID: UUID
  measureUUID: UUID
  uuid: UUID
  value: ObservationValue<VALUE>
}

export type QualitativeObservation = BaseObservation<string>
/**
 * Quantitative Observation is always collected in the base unit of the measure system (measure.systemUUID->system.baseUnit)
 */
export type QuantitativeObservation = BaseObservation<number>
export type Observation = QuantitativeObservation | QualitativeObservation
