import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  eventType: string
  payload: Record<string, unknown>
  sessionId: string
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { eventType, payload, sessionId } = props

  await client.none(
    `
        insert into public.analytics_event (session_id, event_type, payload)
        values ($(sessionId), $(eventType), $(payload)::jsonb)`,
    { sessionId, eventType, payload: JSON.stringify(payload) }
  )
}
