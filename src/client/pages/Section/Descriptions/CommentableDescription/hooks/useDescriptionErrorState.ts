import { useMemo } from 'react'

import { Parser } from 'htmlparser2'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { useCommentableDescriptionValue } from 'client/store/data'

const isHTMLEmpty = (html: string): boolean => {
  if (!html) return true

  let hasVisibleText = false
  const parser = new Parser(
    {
      ontext(text) {
        // Stop parsing as soon as a non-whitespace character is found
        if (/\S/.test(text)) {
          hasVisibleText = true
          parser.pause()
        }
      },
    },
    { decodeEntities: true }
  )

  parser.write(html)
  parser.end()

  return !hasVisibleText
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
