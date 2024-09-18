import QueryStream = require('pg-query-stream')
import { pipeline, Transform } from 'stream'
import * as fastCsv from 'fast-csv'
import { Client } from 'pg'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  query: string
  queryParams?: Parameters<Client['query']>[1]
  rowTransformer?: (row: any) => Record<string, string>
}

export const queryToCsvStream = (props: Props, client: BaseProtocol = DB): Promise<NodeJS.ReadableStream> => {
  const { query, queryParams, rowTransformer } = props

  return new Promise((resolve, reject) => {
    const queryStream = new QueryStream(query, queryParams)

    const csvStream = fastCsv.format({ headers: true })

    let transformStream: Transform | null = null
    if (rowTransformer) {
      transformStream = new Transform({
        objectMode: true,
        transform(row: any, _encoding, callback) {
          try {
            const transformedRow = rowTransformer(row)
            callback(null, transformedRow)
          } catch (error) {
            callback(new Error(`Error during row transformation: ${error.message}`))
          }
        },
      })
    }

    client
      .stream(queryStream, (stream) => {
        // pipeline requires a cb function to be passed, even if it does nothing.
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const pipelineCallBack = (_err: NodeJS.ErrnoException) => {}
        if (transformStream) {
          resolve(pipeline(stream, transformStream, csvStream, pipelineCallBack))
        } else {
          resolve(pipeline(stream, csvStream, pipelineCallBack))
        }
      })
      .catch(reject)
  })
}
