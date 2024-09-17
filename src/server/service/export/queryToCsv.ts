import QueryStream = require('pg-query-stream')
import { Transform } from 'stream'
import csvWriter = require('csv-write-stream')

import { BaseProtocol, DB } from 'server/db'

type Props = {
  query: string
  queryValues?: Array<any>
  rowTransformer?: (row: any) => Record<string, string>
}

export const queryToCsv = (props: Props, client: BaseProtocol = DB): Promise<Buffer> => {
  const { query, queryValues, rowTransformer } = props

  return new Promise((resolve, reject) => {
    const queryStream = new QueryStream(query, queryValues)
    const csvWriterStream = csvWriter()

    const chunks: Buffer[] = []
    csvWriterStream.on('data', (chunk) => {
      chunks.push(Buffer.from(chunk))
    })

    csvWriterStream.on('error', (err) => {
      reject(new Error(`Error during CSV streaming: ${err.message}`))
    })

    csvWriterStream.on('finish', () => {
      resolve(Buffer.concat(chunks))
    })

    let transformStream: Transform | null = null
    if (rowTransformer) {
      transformStream = new Transform({
        objectMode: true,
        transform(row: any, _encoding, callback) {
          try {
            const transformedRow = rowTransformer(row)
            callback(null, transformedRow)
          } catch (error) {
            callback(error)
          }
        },
      })

      transformStream.on('error', (error) => {
        reject(new Error(`Error during row transformation: ${error.message}`))
      })
    }

    client
      .stream(queryStream, (stream) => {
        stream.on('error', (error) => {
          reject(new Error(`Error during query streaming: ${error.message}`))
        })

        if (transformStream) {
          stream.pipe(transformStream).pipe(csvWriterStream)
        } else {
          stream.pipe(csvWriterStream)
        }
      })
      .catch(reject)
  })
}
