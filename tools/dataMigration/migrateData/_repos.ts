import { ITask } from 'pg-promise'

import { Col, ColType } from '../../../src/meta/assessment/col'
import { Row, RowType } from '../../../src/meta/assessment/row'
import { Table } from '../../../src/meta/assessment/table'
import { Objects } from '../../../src/utils'

export const getRows = (client: ITask<any>, schema: string, table: Table): Promise<Array<Row>> =>
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
          validateFns: row.props.validateFns,
        },
      }
    }
  )

export const getCols = (client: ITask<any>, schema: string, table: Table): Promise<Array<Col>> =>
  client.map<Col>(
    `select *
     from ${schema}.col c
     where c.row_id in (
         select r.id
         from ${schema}.row r
         where table_id = $1
     )
       and c.props ->> 'colType' not in ('${ColType.header}', '${ColType.noticeMessage}')`,
    [table.id],
    (col) => {
      return {
        ...Objects.camelize(col),
        props: {
          ...Objects.camelize(col.props),
          calculateFn: col.props.calculateFn,
        },
      }
    }
  )

export const isBasicTable = (tableName: string): boolean =>
  tableName &&
  tableName.trim() !== '' &&
  ![
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
  ].includes(tableName)
