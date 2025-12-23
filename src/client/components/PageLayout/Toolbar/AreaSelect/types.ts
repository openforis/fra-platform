import { Country } from 'meta/area/country'
import { RoleName } from 'meta/user/role/name'

import { Option, OptionsGroup } from 'client/components/Inputs/Select'

export type OptionArea = Option & { country?: Country }
export type OptionsGroupArea = OptionsGroup & { order: number; roleName?: RoleName }
