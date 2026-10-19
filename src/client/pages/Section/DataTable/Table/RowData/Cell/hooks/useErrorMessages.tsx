import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'

import { NodeValueValidation, NodeValueValidationMessageParam } from 'meta/assessment/nodeValueValidation'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { TooltipProps, TooltipType } from 'client/components/Tooltips/type'

type Props = {
  validation: NodeValueValidation
}

const translateErrorMessageParams = (t: TFunction, text: NodeValueValidationMessageParam): string => {
  if (Array.isArray(text)) {
    return `(${text.map((item) => translateErrorMessageParams(t, item)).join(', ')})`
  }
  return t(String(text))
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
      {messages.map(({ key, params }) => {
        const paramsTranslated =
          params && Object.fromEntries(Object.entries(params).map(([k, v]) => [k, translateErrorMessageParams(t, v)]))
        return <li key={key}>{t(key, paramsTranslated)}</li>
      })}
    </ul>
  )

  return { content, type: TooltipType.error }
}
