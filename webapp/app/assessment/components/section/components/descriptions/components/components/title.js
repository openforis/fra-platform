import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'

const Title = props => {
  const { error, title, i18n } = props
  return (
    <h3 className={`subhead fra-description__header${error ? ' icon-red' : ''}`}>
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

Title.propTypes = {
  error: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
}

export default Title
