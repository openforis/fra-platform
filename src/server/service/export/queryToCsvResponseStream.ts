import { Response } from 'express'

import { BaseProtocol, DB } from 'server/db'
import Requests from 'server/utils/requests'

import { queryToCsvStream, QueryToCsvStreamProps } from './queryToCsvStream'

type Props<QueryResultRow> = QueryToCsvStreamProps<QueryResultRow> & {
  fileName: string
  res: Response
}

export const queryToCsvResponseStream = async <QueryResultRow>(
  props: Props<QueryResultRow>,
  client: BaseProtocol = DB
) => {
  const { fileName, query, queryParams, res, rowTransformer } = props

  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
  res.setHeader('Content-Type', 'text/csv')

  const csvStream = await queryToCsvStream({ query, queryParams, rowTransformer }, client)

  csvStream
    .on('error', (err) => {
      Requests.sendErr(res, err)
    })
    .pipe(res)
    .on('error', (err) => {
      Requests.sendErr(res, err)
    })
    .on('finish', res.end)
}
