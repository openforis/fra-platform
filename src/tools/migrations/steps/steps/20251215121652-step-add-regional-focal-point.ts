import { RoleName } from 'meta/user/role/name'

import { DB } from 'server/db/db'

export default async (): Promise<void> => {
  await DB.none(`
    ALTER TYPE user_role ADD VALUE '${RoleName.REGIONAL_FOCAL_POINT}';
  `)
}
