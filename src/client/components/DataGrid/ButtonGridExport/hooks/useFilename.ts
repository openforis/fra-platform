import { useMemo } from 'react'

import { Dates } from 'utils/dates'

import { useCycleRouteParams } from 'client/hooks/routeParams'

type Props = {
  filename: string
  extension: 'csv' | 'xlsx'
}

export const useFilename = (props: Props): string => {
  const { extension, filename } = props
  const { assessmentName, cycleName } = useCycleRouteParams()
  return useMemo(() => {
    const date = Dates.format(new Date(), 'yyyy-MM-dd')
    return `${assessmentName}-${cycleName}-${filename}-${date}.${extension}`
  }, [assessmentName, cycleName, extension, filename])
}
