import { BaseProtocol } from 'server/db/db'

export default async (client: BaseProtocol): Promise<void> => {
  const { labels } = await client.one<{ labels: Array<string> }>(
    `select enum_range(null::public.message_topic_type)::text[] as labels`
  )
  const hasLowercase = labels.includes('messageboard')
  const hasCamelCase = labels.includes('messageBoard')

  if (hasLowercase && !hasCamelCase) {
    await client.query(`alter type public.message_topic_type rename value 'messageboard' to 'messageBoard'`)
  }
}
