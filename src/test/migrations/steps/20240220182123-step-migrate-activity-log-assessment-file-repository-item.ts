import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(
    `update public.activity_log set message = replace(message, 'assessmentFile', 'repositoryItem') where message like '%assessmentFile%';`
  )
}
