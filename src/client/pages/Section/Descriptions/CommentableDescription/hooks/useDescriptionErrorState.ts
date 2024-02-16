import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useCommentableDescriptionValue } from 'client/store/data'

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
    const innerText = new DOMParser()
      .parseFromString(value.text, 'text/html')
      .documentElement.innerText.replaceAll('\n', '')

    const empty = Objects.isEmpty(innerText)

    return { empty }
  }, [value.text])
}
