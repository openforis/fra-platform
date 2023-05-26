import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { TooltipId } from '@meta/tooltip'

import Icon from '@client/components/Icon'

type Props = {
  error?: boolean
  title: string
}

const Title: React.FC<Props> = (props) => {
  const { error, title } = props

  const { t } = useTranslation()

  return (
    <h3
      className={classNames('subhead', 'fra-description__header', { 'icon-red': error })}
      data-tooltip-id={TooltipId.dataError}
      data-tooltip-content={error ? t('generalValidation.emptyField') : null}
    >
      <span>
        {title}

        {error && <Icon key="icon-error" className="icon-margin-left icon-red" name="alert" />}
      </span>
    </h3>
  )
}

Title.defaultProps = {
  error: false,
}

export default Title
