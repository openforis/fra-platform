import { CycleRequest } from 'meta/api/request/cycle'
import { CountryIso } from 'meta/area/countryIso'

export type LoginRequest = CycleRequest<{ countryIso?: CountryIso; invitationUuid?: string }>
