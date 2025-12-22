import { RoleName } from 'meta/user/role/name'

import { OptionsGroup } from 'client/components/Inputs/Select'

export type OptionsGroupArea = OptionsGroup & { order: number; roleName?: RoleName }
