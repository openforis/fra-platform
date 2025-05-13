import { Promises } from 'utils/promises'

import { AssessmentNames } from 'meta/assessment/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

type TableChild = { col: string; variableName: string }
type TableToUpdate = {
  tableName: string
  variableName: string
  colName: string
  children: Array<TableChild>
}

const tablesToUpdate: Array<TableToUpdate> = [
  {
    tableName: 'forestRestoration',
    variableName: 'has_your_country_forest_restoration_commitments',
    colName: 'answer',
    children: [
      { col: 'answer', variableName: 'law_or_other_mandate' },
      { col: 'answer', variableName: 'how_monitored' },
      { col: 'answer', variableName: 'areas_in_need_of_restoration' },
      { col: 'answer', variableName: 'restoration_targets' },
      { col: 'answer', variableName: 'hectares_restored' },
    ],
  },
  {
    tableName: 'areaOfPermanentForestEstate',
    variableName: 'area_of_permanent_forest_estate',
    colName: 'applicable',
    children: [
      { col: 'applicable', variableName: 'area_of_permanent_forest_estate' },
      { col: '1990', variableName: 'area_of_permanent_forest_estate' },
      { col: '2000', variableName: 'area_of_permanent_forest_estate' },
      { col: '2010', variableName: 'area_of_permanent_forest_estate' },
      { col: '2015', variableName: 'area_of_permanent_forest_estate' },
      { col: '2020', variableName: 'area_of_permanent_forest_estate' },
      { col: '2025', variableName: 'area_of_permanent_forest_estate' },
    ],
  },
  {
    tableName: 'degradedForest2025',
    variableName: 'hasNationalDefinitionOfDegradedForest',
    colName: 'hasNationalDefinitionOfDegradedForest',
    children: [
      { col: 'national_definition', variableName: 'national_definition' },
      { col: 'criteriaOfDegradedForest', variableName: 'criteriaOfDegradedForest' },
    ],
  },
  {
    tableName: 'degradedForestMonitoring2025',
    variableName: 'doesYourCountryMonitor',
    colName: 'doesYourCountryMonitor',
    children: [
      { col: 'mainMethods', variableName: 'mainMethods' },
      { col: 'monitoringScale', variableName: 'monitoringScale' },
      { col: 'yearOfLatestAssessment', variableName: 'yearOfLatestAssessment' },
      { col: 'degradedAreaForThatYear', variableName: 'degradedAreaForThatYear' },
    ],
  },
]

export default async (client: BaseProtocol) => {
  const assessmentName = AssessmentNames.fra
  const assessment = await AssessmentController.getOne({ assessmentName }, client)

  const cycles = assessment.cycles.filter((cycle) => cycle.name !== '2020')

  await Promises.each(tablesToUpdate, async (table: TableToUpdate) => {
    const { tableName, variableName, colName, children } = table
    await Promises.each(children, async (child: TableChild) => {
      const { col, variableName: childVar } = child
      const enableIf = cycles.reduce<Record<string, string>>((acc, cycle) => {
        const p = `${tableName}.${variableName}.${colName}`
        const f = `!${p} || ${p} == 'yes'`
        acc[cycle.uuid] = f
        return acc
      }, {})
      const propsJson = JSON.stringify({ enableIf })
      await client.query(
        `update ${Schemas.getName(assessment)}.col c
         set props = c.props || $1::jsonb
         from ${Schemas.getName(assessment)}.row r
         join ${Schemas.getName(assessment)}."table" t on t.id = r.table_id
         where c.row_id = r.id
           and t.props->>'name' = $2
           and c.props->>'colName' = $3
           and r.props->>'variableName' = $4
        `,
        [propsJson, tableName, col, childVar]
      )
    })
  })

  await AssessmentController.generateMetaCache(client)
  await AssessmentController.generateMetadataCache({ assessment }, client)
}
