import React from 'react'

import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'

type OwnProps = {
  error?: boolean
  title: string
  i18n: any
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Title.defaultProps

// @ts-expect-error ts-migrate(7022) FIXME: 'Title' implicitly has type 'any' because it does ... Remove this comment to see the full error message
const Title = (props: Props) => {
  const { error, title, i18n } = props

  let titleClassName = 'subhead fra-description__header'
  if (error) titleClassName += ' icon-red'

  return (
    <h3 className={titleClassName}>
      {error ? (
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any[]; error: true; text: any; }... Remove this comment to see the full error message
        <Tooltip error text={i18n.t('generalValidation.emptyField')}>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: string; className: string; name: stri... Remove this comment to see the full error message */}
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
