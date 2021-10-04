import React from 'react'
import classNames from 'classnames'

import { useI18n } from '@webapp/hooks'

import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'

type Props = {
  error?: boolean
  title: string
}

const Title: React.FC<Props> = (props) => {
  const { error, title } = props

  const i18n = useI18n()

  return (
    <h3 className={classNames('subhead', 'fra-description__header', { 'icon-red': error })}>
      {error ? (
        <Tooltip error text={i18n.t('generalValidation.emptyField')}>
          {title} <Icon key="icon-error" className="icon-margin-left icon-red" name="alert" />
        </Tooltip>
      ) : (
        <>{title}</>
      )}
    </h3>
  )
}

Title.defaultProps = {
  error: false,
}

export default Title
