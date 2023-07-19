import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs/promises'
import * as process from 'process'
import * as JSON2CSV from 'json2csv'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, Table, TableName, TableNames, VariableName } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { generateSpecToEstimation } from 'server/api/cycleData/table/estimateValues'
import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { EstimationEngine, GenerateSpecMethod } from 'server/service/estimates/estimationEngine'
import { Logger } from 'server/utils/logger'

const assessmentName = 'fra'
const cycleName = '2025'

export const getDeprecatedEstimatedCountryISOsAndTableNames = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol
): Promise<Array<{ countryIso: CountryIso; tableName: TableName }>> => {
  const { assessment, cycle } = props
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // return [
  //   { countryIso: 'AFG', tableName: TableNames.extentOfForest },
  // { countryIso: 'AFG', tableName: TableNames.forestCharacteristics },
  // ]

  return client.map<{ countryIso: CountryIso; tableName: TableName }>(
    `
        select distinct n.country_iso,
                        t.props ->> 'name' as table_name
        from ${schemaCycle}.node n
                 left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
                 left join ${schemaAssessment}.row r on r.id = c.row_id
                 left join ${schemaAssessment}."table" t on t.id = r.table_id
        where n.value ->> 'estimated' = 'true'
          and n.value ->> 'estimationUuid' is null
        order by 1, 2
    `,
    [],
    (res) => Objects.camelize(res)
  )
}

export const getData = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol
): Promise<{ data: RecordAssessmentData; odpData: RecordAssessmentData }> => {
  const { assessment, cycle } = props

  const schemaAssessment = Schemas.getName(assessment)

  const countries = await CountryRepository.getMany({ assessment, cycle }, client)
  const countryISOs = countries.map((c) => c.countryIso)

  const tableNames = await client.map<TableName>(
    `select t.props ->> 'name' as table_name from ${schemaAssessment}."table" t where t.props -> 'cycles' ? $1`,
    [cycle.uuid],
    (res) => res.table_name
  )

  const data = await CycleDataController.getTableData(
    { assessment, cycle, countryISOs, aggregate: false, columns: [], mergeOdp: true, tableNames, variables: [] },
    client
  )
  const odpData = await CycleDataController.getOriginalDataPointData({ countryISOs, cycle, assessment }, client)

  return { data, odpData }
}

const variables: Record<TableName, Array<VariableName>> = {
  [TableNames.extentOfForest]: ['forestArea', 'otherWoodedLand'],
  [TableNames.forestCharacteristics]: [
    'naturalForestArea',
    'primaryForest',
    'plantationForestArea',
    'plantationForestIntroducedArea',
    'otherPlantedForestArea',
  ],
}
const methods: Array<GenerateSpecMethod> = ['linear', 'repeatLast']

type DiffNonMatching = {
  year: string
  value: string
  estimatedValue: string
}

type Diff = {
  countryIso: CountryIso
  tableName: TableName
  variableName: VariableName
  method: GenerateSpecMethod
  match: string
  nonMatchingData: Array<DiffNonMatching>
}

const verify = async (props: {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  table: Table
  data: RecordAssessmentData
  odpData: RecordAssessmentData
  diffs: Array<Diff>
}): Promise<void> => {
  const { assessment, cycle, countryIso, table, data, odpData, diffs } = props

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const tableName = table.props.name
  const years = table.props.columnNames[cycle.uuid].map((column: string) => Number(column))

  methods.forEach((method) => {
    const odpCountryData = RecordAssessmentDatas.getCountryData({
      data: odpData,
      assessmentName,
      cycleName,
      countryIso,
    })

    if (Objects.isEmpty(odpCountryData)) {
      Logger.warn(`ODP Country data is empty ${countryIso}`)
      return
    }
    if (Object.keys(odpCountryData[TableNames.originalDataPointValue]).length < 2 && method === 'linear') {
      return
    }

    variables[tableName].forEach((variableName) => {
      let match = 0
      const nonMatchingData: Array<DiffNonMatching> = []

      const fields = [variableName]
      const generateSpec = { method, fields, changeRates: {} }

      const nodeUpdates = EstimationEngine.estimateValues(
        years,
        { [countryIso]: odpCountryData },
        generateSpec,
        tableName,
        generateSpecToEstimation({ generateSpec, table })
      )

      nodeUpdates.forEach((nodeUpdate) => {
        const { tableName, variableName, colName } = nodeUpdate
        const datum = RecordAssessmentDatas.getDatum({
          assessmentName,
          cycleName,
          countryIso,
          tableName,
          colName,
          variableName,
          data,
        })

        if (colName !== '2025' || datum) {
          const value = Numbers.format(Number(datum))
          const estimatedValue = Numbers.format(Number(nodeUpdate.value.raw))
          const equals = value === estimatedValue
          // console.log('   verifying ', countryIso, tableName, variableName, colName, method)
          // console.log(
          //   '          value: ',
          //   Numbers.format(Number(datum)),
          //   ' estimated value ',
          //   Numbers.format(Number(value.raw)),
          //   ' equals: ',
          //   equals
          // )
          if (equals) {
            match += 1
          } else {
            nonMatchingData.push({ year: colName, value, estimatedValue })
          }
        }
      })

      const verify2025 = Boolean(
        RecordAssessmentDatas.getDatum({
          assessmentName,
          cycleName,
          countryIso,
          tableName,
          colName: '2025',
          variableName,
          data,
        })
      )
      const totals = years.length - (verify2025 ? 0 : 1)
      diffs.push({
        countryIso,
        tableName,
        variableName,
        method,
        match: Numbers.format((match / totals) * 100),
        nonMatchingData,
      })
    })
  })
}

const close = async () => {
  await DB.$pool.end()
}

const exec = async () => {
  await DB.tx(async (client) => {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)

    const [{ data, odpData }, tables, extentOfForest, forestCharacteristics] = await Promise.all([
      getData({ assessment, cycle }, client),
      getDeprecatedEstimatedCountryISOsAndTableNames({ assessment, cycle }, client),
      MetadataController.getTable({ assessment, cycle, tableName: TableNames.extentOfForest }, client),
      MetadataController.getTable({ assessment, cycle, tableName: TableNames.forestCharacteristics }, client),
    ])
    const tablesRecord: Record<TableName, Table> = {
      [TableNames.extentOfForest]: extentOfForest,
      [TableNames.forestCharacteristics]: forestCharacteristics,
    }

    // console.log(data, odpData)

    const diffs: Array<Diff> = []
    await Promise.all(
      tables.map(async ({ countryIso, tableName }) => {
        // console.log('====== ', tableName, countryIso)
        const table = tablesRecord[tableName]
        await verify({ assessment, cycle, countryIso, table, data, odpData, diffs })
        // return Promise.resolve()
      })
    )

    // console.log('===== diffs', diffs)
    const csv = await JSON2CSV.parseAsync(diffs, {
      fields: [
        { value: 'countryIso', label: 'Country Iso' },
        { value: 'tableName', label: 'Table name' },
        { value: 'variableName', label: 'Variable Name' },
        { value: 'method', label: 'Method' },
        { value: 'match', label: 'Match (%)' },
        { value: 'nonMatchingData', label: 'Non Matching data' },
      ],
    })
    await fs.writeFile(`./diffs.csv`, csv)
  })

  await close()
}

Logger.info('Estimations reverse engineer starting')
exec().then(() => {
  Logger.info('Estimations reverse engineer terminated')
  process.exit(0)
})
