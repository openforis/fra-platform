import { Parser } from 'htmlparser2'

import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { BulkDownloadDatumType, CSVValue } from 'server/controller/cycleData/bulkDownload/types'

export const parseValue = (
  value: string | Array<string>,
  datumType: BulkDownloadDatumType = BulkDownloadDatumType.number
): CSVValue => {
  let parsedValue = ''
  if (!Objects.isEmpty(value)) {
    parsedValue = datumType === 'strings' ? (value as Array<string>).join(', ') : (value as string)
    parsedValue = parsedValue.replace(/"/g, '').replace(/\n/g, '').replace(/\r/g, '')
    if (datumType === 'number' && Numbers.toBigNumber(parsedValue).isFinite()) {
      parsedValue = Numbers.toFixed(parsedValue)
    }
  }
  return `"${parsedValue}"`
}

export const parseDescription = (html: string): string => {
  let extractedText = ''
  const parser = new Parser(
    {
      onopentag(name, attributes): void {
        if (name === 'a') {
          extractedText += ` (${attributes.href})`
        }
      },
      ontext(text): void {
        extractedText += text
      },
    },
    { decodeEntities: true }
  )

  parser.write(html)
  parser.end()

  return extractedText
}
