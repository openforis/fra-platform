import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CommentableDescriptionValue } from 'meta/assessment'

import { useUser } from 'client/store/user'

type Props = {
  showAlertEmptyContent: boolean
  value: CommentableDescriptionValue
}

type Returned = {
  empty: boolean
  error: boolean
}

export const useDescriptionErrorState = (props: Props): Returned => {
  const { showAlertEmptyContent, value } = props

  const user = useUser()

  return useMemo<Returned>(() => {
    const { innerText } = new DOMParser().parseFromString(value.text, 'text/html').documentElement

    const empty = Objects.isEmpty(innerText)
    const error = Boolean(user && showAlertEmptyContent && empty)

    return { empty, error }
  }, [showAlertEmptyContent, user, value.text])
}
