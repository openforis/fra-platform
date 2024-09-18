import QueryStream = require('pg-query-stream')
import { Transform } from 'stream'
import * as fastCsv from 'fast-csv'

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

    const chunks: Buffer[] = []

    const csvStream = fastCsv
      .format({ headers: true })
      .on('data', (chunk) => {
        chunks.push(Buffer.from(chunk))
      })
      .on('end', () => {
        resolve(Buffer.concat(chunks))
      })
      .on('error', (err) => {
        reject(new Error(`Error during CSV streaming: ${err.message}`))
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
          stream.pipe(transformStream).pipe(csvStream)
        } else {
          stream.pipe(csvStream)
        }
      })
      .catch(reject)
  })
}
