import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { ColProps, ColType, Cycle, RowProps, RowType } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol, Schemas } from 'server/db'

import { updateDependencies } from 'test/migrations/steps/utils/updateDependencies'

// Create 2 new variables:
// carbon_stock_biomass_total: a+b * forestArea
// carbon_stock_total: a+b+c+d+e * forestArea

const years = ['1990', '2000', '2010', '2015', '2016', '2017', '2018', '2019', '2020']

const totalCalcVariables = [
  'carbon_forest_above_ground',
  'carbon_forest_below_ground',
  'carbon_forest_deadwood',
  'carbon_forest_litter',
  'carbon_forest_soil',
].map((a) => `carbonStock.${a}`)
const biomassTotalCalcVariables = totalCalcVariables.slice(0, 2)

const variables: Array<Record<string, string>> = [
  {
    variableName: 'carbon_stock_biomass_total',
    calculateFn: `(${biomassTotalCalcVariables.join(' + ')}) * extentOfForest.forestArea`,
  },
  {
    variableName: 'carbon_stock_total',
    calculateFn: `(${totalCalcVariables.join(' + ')}) * extentOfForest.forestArea`,
  },
]

const _rowProps = (cycle: Cycle): Array<RowProps> =>
  variables.map(({ variableName, calculateFn }, index) => ({
    calculateFn: { [cycle.uuid]: calculateFn },
    hidden: true,
    index: 5 + index,
    label: { key: `carbonStock.${Objects.camelize(variableName)}` },
    type: RowType.data,
    variableName,
  }))

const _colProps = (cycle: Cycle, variableName: string): Array<ColProps> => [
  {
    index: 'header_0',
    style: {
      [cycle.uuid]: {
        colSpan: 1,
      },
    },
    labels: {
      [cycle.uuid]: {
        key: `carbonStock.${Objects.camelize(variableName)}`,
      },
    },
    colType: ColType.header,
  },
  ...years.map((colName, index) => ({
    index,
    style: {
      [cycle.uuid]: {},
    },
    colName,
    colType: ColType.calculated,
  })),
]

export default async (client: BaseProtocol) => {
  const assessmentName = 'fra'
  const cycleName = '2020'
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
  const table = await MetadataController.getTable({ tableName: 'carbonStock', cycle, assessment })

  await Promises.each(_rowProps(cycle), async (rowProps) => {
    const cycles = [cycle]
    const row = await MetadataController.createRow({ assessment, cycles, rowProps, table })
    await Promises.each(_colProps(cycle, rowProps.variableName), async (colProps) => {
      await MetadataController.createCol({ assessment, colProps, cycles, row })
    })
  })

  // **** update metacache
  await AssessmentController.generateMetaCache(client)

  // **** update metadata cache
  await AssessmentController.generateMetadataCache({ assessment }, client)

  const update = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache: true }, client)

  const schemaName = Schemas.getName(update.assessment)

  // **** update calculated cols
  const nodes = await client.map<NodeUpdate>(
    `select s.props ->> 'name'         as section_name
          , t.props ->> 'name'         as table_name
          , r.props ->> 'variableName' as variable_name
          , c.props ->> 'colName'      as col_name
     from ${schemaName}.col c
              left join ${schemaName}.row r on r.id = c.row_id
              left join ${schemaName}."table" t on t.id = r.table_id
              left join ${schemaName}.table_section ts on ts.id = t.table_section_id
              left join ${schemaName}.section s on s.id = ts.section_id
     where s.props ->> 'name' = 'carbonStock'
       and t.props ->> 'name' = 'carbonStock'
       and r.props ->> 'variableName' in ('carbon_stock_biomass_total', 'carbon_stock_total')`,
    [],
    (res) => Objects.camelize(res)
  )

  await updateDependencies(
    { assessment: update.assessment, cycle: update.cycle, nodes, includeSourceNodes: true },
    client
  )
}
