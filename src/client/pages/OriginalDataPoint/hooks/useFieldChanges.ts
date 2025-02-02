import { useMemo } from 'react'
import { TFunction, useTranslation } from 'react-i18next'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment'

import { useOriginalDataPointHistory } from 'client/store/ui/originalDataPoint'

type Props = {
  originalDataPoint: OriginalDataPoint
  path: Array<string | number>
}

type Returned = Array<Change>

const _getSourceMethodText = (values: Array<string> | undefined, t: TFunction): string =>
  (values ?? [])?.map((value) => t(`nationalDataPoint.dataSourceMethodsOptions.${value}`)).join('\n\r')

const _getHtmlTextContent = (html: string): string => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html ?? '', 'text/html')
  return doc.body.textContent || ''
}

export const useFieldChanges = (props: Props): Returned => {
  const { originalDataPoint, path } = props

  const { t } = useTranslation()
  const originalDataPointHistory = useOriginalDataPointHistory()

  return useMemo<Returned>(() => {
    const valuePrev = Objects.getInPath(originalDataPointHistory, path)
    const valueCurrent = Objects.getInPath(originalDataPoint, path)

    const isSourceMethods = path.includes('dataSourceMethods')
    if (isSourceMethods) {
      const multipleMethods = valueCurrent?.length > 0

      const methodsPrev = _getSourceMethodText(valuePrev, t)
      const methodsCurrent = _getSourceMethodText(valueCurrent, t)

      return multipleMethods ? Diff.diffLines(methodsPrev, methodsCurrent) : Diff.diffChars(methodsPrev, methodsCurrent)
    }

    const textPrev = _getHtmlTextContent(valuePrev ?? '')
    const textCurrent = _getHtmlTextContent(valueCurrent ?? '')
    return Diff.diffChars(textPrev, textCurrent, {
      ignoreCase: false,
    })
  }, [originalDataPoint, originalDataPointHistory, path, t])
}
