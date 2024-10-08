import { useMemo } from 'react'

import { Dates } from 'utils/dates'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useFilename = (filename: string): string => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  return useMemo(() => {
    const date = Dates.getCurrentDateISOString()
    return `${assessmentName}-${cycleName}-${filename}-${date}.csv`
  }, [assessmentName, cycleName, filename])
}
