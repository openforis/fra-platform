import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { Unit } from 'meta/measurement/unit'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  units: Array<Omit<Unit, 'uuid'>>
}

export const massiveInsert = (props: Props, client: BaseProtocol = DB): Promise<Array<Unit>> => {
  const { units } = props

  const pgp = pgPromise()
  const columns = [
    { name: 'name', prop: 'name' },
    { name: 'symbol', prop: 'symbol' },
  ]
  const table = { table: 'unit', schema: 'measurement' }
  const cs = new pgp.helpers.ColumnSet(columns, { table })

  const query = `${pgp.helpers.insert(units, cs)} returning *`
  return client.map<Unit>(query, [], (res) => Objects.camelize(res))
}
