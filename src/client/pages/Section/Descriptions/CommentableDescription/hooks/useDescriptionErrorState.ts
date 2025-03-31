import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { useCommentableDescriptionValue } from 'client/store/data'

const isHTMLEmpty = (html: string): boolean => {
  if (Objects.isEmpty(html?.trim())) return true

  const strippedHtml = html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()

  return !strippedHtml
}

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
    return { empty: isHTMLEmpty(value.text) }
  }, [value.text])
}
