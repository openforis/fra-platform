import QueryStream = require('pg-query-stream')
import { pipeline, Transform } from 'stream'
import * as fastCsv from 'fast-csv'
import { ParserRow } from 'fast-csv'
import * as pgPromise from 'pg-promise'

import { BaseProtocol, DB } from 'server/db'
import { Logger } from 'server/utils/logger'

export type QueryToCsvStreamProps<QueryResultRow> = {
  query: string
  queryParams?: unknown
  rowTransformer?: (row: QueryResultRow) => ParserRow
}

export const queryToCsvStream = <QueryResultRow>(
  props: QueryToCsvStreamProps<QueryResultRow>,
  client: BaseProtocol = DB
): Promise<NodeJS.ReadableStream> => {
  const { query, queryParams, rowTransformer } = props

  return new Promise((resolve, reject) => {
    let finalQuery = query
    if (queryParams) {
      const pgp = pgPromise()
      finalQuery = pgp.as.format(query, queryParams)
    }

    const queryStream = new QueryStream(finalQuery, null)
    const csvStream = fastCsv.format({ headers: true })

    let transformStream: Transform | null = null
    if (rowTransformer) {
      transformStream = new Transform({
        objectMode: true,
        transform(row: QueryResultRow, _encoding, callback): void {
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
        const pipelineCallBack = (err?: NodeJS.ErrnoException | null): void => {
          if (err) {
            Logger.error(err)
          }
        }
        if (transformStream) {
          resolve(pipeline(stream, transformStream, csvStream, pipelineCallBack))
        } else {
          resolve(pipeline(stream, csvStream, pipelineCallBack))
        }
      })
      .catch(reject)
  })
}
