import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { InvalidLink } from 'meta/assessment/validation/validation'
import { MessageParser } from 'meta/validations/messageParser'
import { Objects } from 'utils/objects'

import { getLinkHref } from 'client/components/EditorWYSIWYG/hooks/_getLinkHref'

type Props = {
  invalidLinks: Array<InvalidLink>
}

type Returned = (anchor: Element | null) => Array<string>

export const useGetErrors = (props: Props): Returned => {
  const { invalidLinks } = props

  const { t } = useTranslation()

  return useCallback<Returned>(
    (anchor) => {
      if (Objects.isNil(anchor)) return []

      const href = getLinkHref(anchor)

      return invalidLinks.reduce<Array<string>>((acc, { link, message }) => {
        if (link === href) acc.push(MessageParser.getMessage(t, message))
        return acc
      }, [])
    },
    [invalidLinks, t]
  )
}
