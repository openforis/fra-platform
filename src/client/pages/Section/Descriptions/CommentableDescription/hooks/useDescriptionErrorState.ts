import { useMemo } from 'react'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { useCommentableDescriptionValue } from 'client/store/data/descriptions/hooks/descriptions'
import { DOMs } from 'client/utils/doms'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
}

type Returned = {
  empty: boolean
}

/*
    Note: Return value of the hook is used only in print view
*/
export const useDescriptionErrorState = (props: Props): Returned => {
  const { name, sectionName } = props
  const value = useCommentableDescriptionValue({ name, sectionName })

  return useMemo<Returned>(() => {
    return { empty: DOMs.isHTMLEmpty(value.text) }
  }, [value.text])
}
