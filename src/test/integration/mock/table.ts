import { ColProps, ColType } from 'meta/assessment/col'
import { RowProps, RowType } from 'meta/assessment/row'

export const tableParams = {
  props: {
    name: 'testName',
    cycles: ['2020'],
    dataExport: true,
    columnNames: {
      columnNames: ['1990', '2000', '2010', '2015', '2020', '2025'],
    },
  },
}

export const rowParams: RowProps = {
  index: 0,
  type: RowType.data,
  variableName: 'testVariable',
}

export const colParams: ColProps = {
  colName: '2020',
  colType: ColType.decimal,
  index: 0,
}
