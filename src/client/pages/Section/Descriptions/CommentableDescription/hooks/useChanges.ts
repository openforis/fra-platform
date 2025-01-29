import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'

interface Props {
  descriptionA: string
  descriptionB: string
}

type Returned = Array<Change>

// TODO: Rename to useChangesHTML
// TODO: Add support for JSON/DataSource type
const useChanges = (props: Props): Returned => {
  const { descriptionA, descriptionB } = props

  return useMemo<Returned>(() => {
    const getTextContent = (html: string): string => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      return doc.body.textContent || ''
    }

    const textA = getTextContent(descriptionA)
    const textB = getTextContent(descriptionB)

    const changes = Diff.diffWords(textA, textB, {
      ignoreCase: false,
    })

    return changes
  }, [descriptionA, descriptionB])
}

export default useChanges
