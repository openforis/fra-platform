import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { InvalidLink } from 'meta/assessment/validation/validation'
import { MessageParser } from 'meta/validations/messageParser'
import { Objects } from 'utils/objects'

import { getLinkHref } from 'client/components/EditorWYSIWYG/hooks/_getLinkHref'

type Props = {
  invalidLinks: Array<InvalidLink>
}

type Returned = (anchor: Element | null) => string | undefined

export const useGetError = (props: Props): Returned => {
  const { invalidLinks } = props

  const { t } = useTranslation()

  return useCallback<Returned>(
    (anchor) => {
      if (Objects.isNil(anchor)) return undefined

      const href = getLinkHref(anchor)
      const invalidLink = invalidLinks.find(({ link }) => link === href)
      if (Objects.isNil(invalidLink)) return undefined

      const { message } = invalidLink
      if (!Objects.isEmpty(href)) return MessageParser.getMessage(t, message)

      // Links without a URL share one error, so it's shown with the text of the hovered link
      const params = { ...message.params, link: anchor.textContent ?? '' }
      return MessageParser.getMessage(t, { ...message, params })
    },
    [invalidLinks, t]
  )
}
