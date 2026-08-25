export interface Cell {
  colName: string
  sectionName: string
  tableName: string
  variableName: string
}

// Table cells to edit
export const cells: Array<Cell> = [
  { colName: '1990', sectionName: 'extentOfForest', tableName: 'extentOfForest', variableName: 'forestArea' },
  { colName: '2020', sectionName: 'extentOfForest', tableName: 'extentOfForest', variableName: 'forestArea' },
  { colName: '2025', sectionName: 'extentOfForest', tableName: 'extentOfForest', variableName: 'forestArea' },
  { colName: '1990', sectionName: 'extentOfForest', tableName: 'extentOfForest', variableName: 'otherWoodedLand' },
  { colName: '2020', sectionName: 'extentOfForest', tableName: 'extentOfForest', variableName: 'otherWoodedLand' },
  { colName: '2025', sectionName: 'extentOfForest', tableName: 'extentOfForest', variableName: 'otherWoodedLand' },
  {
    colName: '2020-2025',
    sectionName: 'forestAreaChange',
    tableName: 'forestAreaChange',
    variableName: 'forest_expansion',
  },
  {
    colName: '2020-2025',
    sectionName: 'forestAreaChange',
    tableName: 'forestAreaChange',
    variableName: 'afforestation',
  },
  {
    colName: '2020-2025',
    sectionName: 'forestAreaChange',
    tableName: 'forestAreaChange',
    variableName: 'deforestation',
  },
]
