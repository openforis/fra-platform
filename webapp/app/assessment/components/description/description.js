import './description.less'

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'

import DescriptionEditor from '@webapp/app/assessment/components/description/DescriptionEditor'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import * as DescriptionState from '@webapp/app/assessment/components/description/descriptionState'

import { fetchDescriptions, openEditor, closeEditor } from '@webapp/app/assessment/components/description/actions'

const Description = props => {
  const { title, name, section, template, disabled, showAlertEmptyContent, showDashEmptyContent } = props

  const editing = useSelector(DescriptionState.getEditing)
  const content = useSelector(DescriptionState.getSectionNameContent(section, name))

  const dispatch = useDispatch()

  const i18n = useI18n()
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()

  useEffect(() => {
    dispatch(fetchDescriptions(countryIso, section, name))
  }, [countryIso, section])

  const isActive = editing === name
  const showError = userInfo && showAlertEmptyContent && !content
  const __html = content || template

  return (
    <div className="fra-description__header-row">
      <h3 className={`subhead fra-description__header${showError ? ' icon-red' : ''}`}>
        {showError ? (
          <Tooltip error text={i18n.t('generalValidation.emptyField')}>
            {title} <Icon key="icon-error" className="icon-margin-left icon-red" name="alert" />
          </Tooltip>
        ) : (
          <>{title}</>
        )}
      </h3>
      {!disabled && (
        <div
          role="button"
          aria-label=""
          tabIndex={0}
          className="fra-description__link no-print"
          onClick={() => {
            if (isActive) {
              dispatch(closeEditor())
            } else {
              dispatch(openEditor(name))
            }
          }}
          onKeyDown={() => {}}
        >
          {isActive ? i18n.t('description.done') : i18n.t('description.edit')}
        </div>
      )}

      {isActive && <DescriptionEditor section={section} name={name} template={template} content={content} />}

      {!isActive && __html && <div className="fra-description__preview" dangerouslySetInnerHTML={{ __html }} />}

      {!isActive && !__html && showDashEmptyContent && <div>-</div>}
    </div>
  )
}

Description.defaultProps = {
  template: null,
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

Description.propTypes = {
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  template: PropTypes.string,
  section: PropTypes.string.isRequired,
  showAlertEmptyContent: PropTypes.bool,
  showDashEmptyContent: PropTypes.bool,
}

export default Description
