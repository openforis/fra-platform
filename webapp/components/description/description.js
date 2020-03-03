import './description.less'

import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as R from 'ramda'

import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'
import ckEditorConfig from '@webapp/components/ckEditor/ckEditorConfig'

import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import * as AppState from '@webapp/app/appState'

import { saveDescriptions, fetchDescriptions, openEditor, closeEditor } from './actions'

const Description = props => {
  const {
    title,
    content,
    editing,
    name,
    closeEditor,
    openEditor,
    disabled,
    showAlertEmptyContent = false,
    showDashEmptyContent = false,
    fetchDescriptions,
    section,
  } = props
  const i18n = useI18n()
  const countryIso = useCountryIso()

  useEffect(() => {
    fetchDescriptions(countryIso, section, name)
  }, [])

  useEffect(() => {
    fetchDescriptions(countryIso, section, name)
  }, [countryIso])

  const showEditorContent = (isActive, showDash) => {
    if (showDash)
      return <div>-</div>
    if (R.isNil(props.content))
      return null
    if (isActive)
      return <DescriptionEditor {...props} />
    if (props.content)
      return <div className="fra-description__preview" dangerouslySetInnerHTML={{ __html: props.content }} />
    if (props.template)
      return <div className="fra-description__preview" dangerouslySetInnerHTML={{ __html: props.template }} />
    return null
  }

  const isActive = editing === name
  const showError = showAlertEmptyContent && !content
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
      !disabled
      && <div className="fra-description__link no-print"
        onClick={e => {
          isActive ? closeEditor() : openEditor(name)
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
    saveDescriptions,
    content
  } = props

  const textareaRef = useRef(null)
  let editor = useRef(null)

  const countryIso = useCountryIso()

  const initCkeditorChangeListener = () => {
    editor.current.on('change', (evt) =>
      saveDescriptions(countryIso, section, name, evt.editor.getData())
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

const mapStateToProps = (state, props) => ({
  i18n: AppState.getI18n(state),
  content: R.pathOr('', ['descriptions', props.section, props.name, 'content'], state),
  editing: R.pathOr(false, ['descriptions', 'editing'], state)
})

export default connect(mapStateToProps, { fetchDescriptions, saveDescriptions, openEditor, closeEditor })(Description)
