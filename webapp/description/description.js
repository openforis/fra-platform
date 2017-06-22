import React, { Component } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import ckEditorConfig from '../ckEditor/ckEditorConfig'
import { saveDescriptions, fetchDescriptions } from './actions'

class Description extends Component {

  fetchData (countryIso) {
    this.props.fetchDescriptions(countryIso, this.props.field)
  }

  initCkeditorChangeListener () {
    this.editor.on('change', (evt) =>
      this.props.saveDescriptions(this.props.countryIso, this.props.field, evt.editor.getData())
    )
  }

  componentWillReceiveProps (nextProps) {
    if (!R.equals(this.props.countryIso, nextProps.countryIso))
      this.fetchData(nextProps.countryIso)
    else if (nextProps[this.props.field] && nextProps[this.props.field].fetched)
      this.editor.setData(
        nextProps[this.props.field].value
        , {
          callback: () => {
            if (!this.editor.hasListeners('change'))
              this.initCkeditorChangeListener()
          }
        }
      )
  }

  componentDidMount () {
    this.editor = CKEDITOR.replace(document.getElementById(this.props.field), ckEditorConfig)
    // Data fetching is necessary when CKEDITOR instances are ready
    this.editor.on('instanceReady', () => this.fetchData(this.props.countryIso))
  }

  componentWillUnmount () {
    this.editor.destroy(false)
    this.editor = null
  }

  render () {
    return <div>
      <h3 className="subhead nde__description-header">{this.props.title}</h3>
      <textarea id={this.props.field}/>
    </div>
  }
}

const mapStateToProps = state => state.descriptions

export default connect(mapStateToProps, {fetchDescriptions, saveDescriptions})(Description)
