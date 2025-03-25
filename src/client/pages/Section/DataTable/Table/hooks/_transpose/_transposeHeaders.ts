import { TableName, TableNames } from 'meta/assessment'

import { transposeHeadersDefault } from './_transposeHeadersDefault'
import { transposeHeadersSdg15215 } from './_transposeHeadersSdg15215'
import { TransposeHeaders } from './_types'

const customTransposeHeaders: Record<TableName, TransposeHeaders> = {
  [TableNames.sustainableDevelopment15_2_1_5]: transposeHeadersSdg15215,
}

export const _transposeHeaders: TransposeHeaders = (props) => {
  const { table } = props
  const { name: tableName } = table.props

  const transposeHeaders = customTransposeHeaders[tableName] ?? transposeHeadersDefault
  return transposeHeaders(props)
}
