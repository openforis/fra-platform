import './LastStatus.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Link as LinkType, LinkValidationStatusCode } from 'meta/cycleData'

type Props = {
  link: LinkType
}

const LastStatus: React.FC<Props> = (props) => {
  const { link } = props
  const { t } = useTranslation()
  const code = link.visits?.at(-1).code

  let label = ''
  if ([LinkValidationStatusCode.success, LinkValidationStatusCode.empty].includes(code)) {
    label = t(`common.${code}`)
  } else {
    label = t(`admin.${code}`)
  }

  return <span className={classNames('last-status', code)}>{label}</span>
}
export default LastStatus
