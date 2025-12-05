import { Parser } from 'htmlparser2'

import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { BulkDownloadVariableType, CSVValue } from 'server/controller/cycleData/getBulkDownload/types'

export const parseValue = (
  value: string,
  type: BulkDownloadVariableType = BulkDownloadVariableType.number
): CSVValue => {
  let parsedValue = ''
  if (!Objects.isEmpty(value)) {
    parsedValue = value.replace(/"/g, '').replace(/\n/g, '').replace(/\r/g, '')
    if (type === 'number' && Numbers.toBigNumber(parsedValue).isFinite()) {
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
