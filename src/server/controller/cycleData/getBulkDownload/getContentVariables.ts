import { Promises } from 'utils/promises'

import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'
import { Years } from 'meta/assessment/years'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { climaticDomain } from 'server/controller/cycleData/getBulkDownload/climaticDomain'
import { formatDatum } from 'server/controller/cycleData/getBulkDownload/formatDatum'
import { getClimaticValue } from 'server/controller/cycleData/getBulkDownload/getClimaticValue'
import { getData } from 'server/controller/cycleData/getBulkDownload/getData'
import { Props } from 'server/controller/cycleData/getBulkDownload/props'
import { TableRepository } from 'server/db/repository/assessment/table'

import { getMetadata } from './utils/getMetadata'

type Entries = Array<{ tableName: string; variables: Array<{ csvColumn: string; variableName: string }> }>
type Returned = Array<{ fileName: string; content: Array<Record<string, string>> }>

const forestAreaColName: Record<CycleName, ColName> = {
  '2020': '2020',
  '2025': '2025',
  latest: '2025',
} as const

export const getContentVariables = async (props: Props & { fileName: string; entries: Entries }): Promise<Returned> => {
  const { assessment, countries, cycle, entries, fileName } = props
  const isFRAYears = fileName === 'FRA_Years'
  const _climaticData = await climaticDomain(props)
  const climaticData = RecordAssessmentDatas.getCycleData({
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    data: _climaticData,
  })
  const tableNames = entries.map(({ tableName }) => tableName).concat(TableNames.extentOfForest)
  const tablesMetadata = await TableRepository.getMany({ assessment, cycle, tableNames })

  const data = await getData({
    assessment,
    cycle,
    countries,
    tableNames,
  })

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const ret: Array<{ fileName: string; content: Array<Record<string, string>> }> = []

  await Promises.each(entries, async (entry) => {
    const { tableName, variables } = entry
    const tableMetadata = tablesMetadata.find((table) => table.props.name === tableName)
    let cols = isFRAYears ? Years.fraYears(cycle) : tableMetadata?.props.columnNames[cycle.uuid]

    if (tableName === 'growingStockComposition2025') {
      cols = ['growingStockPercent', 'growingStockMillionCubicMeter']
    }

    if (tableName === TableNames.carbonStockSoilDepth) {
      cols = ['soil_depth']
    }

    await Promises.each(variables, async (variable) => {
      const { csvColumn, variableName } = variable

      const currentCols = [...cols]

      if (tableName === 'growingStockComposition2025' && variableName.match(/^(native|introduced)Rank\d+$/)) {
        currentCols.unshift('scientific_name', 'common_name')
      }

      const content = countries.map((country) => {
        const { countryIso, regionCodes } = country

        const forestAreaColumn = forestAreaColName[cycleName]

        const forestAreaProps = {
          assessmentName,
          cycleName,
          data,
          countryIso,
          tableName: TableNames.extentOfForest,
          variableName: 'forestArea',
          colName: forestAreaColumn,
        }
        const forestArea = RecordAssessmentDatas.getDatum(forestAreaProps)

        const base: Record<string, string> = {
          regions: regionCodes.join(';'),
          iso3: countryIso,
          name: countryIso,
          [`forest area ${forestAreaColumn}`]: forestArea,
          boreal: getClimaticValue('boreal', countryIso, climaticData),
          temperate: getClimaticValue('temperate', countryIso, climaticData),
          tropical: getClimaticValue('tropical', countryIso, climaticData),
          subtropical: getClimaticValue('sub_tropical', countryIso, climaticData),
        }

        currentCols.forEach((colName) => {
          const datum = RecordAssessmentDatas.getDatum({
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
            data,
            countryIso,
            tableName,
            variableName,
            colName,
          })

          base[colName] = formatDatum(datum)
        })

        return base
      })

      const { dateExported, unit } = await getMetadata({ assessment, cycle, tableName, csvColumn })

      content[0][csvColumn] = dateExported
      content[1][csvColumn] = unit

      ret.push({ fileName: `${fileName}_variables/${csvColumn}`, content })
    })
  })

  return ret
}
