import { Objects } from 'utils/objects'

import { Failure } from './types'

const _getErrorMessage = (error: unknown): string => (error instanceof Error ? error.message : String(error))

const throwIfFailed = (toolName: string, failures: Array<Failure>): void => {
  if (Objects.isEmpty(failures)) return

  const summary = failures
    .map<string>(({ assessmentName, countryIso, cycleName, error }) => {
      const scope = Objects.isEmpty(countryIso)
        ? `${assessmentName}/${cycleName}`
        : `${assessmentName}/${cycleName}/${countryIso}`

      return `- ${scope}: ${_getErrorMessage(error)}`
    })
    .join('\n')

  throw new Error(`${toolName} failed with ${failures.length} failures:\n${summary}`)
}

export const Failures = {
  throwIfFailed,
}
