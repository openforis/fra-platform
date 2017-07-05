import React, { Component } from 'react'
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

  componentWillReceiveProps (nextProps) {
    if (!R.equals(this.props.countryIso, nextProps.countryIso))
      this.fetchData(nextProps.countryIso)
    else if (nextProps[this.props.name] && nextProps[this.props.name].fetched)
      this.editor.setData(
        nextProps[this.props.name].content
        , {
          callback: () => {
            if (!this.editor.hasListeners('change'))
              this.initCkeditorChangeListener()
          }
        }
      )
  }

  componentDidMount () {
    this.editor = CKEDITOR.replace(document.getElementById(this.props.name), ckEditorConfig)
    // Data fetching is necessary when CKEDITOR instances are ready
    this.editor.on('instanceReady', () => this.fetchData(this.props.countryIso))
  }

  componentWillUnmount () {
    this.editor.destroy(false)
    this.editor = null
  }

  render () {
    return <div className={this.props.classes || ''}>
      <h3 className="subhead nde__description-header">{this.props.title}</h3>
      <div className="cke_wrapper">
        <textarea id={this.props.name}/>
      </div>
    </div>
  }
}

const mapStateToProps = state => state.descriptions

export default connect(mapStateToProps, {fetchDescriptions, saveDescriptions})(Description)
