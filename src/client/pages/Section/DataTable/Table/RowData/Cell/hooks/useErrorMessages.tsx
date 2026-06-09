import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { MessageParser } from 'meta/validations/messageParser'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { TooltipProps, TooltipType } from 'client/components/Tooltips/type'

type Props = {
  validation: NodeValueValidation
}

export default (props: Props): TooltipProps | undefined => {
  const { validation } = props

  const { t } = useTranslation()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  const { messages = [], valid } = validation

  if (historyLastApprovedIsActive || valid || messages.length === 0) {
    return undefined
  }

  const content: ReactNode = (
    <ul>
      {messages.map((message) => {
        const { key } = message
        return <li key={key}>{MessageParser.getMessage(t, message)}</li>
      })}
    </ul>
  )

  return { content, type: TooltipType.error }
}
