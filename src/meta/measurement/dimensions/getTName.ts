import { DimensionName } from 'meta/measurement/dimension'

export const getTName = (name: DimensionName): string => `dimensions.${name}`
