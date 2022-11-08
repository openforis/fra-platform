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
     from assessment_fra.col c
     where c.row_id in (
         select r.id
         from ${schema}.row r
         where table_id = $1
     )
       and c.props ->> 'colType' not in ('${ColType.header}', '${ColType.noticeMessage}')`,
    [table.id],
    // @ts-ignore
    Objects.camelize
  )

export const isBasicTable = (tableName: string): boolean =>
  tableName &&
  tableName.trim() !== '' &&
  ![
    'extentOfForest',
    'forestCharacteristics',
    'growingStockAvg',
    'growingStockTotal',
    'degradedForest',
    'sustainableDevelopment15_1_1',
    'sustainableDevelopment15_2_1_1',
    'sustainableDevelopment15_2_1_2',
    'sustainableDevelopment15_2_1_3',
    'sustainableDevelopment15_2_1_4',
    'sustainableDevelopment15_2_1_5',
    'primaryForestByClimaticDomain',
    'growingStockComposition2025',
    'forestRestoration',
    'permanentForestEstate',
  ].includes(tableName)
