import { TableName } from 'meta/assessment/table'
import { Unit } from 'meta/measurement/unit'
import { UnitName } from 'meta/measurement/unitName'
import { UUID } from 'meta/uuid'

export type SystemOfMeasurementDB = {
  baseUnitUUID: UUID
  conversionFactors: Record<UUID, number> // conversion factor of each unit in relation to base unit
  name: SystemOfMeasurementName
  uuid: UUID
}

export type SystemOfMeasurement = {
  baseUnitName: UnitName
  name: SystemOfMeasurementName
  units: Partial<Record<UnitName, Omit<Unit, 'uuid'> & { conversionFactor: number }>>
}

export enum SystemOfMeasurementName {
  area = 'area',
  areaPerYear = 'area/year',
  mass = 'mass',
  massPerArea = 'mass/area',
  percent = 'percent',
  volume = 'volume',
  volumePerArea = 'volume/area',
}

type UnitWithFactor = Omit<Unit, 'uuid'> & {
  conversionFactor?: number
}

type SystemOfMeasurementSeed = Record<
  SystemOfMeasurementName,
  {
    units: Array<UnitWithFactor>
    tableNames: Array<TableName>
  }
>

export const systemsOfMeasurement: SystemOfMeasurementSeed = {
  [SystemOfMeasurementName.area]: {
    units: [
      { name: UnitName.haThousand, symbol: '1000 ha', conversionFactor: 1 },
      { name: UnitName.ha, symbol: 'ha', conversionFactor: 1000 },
      { name: UnitName.kmSq, symbol: 'km²', conversionFactor: 10 },
      { name: UnitName.mileSq, symbol: 'mi²', conversionFactor: 3.86102 },
      { name: UnitName.acre1000, symbol: '1000 ac', conversionFactor: 2.47105 },
      { name: UnitName.acre, symbol: 'ac', conversionFactor: 2471.05 },
      { name: UnitName.haMillion, symbol: '1000000 ha', conversionFactor: 0.001 },
    ],
    tableNames: [
      'areaAffectedByFire',
      'areaOfPermanentForestEstate',
      'disturbances',
      'extentOfForest',
      'forestAreaWithinProtectedAreas',
      'forestCharacteristics',
      'forestOwnership',
      'holderOfManagementRights',
      'otherLandWithTreeCover',
      'primaryDesignatedManagementObjective',
      'specificForestCategories',
      'sustainableDevelopment15_2_1_5',
      'totalAreaWithDesignatedManagementObjective',
    ],
  },
  [SystemOfMeasurementName.areaPerYear]: {
    units: [{ name: UnitName.haThousandPerYear, symbol: '1000ha/year', conversionFactor: 1 }],
    tableNames: ['forestAreaChange'],
  },
  [SystemOfMeasurementName.mass]: {
    units: [{ name: UnitName.millionTonnes, symbol: '1000000t', conversionFactor: 1 }],
    tableNames: ['biomassStockTotal', 'carbonStockTotal'],
  },
  [SystemOfMeasurementName.massPerArea]: {
    units: [{ name: UnitName.tonnesPerHa, symbol: 't/ha', conversionFactor: 1 }],
    tableNames: ['biomassStockAvg', 'carbonStockAvg'],
  },
  [SystemOfMeasurementName.volume]: {
    units: [{ name: UnitName.millionsCubicMeterOverBark, symbol: '1000000m³', conversionFactor: 1 }],
    tableNames: ['growingStockTotal'],
  },
  [SystemOfMeasurementName.volumePerArea]: {
    units: [{ name: UnitName.cubicMeterPerHa, symbol: 'm³/ha', conversionFactor: 1 }],
    tableNames: ['growingStockAvg'],
  },
  [SystemOfMeasurementName.percent]: {
    units: [{ name: UnitName.percent, symbol: '%', conversionFactor: 1 }],
    tableNames: [],
  },
}
