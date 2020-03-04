import './description.less'

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import * as R from 'ramda'

import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'

import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import * as DescriptionState from '@webapp/components/description/descriptionState'

import {
  fetchDescriptions,
  openEditor,
  closeEditor
} from '@webapp/components/description/actions'
import DescriptionEditor from './DescriptionEditor'

const Description = props => {
  const {
    title,
    name,
    section,
    template,
    disabled,
    showAlertEmptyContent = false,
    showDashEmptyContent = false,
  } = props

  const editing = useSelector(DescriptionState.getEditing)
  const content = useSelector(DescriptionState.getSectionNameContent(section, name))

  const dispatch = useDispatch()

  const i18n = useI18n()
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()

  useEffect(() => {
    dispatch(fetchDescriptions(countryIso, section, name))
  }, [countryIso])

  const showEditorContent = (isActive, showDash) => {
    if (showDash)
      return <div>-</div>
    if (R.isNil(content))
      return null
    if (isActive)
      return (
        <DescriptionEditor
          section={section}
          name={name}
          template={template}
          content={content}
        />
      )
    const __html = content || template
    if (__html)
      return <div className="fra-description__preview" dangerouslySetInnerHTML={{ __html }} />
    return null
  }

  const isActive = editing === name
  const showError = userInfo && showAlertEmptyContent && !content
  const showDash = showDashEmptyContent && !content

  return <div className="fra-description__header-row">
    <h3 className={`subhead fra-description__header${showError ? ' icon-red' : ''}`}>
      {
        showError ?
          <Tooltip error text={i18n.t('generalValidation.emptyField')}>
            {title} <Icon key="icon-error" className="icon-margin-left icon-red" name="alert" />
          </Tooltip>
          :
          <>{title}</>
      }
    </h3>
    {
      !disabled &&
      <div className="fra-description__link no-print"
        onClick={e => {
          isActive ? dispatch(closeEditor()) : dispatch(openEditor(name))
        }}>
        {isActive ? i18n.t('description.done') : i18n.t('description.edit')}
      </div>
    }

    {showEditorContent(isActive, showDash)}
  </div>
}

Description.defaultProps = {
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

Description.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.string,
  name: PropTypes.string,
  template: PropTypes.string,
  section: PropTypes.string.isRequired,
  showAlertEmptyContent: PropTypes.bool,
  showDashEmptyContent: PropTypes.bool,
}

export default Description
