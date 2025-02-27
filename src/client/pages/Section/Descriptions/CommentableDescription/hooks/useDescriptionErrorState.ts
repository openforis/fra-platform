import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useCommentableDescriptionValue } from 'client/store/data'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
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
  const { print } = useIsPrintRoute()

  const value = useCommentableDescriptionValue({ name, sectionName })

  return useMemo<Returned>(() => {
    if (print) return { empty: false }
    const empty = Objects.isEmpty(DOMs.parseDOMValue(value.text))

    return { empty }
  }, [print, value.text])
}
