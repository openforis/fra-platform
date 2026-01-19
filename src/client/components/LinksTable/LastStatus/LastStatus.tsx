import './LastStatus.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { Link as LinkType } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'

type Props = {
  link: LinkType
}

const LastStatus: React.FC<Props> = (props) => {
  const { link } = props
  const { t } = useTranslation()
  const code = link.visits?.at(-1).code

  const labelKey = Links.getI18nValidationStatusLabelKey(code)

  return <span className={classNames('last-status', code)}>{t(labelKey)}</span>
}

export default LastStatus
