import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { TFunction, useTranslation } from 'react-i18next'

import { NodeValueValidation, NodeValueValidationMessageParam } from 'meta/assessment'

type Props = {
  validation: NodeValueValidation
}

const translateErrorMessageParams = (t: TFunction, text: NodeValueValidationMessageParam): string => {
  if (Array.isArray(text)) {
    return `(${text.map((item) => translateErrorMessageParams(t, item)).join(', ')})`
  }
  return t(String(text))
}

export default (props: Props): string | undefined => {
  const { validation } = props

  const { t } = useTranslation()

  const { valid, messages = [] } = validation

  if (valid || messages.length === 0) {
    return undefined
  }

  return ReactDOMServer.renderToStaticMarkup(
    <ul>
      {messages?.map(({ key, params }) => {
        const paramsTranslated =
          params && Object.fromEntries(Object.entries(params).map(([k, v]) => [k, translateErrorMessageParams(t, v)]))
        return <li key={key}>{t(key, paramsTranslated)}</li>
      })}
    </ul>
  )
}
