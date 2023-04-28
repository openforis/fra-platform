import { AssessmentNames } from '../../../src/meta/assessment/assessmentName'
import { Col, ColType } from '../../../src/meta/assessment/col'
import { Row, RowType } from '../../../src/meta/assessment/row'
import { Table } from '../../../src/meta/assessment/table'
import { BaseProtocol } from '../../../src/server/db'
import { Objects } from '../../../src/utils'

export const getRows = (client: BaseProtocol, schema: string, table: Table): Promise<Array<Row>> =>
  client.map<Row>(
    `select *
     from ${schema}.row
     where table_id = $1
       and props ->> 'type' in ('${RowType.data}', '${RowType.calculated}');`,
    [table.id],
    (row) => {
      return {
        ...Objects.camelize(row),
        props: {
          ...Objects.camelize(row.props),
          calculateFn: row.props.calculateFn,
          linkToSection: row.props.linkToSection,
          validateFns: row.props.validateFns,
          chart: row.props.chart,
        },
      }
    }
  )

export const getCols = (
  client: BaseProtocol,
  schema: string,
  table: Table
): Promise<Array<Col & { variableName?: string }>> =>
  client.map<Col>(
    `select c.*,r.props->>'variableName' as variable_name
     from ${schema}.col c
              left join ${schema}.row r
                        on c.row_id = r.id
     where r.table_id = $1
       and c.props ->> 'colType' not in ('${ColType.header}', '${ColType.noticeMessage}')`,
    [table.id],
    (col) => {
      return {
        ...Objects.camelize(col),
        props: {
          ...Objects.camelize(col.props),
          calculateFn: col.props.calculateFn,
          linkedNodes: col.props.linkedNodes,
          validateFns: col.props.validateFns,
        },
      }
    }
  )

export const skipPanEuropean = (tableName: string, cycleName: string, assessmentName: string): boolean => {
  if (tableName === 'table_2_5' && cycleName === '2025' && assessmentName === AssessmentNames.panEuropean) {
    return false
  }
  return true
}

export const isBasicTable = (tableName: string): boolean =>
  tableName &&
  tableName.trim() !== '' &&
  ![
    'extentOfForest_forestAreaStatusAndTrend',
    'extentOfForest_forestAreaStatusAndTrend_Description',
    'biomassStock_biomassStockStatus',
    'biomassStock_biomassStockStatus_Description',
    'growingStock_growingStockStatus',
    'growingStock_growingStockStatus_Description',
    'contactPersons',
    'extentOfForest',
    'forestCharacteristics',
    'growingStockAvg',
    'growingStockTotal',
    'degradedForest',
    'degradedForest2025',
    'degradedForestMonitoring2025',
    'sustainableDevelopment15_1_1',
    'sustainableDevelopment15_2_1_1',
    'sustainableDevelopment15_2_1_2',
    'sustainableDevelopment15_2_1_3',
    'sustainableDevelopment15_2_1_4',
    'sustainableDevelopment15_2_1_5',
    'primaryForestByClimaticDomain',
    'growingStockComposition2025',
    'forestRestoration',
    'biomassStockAvg',
    'biomassStockTotal',
    'carbonStockAvg',
    'carbonStockTotal',
    'country_comments_1_1_1',
    'country_comments_1_1_2',
    'country_comments_1_1_3',
    'country_comments_1_2_1',
    'country_comments_1_2_2',
    'country_comments_1_2_3',
    'country_comments_1_3a_1',
    'country_comments_1_3a_2',
    'country_comments_1_3a_3',
    'country_comments_1_3b_1',
    'country_comments_1_3b_2',
    'country_comments_1_4_1',
    'country_comments_1_4_2',
    'country_comments_2_4_1',
    'country_comments_2_4_2',
    'country_comments_2_5_1',
    'country_comments_2_5_2',
    'country_comments_3_1_1',
    'country_comments_3_1_2',
    'country_comments_3_2_1',
    'country_comments_3_2_2',
    'country_comments_3_3_1',
    'country_comments_3_4_1',
    'country_comments_3_4_2',
    'country_comments_4_1_1',
    'country_comments_4_1_2',
    'country_comments_4_2_1',
    'country_comments_4_2_2',
    'country_comments_4_3_1',
    'country_comments_4_3_2',
    'country_comments_4_3_3',
    'country_comments_4_4_1',
    'country_comments_4_4_2',
    'country_comments_4_4_3',
    'country_comments_4_5_1',
    'country_comments_4_5_2',
    'country_comments_4_8_1',
    'country_comments_4_8_2',
    'country_comments_4_9_1',
    'country_comments_4_9_2',
    'country_comments_5_1_1',
    'country_comments_5_1_2',
    'country_comments_6_1_1',
    'country_comments_6_1_2',
    'country_comments_6_2_1',
    'country_comments_6_3_1',
    'country_comments_6_4_1',
    'country_comments_6_5_1',
    'country_comments_6_5_2',
    'country_comments_6_6_1',
    'country_comments_6_6_2',
    'country_comments_6_9_1',
    'country_comments_6_9_2',
    'country_comments_6_10_1',
    'country_comments_6_10_2',
    'reasonability_check_3_1',
    'reasonability_check_3_2',
    'reasonability_check_1_2',
    'reasonability_check_1_4',
    'reasonability_check_4_5',
    'reasonability_check_2_4',
  ].includes(tableName)
