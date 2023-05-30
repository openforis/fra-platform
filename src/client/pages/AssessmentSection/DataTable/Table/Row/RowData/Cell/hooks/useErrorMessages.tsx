import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { useTranslation } from 'react-i18next'

import { NodeValue } from '@meta/assessment'

type Props = {
  nodeValue: NodeValue
}

export default (props: Props): string => {
  const { nodeValue } = props

  const { t } = useTranslation()

  const dataValidationMessages = nodeValue?.validation?.messages?.map(({ key, params }) => t(key, params)) ?? []

  return dataValidationMessages.length > 0
    ? ReactDOMServer.renderToStaticMarkup(
        <ul>
          {dataValidationMessages.map((dataValidationMessage) => (
            <li key="data-validation-message">{dataValidationMessage}</li>
          ))}
        </ul>
      )
    : null
}
