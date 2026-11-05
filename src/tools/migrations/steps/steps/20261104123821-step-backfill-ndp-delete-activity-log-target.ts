import pgPromise from 'pg-promise'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol } from 'server/db/db'

import { recreateCountryActivityLogViews } from './utils/recreateCountryActivityLogViews'

type Target = Pick<OriginalDataPoint, 'uuid' | 'year'>

// Used previous backups to gather missing uuids: b239 (CRI, X18), b249 (BRA), b251 (CUB)
const targets: Record<string, Target> = {
  // BRA
  '6394276': { uuid: 'd3d09333-d79a-4c95-aeff-39774920ae0d', year: 2023 },
  '6419846': { uuid: 'd80c3760-c504-4a4a-a945-0b79aae1410d', year: 2000 },
  '6419918': { uuid: 'ca8e1c99-a8b3-40b1-9dc6-154ce1429584', year: 2004 },
  '6420016': { uuid: '078a1529-4bf8-45b5-b925-3bcf6e7c51d1', year: 2006 },
  '6420114': { uuid: '7504fe22-bb63-4dc6-ab9a-e446e4913ce7', year: 2008 },
  '6420212': { uuid: 'e6d3d937-89d5-40a1-9c25-be451aab379e', year: 2010 },
  '6420284': { uuid: '682f5617-5c85-40a3-b1c9-22f0ca395b69', year: 2013 },
  '6420382': { uuid: '82339903-06d0-4b1e-97e5-6372f9dd2a0a', year: 2014 },
  '6420480': { uuid: '2d3e3107-545d-463f-b0d2-e73113e40a11', year: 2016 },
  '6420598': { uuid: '21725163-818b-4338-ba96-e39f2371b97e', year: 2017 },
  '6420716': { uuid: '31abc9eb-4fa9-4f3c-9951-8fc7f77efa8e', year: 2018 },
  '6420826': { uuid: '23b6cb2e-fd36-45a8-ba5d-07010c0b8e0f', year: 2019 },
  '6420944': { uuid: '6fec13eb-8208-48ee-a388-e56c9396b03e', year: 2020 },
  '6421079': { uuid: 'fec2c7b3-9e06-4df2-9592-f2363648312b', year: 2021 },
  '6421177': { uuid: '31a24a15-7962-4e95-a904-8a8a39aa9b58', year: 2022 },
  // CHL
  '6409268': { uuid: 'be696973-8db5-4546-b90f-02c624f72b7e', year: 2023 },
  '6518652': { uuid: '5628a63e-9500-4328-b4f8-e97e25dba278', year: 2025 },
  // CRI
  '6403862': { uuid: 'd0155861-24e0-42c3-993f-9dc9f8a00776', year: 2021 },
  // CUB
  '6510773': { uuid: '3bac7c38-3a72-4ef8-9632-a9a649b50eaa', year: 2010 },
  '6510908': { uuid: '4d320b97-998d-426d-bc5e-6ef73177d0f8', year: 2005 },
  '6510957': { uuid: '6936b7c2-27a7-41d7-a3a0-e77faa437248', year: 2000 },
  '6511031': { uuid: 'd00dbccb-60c8-4424-ab60-d9e531af55d6', year: 1990 },
  '6512183': { uuid: '605cbcd0-93eb-4e1d-9b09-309bb408035f', year: 2024 },
  '6512232': { uuid: 'bbf7dc97-b673-4eb2-b776-00daa7435923', year: 2025 },
  // X18
  '6411972': { uuid: 'faf852cd-2b52-476e-a938-1b8a00f12858', year: 2025 },
}

export default async (client: BaseProtocol): Promise<void> => {
  const updates = Object.entries(targets).map(([id, target]) => ({ id: Number(id), target }))

  const pgp = pgPromise()
  const columns = [
    { cast: 'bigint', cnd: true, name: 'id' },
    { cast: 'jsonb', name: 'target' },
  ]
  const options = { table: { schema: 'public', table: 'activity_log' } }
  const cs = new pgp.helpers.ColumnSet(columns, options)

  const query = `${pgp.helpers.update(updates, cs)}
      where v.id = t.id
        and t.message = 'originalDataPointRemove'
        and (t.target is null or jsonb_typeof(t.target) = 'null')`
  await client.query(query)

  await recreateCountryActivityLogViews(client)
}
