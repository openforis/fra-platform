import { CycleRouteParams } from 'meta/routes/routeParams/cycle'

export type ChangePasswordRouteParams = CycleRouteParams & {
  resetPasswordUuid: string
}
