import { BaseProtocol } from 'server/db/db'

export default async (client: BaseProtocol): Promise<void> => {
  await client.query(`
    create table public.analytics_event (
      id serial primary key,
      session_id text not null,
      event_type text not null,
      payload jsonb not null default '{}'::jsonb,
      created_at timestamp without time zone not null default now()
    );

    create index analytics_event_session_id_idx on public.analytics_event (session_id);
    create index analytics_event_event_type_idx on public.analytics_event (event_type);
  `)
}
