import { Country } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

export interface RequestContext {
  assessment?: Assessment
  cycle?: Cycle
  country?: Country
}

declare module 'express' {
  interface Request {
    context: RequestContext
  }
}

// export {}
