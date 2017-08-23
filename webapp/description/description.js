import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import R from 'ramda'
import ckEditorConfig from '../ckEditor/ckEditorConfig'
import { saveDescriptions, fetchDescriptions } from './actions'

class Description extends Component {

  fetchData (countryIso) {
    this.props.fetchDescriptions(countryIso, this.props.name)
  }

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

  componentWillReceiveProps (nextProps) {
    if (!R.equals(this.props.countryIso, nextProps.countryIso))
      this.fetchData(nextProps.countryIso)
    else if (nextProps.fetched && R.not(R.equals(this.props.content, nextProps.content)))
      this.setEditorContent(nextProps.content)
  }

  componentDidMount () {
    const domNode = ReactDOM.findDOMNode(this.refs[this.props.name])
    domNode.style.display = 'block'
    domNode.style.visibility = ''
    this.editor = CKEDITOR.replace(domNode, ckEditorConfig)
    // Data fetching is necessary when CKEDITOR instances are ready
    this.editor.on('instanceReady', () => {
      if (this.props.content)
        this.setEditorContent(this.props.content)
      else
        this.fetchData(this.props.countryIso)
    })
  }

  componentWillUnmount () {
    this.editor.destroy(false)
    this.editor = null
  }

  render () {
    return <div className={this.props.classes || ''}>
      <h3 className="subhead nde__description-header">{this.props.title}</h3>
      <div className="cke_wrapper">
        <textarea id={this.props.name} ref={this.props.name}/>
      </div>
    </div>
  }
}

const mapStateToProps = (state, props) => {
  return R.defaultTo({}, state.descriptions[props.name])
}

export default connect(mapStateToProps, {fetchDescriptions, saveDescriptions})(Description)
