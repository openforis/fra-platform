import { Objects } from 'utils/objects'

import { Failure } from './types'

const _getErrorMessage = (error: unknown): string => (error instanceof Error ? error.message : String(error))

const throwIfFailed = (toolName: string, failures: Array<Failure>): void => {
  if (Objects.isEmpty(failures)) return

  const summary = failures
    .map(({ assessmentName, countryIso, cycleName, error }) => {
      return `- ${assessmentName}/${cycleName}/${countryIso}: ${_getErrorMessage(error)}`
    })
    .join('\n')

  throw new Error(`${toolName} failed for ${failures.length} countries:\n${summary}`)
}

export const Failures = {
  throwIfFailed,
}
