import { UUIDs } from '@utils/uuids'
import * as pgPromise from 'pg-promise'

import { CommentableDescription, DataSource } from '@meta/assessment'

import { BaseProtocol } from '@server/db'

const _fixEmptyDataSources = async (client: BaseProtocol) => {
  await client.query(`update assessment_fra_2025.descriptions
                      set value = value - 'dataSources'
                      where id in (select id
                                   from assessment_fra_2025.descriptions
                                   where name = 'dataSources' and value -> 'dataSources' = '[]');`)
}

const _fixMissingUuidDataSources = async (client: BaseProtocol) => {
  const descriptions =
    await client.query(`select d.* from assessment_fra_2025.descriptions d, jsonb_array_elements(value -> 'dataSources') z
                                 where name = 'dataSources' and d.value -> 'dataSources' is not null and z -> 'uuid' is null`)

  for (let k = 0; k < descriptions.length; k += 1) {
    const description = descriptions[k]
    description.value.dataSources = description.value.dataSources.map((dataSource: DataSource) => {
      // eslint-disable-next-line no-param-reassign
      dataSource.uuid = dataSource.uuid ?? UUIDs.v4()
      return dataSource
    })

    const pgp = pgPromise()
    const cs = new pgp.helpers.ColumnSet<CommentableDescription>(
      [
        {
          name: 'value',
          cast: 'jsonb',
        },
        {
          name: 'id',
          cast: 'bigint',
          cnd: true,
        },
      ],
      {
        table: { table: 'descriptions', schema: 'assessment_fra_2025' },
      }
    )

    const query = `${pgp.helpers.update(descriptions, cs)} where v.id = t.id;`
    // eslint-disable-next-line no-await-in-loop
    await client.query(query)
  }
}

export default async (client: BaseProtocol) => {
  await _fixEmptyDataSources(client)
  await _fixMissingUuidDataSources(client)
}
