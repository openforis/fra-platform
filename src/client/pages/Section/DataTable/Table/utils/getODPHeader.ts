import { Country } from 'meta/area'
import { Col, Table } from 'meta/assessment'

type OdpYear = {
  id: number
  year: string
}

type Props = {
  col: Col
  columnName: string
  country: Country
  odpYears: Array<OdpYear>
  showOdp: boolean
  table: Table
}

type Returned = OdpYear | undefined

export const getODPHeader = (props: Props): Returned => {
  const { col, columnName, country, odpYears, showOdp, table } = props

  let odpHeader: Returned
  const isODPVisible = showOdp && table.props.odp && !col.props.labels
  if (isODPVisible) {
    odpHeader = odpYears?.find((odp) => odp.year === columnName)
  }
  if (table.props.name === 'forestCharacteristics' && !country.props.forestCharacteristics.useOriginalDataPoint) {
    odpHeader = undefined
  }

  return odpHeader
}
