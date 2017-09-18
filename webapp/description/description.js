import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import R from 'ramda'
import ckEditorConfig from '../ckEditor/ckEditorConfig'
import { saveDescriptions, fetchDescriptions, openEditor, closeEditor } from './actions'

class Description extends Component {

  fetchData (countryIso) {
    this.props.fetchDescriptions(countryIso, this.props.name)
  }

  componentDidMount () {
      this.fetchData(this.props.countryIso)
  }

  componentWillReceiveProps(nextProps) {
    if (!R.equals(this.props.countryIso, nextProps.countryIso))
      this.fetchData(nextProps.countryIso)
  }

  render() {
    const content = this.props.content || this.props.i18n.t('description.emptyLabel')
    const isActive = this.props.editing === this.props.name
    return <div>
      <div className="commentable-description__header-row">
        <h3 className="subhead commentable-description__header">{this.props.title}</h3>
        <button className={`btn btn-s ${isActive ? 'btn-primary' : 'btn-secondary'}`} onClick={
          e => {
            isActive ? this.props.closeEditor() : this.props.openEditor(this.props.name)
            e.stopPropagation()
          }
        }>{ isActive ? this.props.i18n.t('description.done') : this.props.i18n.t('description.edit')}
        </button>
      </div>
      <div ref="editorContent">
      { R.isNil(this.props.content) ?
        <div className="commentable-description__loading">{this.props.i18n.t('description.loading')}</div> :
        isActive ?
        <DescriptionEditor {...this.props} /> : <div className="commentable-description__preview"
                                                     dangerouslySetInnerHTML={{__html: content}}/>
      }
      </div>
    </div>
  }
}

class DescriptionEditor extends Component {

  initCkeditorChangeListener () {
    this.editor.on('change', (evt) =>
      this.props.saveDescriptions(this.props.countryIso, this.props.name, evt.editor.getData())
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
      console.log('setting content', this.props)
        this.setEditorContent(this.props.content || this.props.template)
    })
  }

  componentWillUnmount () {
    this.editor.destroy(false)
    this.editor = null
  }

  render () {
    return <div className={this.props.classes || ''}>
      <div className="cke_wrapper">
        <textarea id={this.props.name} ref={this.props.name}/>
      </div>
    </div>
  }
}

const mapStateToProps = (state, props) => {
  return R.pipe(R.defaultTo({}), R.merge({editing: state.descriptions.editing}), R.merge(state.user))(state.descriptions[props.name])
}

export default connect(mapStateToProps, {fetchDescriptions, saveDescriptions, openEditor, closeEditor})(Description)
