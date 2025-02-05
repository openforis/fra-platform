import { Country } from 'meta/area'
import { Col, Table, TableNames } from 'meta/assessment'

import { ODPYear } from '../../types'

type Props = {
  col: Col
  columnName: string
  country: Country
  odpYears: Array<ODPYear>
  showOdp: boolean
  table: Table
}

type Returned = ODPYear | undefined

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
