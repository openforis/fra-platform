import React, { Component } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import ckEditorConfig, { isEditorReady } from '../../ckEditor/ckEditorConfig'
import { saveDescriptions, fetchDescriptions } from './actions'

class Description extends Component {

  fetchData (countryIso) {
    this.props.fetchDescriptions(countryIso)
  }

  initCkeditorChangeListener () {
    this.editor.on('change', (evt) => {
      console.log('this.editor change', evt.editor.getData())
      this.props.saveDescriptions(this.props.countryIso, this.props.field, evt.editor.getData())
      // this.props.saveDraft(
      //   this.props.match.params.countryIso,
      //   {...this.props.active, description: evt.editor.getData()})
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log('==== componentWillReceiveProps this.props', this.props)
    console.log('==== componentWillReceiveProps nextProps', nextProps)
    if (!R.equals(this.props.countryIso, nextProps.countryIso))
      this.fetchData(nextProps.match.params.countryIso)
    else if (R.isNil(this.props.eofDescriptions[this.props.field]) && !R.isNil(nextProps.eofDescriptions[this.props.field]))
      this.editor.setData(
        nextProps.eofDescriptions[this.props.field]
        , {
          callback: () => {
            if (!this.editor.hasListeners('change'))
              this.initCkeditorChangeListener()
            console.log('this.editor', this.editor)
            console.log('this.editor', this.editor.hasListeners('change'))

          }
        }
      )

    // ,
    // {callback: () => this.initCkeditorChangeListener()})

    // if (this.props.match.params.odpId && !this.props.active.odpId && props.active.odpId) {
    //   this.descriptionEditor.setData(
    //     props.active.description,
    //     {callback: () => this.initCkeditorChangeListener()})
    // }
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

// const mapStateToProps = state => console.log('state', state) || ({eofDescriptions: state.eofDescriptions})
const mapStateToProps = state => ({eofDescriptions: state.eofDescriptions})

export default connect(mapStateToProps, {fetchDescriptions, saveDescriptions})(Description)
