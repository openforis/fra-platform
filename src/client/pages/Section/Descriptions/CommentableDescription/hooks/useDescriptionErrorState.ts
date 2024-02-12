import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useCommentableDescriptionValue } from 'client/store/data'
import { useUser } from 'client/store/user'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
  showAlertEmptyContent: boolean
}

type Returned = {
  empty: boolean
  error: boolean
}

export const useDescriptionErrorState = (props: Props): Returned => {
  const { name, sectionName, showAlertEmptyContent } = props

  const user = useUser()
  const value = useCommentableDescriptionValue({ name, sectionName })

  return useMemo<Returned>(() => {
    const innerText = new DOMParser()
      .parseFromString(value.text, 'text/html')
      .documentElement.innerText.replaceAll('\n', '')

    const empty = Objects.isEmpty(innerText)
    const error = Boolean(user && showAlertEmptyContent && empty)

    return { empty, error }
  }, [showAlertEmptyContent, user, value.text])
}
