import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useCommentableDescriptionValue } from 'client/store/data'
import { DOMs } from 'client/utils/dom'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
}

type Returned = {
  empty: boolean
}

export const useDescriptionErrorState = (props: Props): Returned => {
  const { name, sectionName } = props

  const value = useCommentableDescriptionValue({ name, sectionName })

  return useMemo<Returned>(() => {
    const empty = Objects.isEmpty(DOMs.parseDOMValue(value.text))

    return { empty }
  }, [value.text])
}
