export enum TableDatumODPType {
  fra = 'fra',
  odp = 'odp',
}

export interface TableDatumODP {
  draft?: boolean
  year?: number
  name?: string
  odpId?: string
  type: TableDatumODPType
  // 1a
  forestArea?: string
  forestAreaEstimated?: boolean
  otherWoodedLand?: string
  otherWoodedLandEstimated?: boolean
  // 1b
  naturalForestArea?: string
  naturalForestAreaEstimated?: boolean
  otherPlantedForestArea?: string
  otherPlantedForestAreaEstimated?: boolean
  plantationForestArea?: string
  plantationForestAreaEstimated?: boolean
  plantationForestIntroducedArea?: string
  plantationForestIntroducedAreaEstimated?: boolean
}

export type TableDataRow = Array<string>

export type TableData = Array<TableDataRow | TableDatumODP>
