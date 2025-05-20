import { useCallback } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useLanguage } from 'client/hooks/useLanguage'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  anchor?: string
  document: string
}

type Returned = () => void

export const useOpenDefinition = (props: Props): Returned => {
  const { anchor, document } = props
  const language = useLanguage()
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useCallback(() => {
    const url = `${ApiEndPoint.definitions(language, document, assessmentName, cycleName)}${anchor ? `#${anchor}` : ''}`
    window.open(url, document, 'height=640,width=360')
  }, [anchor, assessmentName, cycleName, document, language])
}

export default useOpenDefinition
