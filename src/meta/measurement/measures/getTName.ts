import { MeasureName } from 'meta/measurement/measure'

export const getTName = (name: MeasureName): string => `measures.${name}`
