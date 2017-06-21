import React, { Component } from 'react'
import { connect } from 'react-redux'
import ckEditorConfig, { isEditorReady } from '../../ckEditor/ckEditorConfig'

class Description extends Component {

  fetch (countryIso) {
    console.log('==== start fetching data')
  }

  initCkeditorChangeListener () {
    // this.editor.on('change', (evt) => {
    //     this.props.saveDraft(
    //       this.props.match.params.countryIso,
    //       {...this.props.active, description: evt.editor.getData()})
    //   }
    // )
  }

  componentWillReceiveProps (props) {
    // if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
    // this.fetch(next.match.params.countryIso)
    // if (this.props.match.params.odpId && !this.props.active.odpId && props.active.odpId) {
    //   this.descriptionEditor.setData(
    //     props.active.description,
    //     {callback: () => this.initCkeditorChangeListener()})
    // }
  }

  componentDidMount () {
    this.editor = CKEDITOR.replace(document.getElementById(this.props.field), ckEditorConfig)
    // Data fetching is necessary when CKEDITOR instances are ready
    this.editor.on('instanceReady', () => this.fetch())
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

const mapStateToProps = state => state.eofDescriptions

export default connect(mapStateToProps, null)(Description)
