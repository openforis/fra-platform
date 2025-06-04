import { Areas, CountryStatus } from 'meta/area'
import { MessageTopic, MessageTopicStatus, MessageTopicType } from 'meta/messageCenter'
import { Users } from 'meta/user'

import { useCountry } from 'client/store/area/hooks/country'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryIso } from 'client/hooks'

export const useShowActions = (topic: MessageTopic) => {
  const cycle = useCycle()
  const user = useUser()
  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const status = Areas.getStatus(country)

  const isAdmin = Users.isAdministrator(user)
  const isReviewer = Users.isReviewer(user, countryIso, cycle)

  const isNotStarted = status === CountryStatus.notStarted
  const isEditing = status === CountryStatus.editing
  const isReview = topic.type === MessageTopicType.review
  const isOpened = topic.status === MessageTopicStatus.opened
  const isResolved = topic.status === MessageTopicStatus.resolved
  const hasMessages = topic.messages?.length > 0

  const canResolve = (isNotStarted || isEditing) && isReview && isOpened && hasMessages && (isAdmin || isReviewer)

  const canPostMessage =
    (!isReview || isEditing || isNotStarted) && (isOpened || (isResolved && (isAdmin || isReviewer)))

  return { canResolve, canPostMessage }
}
