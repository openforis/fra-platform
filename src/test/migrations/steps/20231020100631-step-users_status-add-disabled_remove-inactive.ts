import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(`
    ALTER TYPE public.users_status RENAME TO users_status_old;
    CREATE TYPE public.users_status AS ENUM ('invitationPending', 'active', 'disabled');
    ALTER TABLE public.users ALTER COLUMN status DROP DEFAULT;
    ALTER TABLE public.users ALTER COLUMN status TYPE public.users_status USING status::text::public.users_status;
    ALTER TABLE public.users ALTER COLUMN status SET DEFAULT 'invitationPending';
    DROP TYPE public.users_status_old;
  `)
}
