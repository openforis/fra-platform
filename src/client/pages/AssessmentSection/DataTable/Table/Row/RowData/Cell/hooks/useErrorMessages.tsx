import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { TFunction, useTranslation } from 'react-i18next'

import { NodeValue, NodeValueValidationMessageParam } from 'meta/assessment'

type Props = {
  nodeValue: NodeValue
}

const translateErrorMessageParams = (t: TFunction, text: NodeValueValidationMessageParam): string => {
  if (Array.isArray(text)) {
    return `(${text.map((item) => translateErrorMessageParams(t, item)).join(', ')})`
  }
  return t(String(text))
}

export default (props: Props): string => {
  const { nodeValue } = props

  const { t } = useTranslation()

  const dataValidationMessages = nodeValue?.validation?.messages?.map(({ key, params }) =>
    t(key, params && Object.fromEntries(Object.entries(params).map(([k, v]) => [k, translateErrorMessageParams(t, v)])))
  )

  return dataValidationMessages?.length > 0
    ? ReactDOMServer.renderToStaticMarkup(
        <ul>
          {dataValidationMessages.map((dataValidationMessage) => (
            <li key="data-validation-message">{dataValidationMessage}</li>
          ))}
        </ul>
      )
    : null
}
