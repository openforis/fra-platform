import { Objects } from 'utils/objects'

import { UserAuthProvider } from 'meta/user/auth'

import { BaseProtocol, DB } from 'server/db/db'

type Props<P> = {
  provider: Pick<UserAuthProvider<P>, 'userUuid' | 'props' | 'provider'>
}

export const create = async <P>(props: Props<P>, client: BaseProtocol = DB): Promise<UserAuthProvider<P>> => {
  const { provider } = props
  const { props: providerProps, provider: authProvider, userUuid } = provider

  return client.one<UserAuthProvider<P>>(
    `
        insert into public.users_auth_provider (user_uuid, provider, props) values ($1, $2, $3::jsonb) returning *;
    `,
    [userUuid, authProvider, JSON.stringify(providerProps)],
    Objects.camelize
  )
}
