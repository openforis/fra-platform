import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { useTranslation } from 'react-i18next'

import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { translateValidationMessage } from 'meta/validations/translateValidationMessage'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'

type Props = {
  validation: NodeValueValidation
}

export default (props: Props): string | undefined => {
  const { validation } = props

  const { t } = useTranslation()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  const { messages = [], valid } = validation

  if (historyLastApprovedIsActive || valid || messages.length === 0) {
    return undefined
  }

  return ReactDOMServer.renderToStaticMarkup(
    <ul>
      {messages.map((message) => {
        const { key } = message
        return <li key={key}>{translateValidationMessage(t, message)}</li>
      })}
    </ul>
  )
}
