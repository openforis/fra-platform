import { initContext } from 'server/middleware/apiContext/initContext'
import { validateQueryParams } from 'server/middleware/apiContext/validateQueryParams'

export const ApiContextMiddleware = {
  initContext,
  validateQueryParams,
}
