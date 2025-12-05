import { Dates } from 'utils/dates'

import { CSVContent, CSVRow } from 'server/controller/cycleData/getBulkDownload/types'

type Props = {
  fileName: string
}

const getFileName = (props: Props): string => {
  const { fileName } = props

  return `${fileName}_${Dates.format(new Date(), 'yyyy-MM-dd')}.csv`
}

export const toCSVContent = (props: { fileName: string; rows: Array<CSVRow> }): CSVContent => {
  const { fileName, rows } = props

  return { content: rows.join(`\n`), fileName: getFileName({ fileName }) }
}
