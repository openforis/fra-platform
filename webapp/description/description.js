import './style.less'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import R from 'ramda'

import Icon from '../reusableUiComponents/icon'

import assert from 'assert'
import ckEditorConfig from '../ckEditor/ckEditorConfig'
import { saveDescriptions, fetchDescriptions, openEditor, closeEditor } from './actions'

class Description extends Component {

  fetchData (countryIso) {
    this.props.fetchDescriptions(countryIso, this.props.section, this.props.name)
  }

  componentDidMount () {
    this.fetchData(this.props.countryIso)
  }

  componentWillReceiveProps (nextProps) {
    if (!R.equals(this.props.countryIso, nextProps.countryIso))
      this.fetchData(nextProps.countryIso)
  }

  showEditorContent (isActive) {
    if (R.isNil(this.props.content))
      return null
    if (isActive)
      return <DescriptionEditor {...this.props} />
    if (this.props.content)
      return <div className="fra-description__preview" dangerouslySetInnerHTML={{__html: this.props.content}}/>
    if (this.props.template)
      return <div className="fra-description__preview" dangerouslySetInnerHTML={{__html: this.props.template}}/>
    return null
  }

  render () {
    assert(this.props.section, 'No section given')

    const {
      i18n,
      title,
      content,
      editing,
      name,
      closeEditor,
      openEditor,
      disabled,
      showAlertEmptyContent = false
    } = this.props

    const isActive = editing === name
    const showError = showAlertEmptyContent && !content

    return <div>
      <div className="fra-description__header-row">
        <h3 className={`subhead fra-description__header${showError ? ' icon-red' : ''}`}>
          {title}
          {
            showError
              ? <Icon className="icon-margin-left icon-red" name="alert"/>
              : null
          }
        </h3>
        {
          disabled
            ? null
            : <div className="fra-description__link no-print"
                   onClick={e => {
                     isActive ? closeEditor() : openEditor(name)
                     e.stopPropagation()
                   }}>
              {isActive ? i18n.t('description.done') : i18n.t('description.edit')}
            </div>
        }

      </div>
      <div ref="editorContent">
        {this.showEditorContent(isActive)}
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

const mapStateToProps = (state, props) => {
  return R.pipe(R.defaultTo({}), R.merge({editing: state.descriptions.editing}), R.merge(state.user))(state.descriptions[props.name])
}

export default connect(mapStateToProps, {fetchDescriptions, saveDescriptions, openEditor, closeEditor})(Description)
