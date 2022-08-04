import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import Icon from '@client/components/Icon'
import Tooltip from '@client/components/Tooltip'

type Props = {
  error?: boolean
  title: string
}

const Title: React.FC<Props> = (props) => {
  const { error, title } = props

  const { i18n } = useTranslation()

  return (
    <h3 className={classNames('subhead', 'fra-description__header', { 'icon-red': error })}>
      {error ? (
        <Tooltip error text={i18n.t<string>('generalValidation.emptyField')}>
          {title} <Icon key="icon-error" className="icon-margin-left icon-red" name="alert" />
        </Tooltip>
      ) : (
        <span>{title}</span>
      )}
    </h3>
  )
}

Title.defaultProps = {
  error: false,
}

export default Title
