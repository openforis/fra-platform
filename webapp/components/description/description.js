import './description.less'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as R from 'ramda'

import Icon from '@webapp/components/icon'
import Tooltip from '@webapp/components/tooltip'
import ckEditorConfig from '@webapp/components/ckEditor/ckEditorConfig'

import * as AppState from '@webapp/app/appState'

import { saveDescriptions, fetchDescriptions, openEditor, closeEditor } from './actions'

class Description extends Component {

  fetchData(countryIso) {
    this.props.fetchDescriptions(countryIso, this.props.section, this.props.name)
  }

  componentDidMount() {
    this.fetchData(this.props.countryIso)
  }

  componentDidUpdate(prevProps, prevState) {
    const currentCountryIso = this.props.countryIso
    const previousCountryIso = prevProps.countryIso
    if (currentCountryIso !== previousCountryIso)
      this.props.fetchData(nextCountryIso)
  }

  showEditorContent(isActive, showDash) {
    if (showDash)
      return <div>-</div>
    if (R.isNil(this.props.content))
      return null
    if (isActive)
      return <DescriptionEditor {...this.props} />
    if (this.props.content)
      return <div className="fra-description__preview" dangerouslySetInnerHTML={{ __html: this.props.content }} />
    if (this.props.template)
      return <div className="fra-description__preview" dangerouslySetInnerHTML={{ __html: this.props.template }} />
    return null
  }

  render() {
    const {
      i18n,
      title,
      content,
      editing,
      name,
      closeEditor,
      openEditor,
      disabled,
      showAlertEmptyContent = false,
      showDashEmptyContent = false,
    } = this.props

    const isActive = editing === name
    const showError = showAlertEmptyContent && !content
    const showDash = showDashEmptyContent && !content

    return <div>
      <div className="fra-description__header-row">
          <h3 ref="descriptionHeader"
            className={`subhead fra-description__header${showError ? ' icon-red' : ''}`}
          >
          {
            showError ?
              <Tooltip error text={i18n.t('generalValidation.emptyField')}>
                {title} {showError && <Icon key="icon-error" className="icon-margin-left icon-red" name="alert" />}
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

      </div>
      <div ref="editorContent">
        {this.showEditorContent(isActive, showDash)}
      </div>
    </div>
  }
}

class DescriptionEditor extends Component {

  initCkeditorChangeListener () {
    this.editor.on('change', (evt) =>
      this.props.saveDescriptions(this.props.countryIso, this.props.section, this.props.name, evt.editor.getData())
    )
  }

  setEditorContent (content) {
    this.editor.setData(content, {
      callback: () => {
        if (!this.editor.hasListeners('change'))
          this.initCkeditorChangeListener()
      }
    })
  }

  componentDidMount () {
    const domNode = ReactDOM.findDOMNode(this.refs[this.props.name])
    this.editor = CKEDITOR.replace(domNode, ckEditorConfig)
    // Data fetching is necessary when CKEDITOR instances are ready
    this.editor.on('instanceReady', () => {
      this.setEditorContent(this.props.content || this.props.template)
    })
  }

  componentWillUnmount () {
    this.editor.destroy(false)
    this.editor = null
  }

  render () {
    return <div className="cke_wrapper">
      <textarea id={this.props.name} ref={this.props.name}/>
    </div>
  }
}

Description.propTypes = {
  section: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  i18n: AppState.getI18n(state),
  content: R.pathOr('', ['descriptions', props.section, props.name, 'content'], state),
  editing: R.pathOr(false, ['descriptions', 'editing'], state)
})

export default connect(mapStateToProps, { fetchDescriptions, saveDescriptions, openEditor, closeEditor })(Description)
