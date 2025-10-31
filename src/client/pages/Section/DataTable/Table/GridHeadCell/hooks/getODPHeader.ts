import { Country } from 'meta/area/country'
import { Col } from 'meta/assessment/col'
import { Table, TableNames } from 'meta/assessment/table'

import { ODPColHeader } from 'client/pages/Section/DataTable/Table/types'

type Props = {
  col: Col
  columnName: string
  country: Country
  odpYears: Array<ODPColHeader>
  showOdp: boolean
  table: Table
}

type Returned = ODPColHeader | undefined

export const getODPHeader = (props: Props): Returned => {
  const { col, columnName, country, odpYears, showOdp, table } = props

  let odpHeader: Returned
  const isODPVisible = showOdp && table.props.odp && !col.props.labels
  if (isODPVisible) {
    odpHeader = odpYears?.find((odp) => odp.year === columnName)
  }
  if (
    table.props.name === TableNames.forestCharacteristics &&
    !country.props.forestCharacteristics.useOriginalDataPoint
  ) {
    odpHeader = undefined
  }

  return odpHeader
}
