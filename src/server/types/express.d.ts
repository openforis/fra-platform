import { Country } from 'meta/area'
import { Assessment } from 'meta/assessment'

export interface RequestContext {
  assessment?: Assessment
  country?: Country
}

declare module 'express' {
  interface Request {
    context: RequestContext
  }
}

export {}
