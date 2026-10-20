import type { Response } from 'k6/http'

export const Requests = {
  isOk: (response: Response): boolean => response.status === 200,
}
