import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

export interface RequestContext {
  assessment?: Assessment
  cycle?: Cycle
  country?: Country
}

declare module 'express' {
  interface Request {
    context: RequestContext
    user?: User
  }
}
