import React from 'react'

import ckEditorConfig from '../../ckEditor/ckEditorConfig'

class CommentsEditor extends React.Component {

  constructor (props) {
    super(props)
    this.state = { open: false }
  }

  initCKeditor () {
    if (this.props.match.params.odpId) {
      this.descriptionEditor.setData(
        this.props.odp.description,
        { callback: () => this.initCkeditorChangeListener() })
    } else {
      this.initCkeditorChangeListener()
    }
  }

  initCkeditorChangeListener () {
    this.descriptionEditor.on('change', (evt) => {
        this.props.saveDraft(
          this.props.match.params.countryIso,
          { ...this.props.odp, description: evt.editor.getData() })
      }
    )
  }

  componentWillUnmount () {
    this.descriptionEditor.destroy(false)
    this.descriptionEditor = null
  }

  componentDidMount () {
    this.descriptionEditor = CKEDITOR.replace(this.refs.originalDataPointDescription, ckEditorConfig)
    // We need to fetch the data only after CKEDITOR instance is ready :(
    // Otherwise there is no guarantee that the setData()-method succeeds in
    // setting pre-existing html-content
    this.descriptionEditor.on('instanceReady', () => this.initCKeditor())
  }

  componentDidUpdate () {
    if (this.state.open && this.state.shouldStealFocus) {
      this.descriptionEditor.focus()
      this.setState({ ...this.state, shouldStealFocus: false })
    }
  }

  render () {
    return <div>
      <div className="fra-description__header-row">
        <h3 className="subhead fra-description__header">{this.props.title}</h3>
        <div className="fra-description__link" onClick={e => {
          this.state.open
            ? this.setState({ open: false })
            : this.setState({ open: true, shouldStealFocus: true })
          e.stopPropagation()
        }
        }>
          {this.state.open ? this.props.i18n.t('description.done') : this.props.i18n.t('description.edit')}
        </div>
      </div>
      <div className="cke_wrapper" style={{ display: this.state.open ? 'block' : 'none' }}>
        <textarea ref="originalDataPointDescription"/>
      </div>
      {
        this.props.odp.description
          ? <div className="fra-description__preview" style={{ display: this.state.open ? 'none' : 'block' }}
                 dangerouslySetInnerHTML={{ __html: this.props.odp.description }}/>
          : null
      }

    </div>
  }

}

export default CommentsEditor
