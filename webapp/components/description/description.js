import './description.less'

import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import * as R from 'ramda'

import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'
import ckEditorConfig from '@webapp/components/ckEditor/ckEditorConfig'

import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import * as DescriptionState from '@webapp/components/description/descriptionState'

import { saveDescriptions, fetchDescriptions, openEditor, closeEditor } from './actions'

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
  }, [])

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
    if (content)
      return <div className="fra-description__preview" dangerouslySetInnerHTML={{ __html: content }} />
    if (template)
      return <div className="fra-description__preview" dangerouslySetInnerHTML={{ __html: template }} />
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
      !disabled && <div className="fra-description__link no-print"
        onClick={e => {
          isActive ? dispatch(closeEditor()) : dispatch(openEditor(name))
          e.stopPropagation()
        }}>
        {isActive ? i18n.t('description.done') : i18n.t('description.edit')}
      </div>
    }

    {showEditorContent(isActive, showDash)}
  </div>
}

Description.propTypes = {
  section: PropTypes.string.isRequired
}

const DescriptionEditor = props => {
  const {
    section,
    name,
    template,
    content
  } = props
  const dispatch = useDispatch()

  const textareaRef = useRef(null)
  let editor = useRef(null)

  const countryIso = useCountryIso()

  const initCkeditorChangeListener = () => {
    editor.current.on('change', (evt) =>
      dispatch(saveDescriptions(countryIso, section, name, evt.editor.getData()))
    )
  }

  const setEditorContent = (content) => {
    editor.current.setData(content, {
      callback: () => {
        if (!editor.current.hasListeners('change'))
          initCkeditorChangeListener()
      }
    })
  }

  useEffect(() => {
    editor.current = CKEDITOR.replace(textareaRef.current, ckEditorConfig)
    // Data fetching is necessary when CKEDITOR instances are ready
    editor.current.on('instanceReady', () => {
      setEditorContent(content || template)
    })
    return () => {
      editor.current.destroy(false)
      editor = null
    };
  }, [])

  return <div className="cke_wrapper">
    <textarea id={name} ref={textareaRef} />
  </div>

}

export default Description
