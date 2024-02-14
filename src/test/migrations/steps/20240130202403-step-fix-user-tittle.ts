import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(`
    UPDATE public.users
    SET props = 
      CASE 
        WHEN props->>'title' = 'Ms' THEN jsonb_set(props, '{title}', '"ms"')
        WHEN props->>'title' = 'Mr' THEN jsonb_set(props, '{title}', '"mr"')
        WHEN props->>'title' = 'Mrs' THEN jsonb_set(props, '{title}', '"mrs"')
        WHEN props->>'title' = 'Other' THEN jsonb_set(props, '{title}', '"other"')
        ELSE props
      END
    WHERE props->>'title' IN ('Ms', 'Mr', 'Mrs', 'Other');
  `)
}
