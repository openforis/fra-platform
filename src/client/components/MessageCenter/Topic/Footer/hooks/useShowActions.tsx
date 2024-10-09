import { Areas, AssessmentStatus } from 'meta/area'
import { MessageTopic, MessageTopicStatus, MessageTopicType } from 'meta/messageCenter'
import { Users } from 'meta/user'

import { useCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

export const useShowActions = (topic: MessageTopic) => {
  const cycle = useCycle()
  const user = useUser()
  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const status = Areas.getStatus(country)

  const isAdmin = Users.isAdministrator(user)
  const isReviewer = Users.isReviewer(user, countryIso, cycle)

  const isEditing = status === AssessmentStatus.editing
  const isReview = topic.type === MessageTopicType.review
  const isOpened = topic.status === MessageTopicStatus.opened
  const isResolved = topic.status === MessageTopicStatus.resolved
  const hasMessages = topic.messages?.length > 0

  const canResolve = isEditing && isReview && isOpened && hasMessages && (isAdmin || isReviewer)

  const canPostMessage = (!isReview || isEditing) && (isOpened || (isResolved && (isAdmin || isReviewer)))

  return { canResolve, canPostMessage }
}
