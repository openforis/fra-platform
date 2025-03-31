import { BaseProtocol, DB } from 'server/db'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

export default async () => {
  let checkViews = await client.query(`select schemaname, viewname from pg_views where viewname like '%____with_odp';`)
  Logger.debug(JSON.stringify(checkViews, null, 2))
  await client.query(`
    drop view if exists assessment_fra_2020.extentofforest____with_odp;
    drop view if exists assessment_fra_2020.forestcharacteristics____with_odp;
    drop view if exists assessment_fra_2025.extentofforest____with_odp;
    drop view if exists assessment_fra_2025.forestcharacteristics____with_odp;
  `)
  checkViews = await client.query(`select schemaname, viewname from pg_views where viewname like '%____with_odp';`)
  Logger.debug(JSON.stringify(checkViews, null, 2))
}
