// utility table names
// e.g. used in getTableData to merge data with odp or fetch correct data for dashboard
import { CSSProperties } from 'react'

import { ColName } from 'meta/assessment/col'
import { CycleUuid } from 'meta/assessment/cycle'
import { CycledPropsObject } from 'meta/assessment/cycledObject'
import { Row } from 'meta/assessment/row'
import { VariableName } from 'meta/assessment/variable'
import { UnitName } from 'meta/measurement/unitName'
import { UUID } from 'meta/uuid/uuid'

export enum TableNames {
  annualReforestation = 'annualReforestation',
  areaAffectedByFire = 'areaAffectedByFire',
  areaOfPermanentForestEstate = 'areaOfPermanentForestEstate',
  biomassStock = 'biomassStock',
  biomassStockAvg = 'biomassStockAvg',
  biomassStockTotal = 'biomassStockTotal',
  biomassStock_biomassStockStatus = 'biomassStock_biomassStockStatus',
  carbonStock = 'carbonStock',
  carbonStockAvg = 'carbonStockAvg',
  carbonStockSoilDepth = 'carbonStockSoilDepth',
  carbonStockTotal = 'carbonStockTotal',
  climaticDomain = 'climaticDomain',
  degradedForest = 'degradedForest',
  degradedForest2025 = 'degradedForest2025',
  degradedForestMonitoring2025 = 'degradedForestMonitoring2025',
  disturbances = 'disturbances',
  employment = 'employment',
  extentOfForest = 'extentOfForest',
  extentOfForest_forestAreaStatusAndTrend = 'extentOfForest_forestAreaStatusAndTrend',
  forestAreaChange = 'forestAreaChange',
  forestAreaWithinProtectedAreas = 'forestAreaWithinProtectedAreas',
  forestCharacteristics = 'forestCharacteristics',
  forestOwnership = 'forestOwnership',
  forestPolicy = 'forestPolicy',
  forestRestoration = 'forestRestoration',
  graduationOfStudents = 'graduationOfStudents',
  growingStockAvg = 'growingStockAvg',
  growingStockComposition = 'growingStockComposition',
  growingStockComposition2025 = 'growingStockComposition2025',
  growingStockTotal = 'growingStockTotal',
  growingStock_growingStockStatus = 'growingStock_growingStockStatus',
  holderOfManagementRights = 'holderOfManagementRights',
  nonWoodForestProductsRemovals = 'nonWoodForestProductsRemovals',
  nonWoodForestProductsRemovalsCurrency = 'nonWoodForestProductsRemovalsCurrency',
  otherLandWithTreeCover = 'otherLandWithTreeCover',
  primaryDesignatedManagementObjective = 'primaryDesignatedManagementObjective',
  primaryForestByClimaticDomain = 'primaryForestByClimaticDomain',
  specificForestCategories = 'specificForestCategories',
  sustainableDevelopment15_2_1_1 = 'sustainableDevelopment15_2_1_1',
  sustainableDevelopment15_2_1_2 = 'sustainableDevelopment15_2_1_2',
  sustainableDevelopment15_2_1_5 = 'sustainableDevelopment15_2_1_5',
  totalAreaWithDesignatedManagementObjective = 'totalAreaWithDesignatedManagementObjective',
  // Used to append ODP data to tableData
  originalDataPointValue = 'originalDataPointValue',
}

export enum TableCellNumberFormat {
  decimal = 'decimal',
  integer = 'integer',
  original = 'original',
}

export type TableCell = {
  columnName: ColName
  variableName: VariableName
  format?: TableCellNumberFormat
  unit?: UnitName | null
}
export type TableCellNames = Record<CycleUuid, Array<TableCell>>
// array of column names indexed by cycle uuid
export type TableColumnNames = Record<CycleUuid, Array<ColName>>
export type TableName = string
export enum TableVisibility {
  print = 'print',
  private = 'private',
  public = 'public',
}

export interface TableProps {
  cellsExportAlways?: TableCellNames
  columnNames: TableColumnNames
  columnsExport?: TableColumnNames
  columnsExportAlways?: TableColumnNames
  dataExport: boolean
  disableErrorMessage?: Record<CycleUuid, boolean>
  name: TableName
  odp?: boolean
  readonly?: boolean
  report?: Record<CycleUuid, { columnsReport?: Array<ColName>; transpose?: boolean }>
  secondary?: boolean
  sort?: Record<CycleUuid, { columnNames: Array<ColName>; rowNames: Array<VariableName> }>
  style?: Record<CycleUuid, Pick<CSSProperties, 'gridTemplateColumns'>>
  unit?: UnitName
  visibility?: Record<CycleUuid, Array<TableVisibility>>
}

export interface Table extends CycledPropsObject<TableProps> {
  rows?: Array<Row>
  tableSectionUuid: UUID
  // odpVariables?: Record<string, string>
}
