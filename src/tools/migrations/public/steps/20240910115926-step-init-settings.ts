import { DB } from 'server/db'

export default async () => {
  await DB.query(`insert into settings(default_assessment_id) values(null);`)
}
