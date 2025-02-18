import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'

import { CommentableDescriptionName } from 'meta/assessment'

interface Props {
  descriptionA: string
  descriptionB: string
  name: CommentableDescriptionName
}

type Returned = Array<Change>

// TODO: Rename to useChangesHTML
// TODO: Add support for JSON/DataSource type
const useChanges = (props: Props): Returned => {
  const { descriptionA, descriptionB, name } = props

  return useMemo<Returned>(() => {
    if (name === CommentableDescriptionName.generalComments) return []

    const getTextContent = (html: string): string => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      return doc.body.textContent || ''
    }

    const textA = getTextContent(descriptionA)
    const textB = getTextContent(descriptionB)

    const changes = Diff.diffLines(textA, textB, {
      ignoreCase: false,
    })

    return changes
  }, [descriptionA, descriptionB, name])
}

export default useChanges
