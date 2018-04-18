import React from 'react'
import { connect } from 'react-redux'

import { isStatusSaving } from '../../autosave/autosave'
import { getFilesList, uploadFile, deleteFile } from '../actions'

import Icon from '../../reusableUiComponents/icon'

const links = [
  {href: 'http://unfccc.int/parties_observers/parties/national_focal_points/items/9336.php', key: 'unfcccFocalPoints'},
  {href: '/api/landing/sdgFocalPoints', key: 'sdgFocalPoints'},
  {href: 'http://www.slms4redd.org', key: 'reddPortal'},
  {href: 'https://goo.gl/aYJmzd', key: 'fraGeoSpatialTools'}
]

class LinksView extends React.Component {

  componentDidMount () {
    const {getFilesList, match} = this.props
    const countryIso = match.params.countryIso

    getFilesList(countryIso)
  }

  render () {

    const {i18n, match, uploadFile, status, filesList, deleteFile} = this.props
    const countryIso = match.params.countryIso

    return <div className="landing__links-container">

      {/*links*/}
      <div className="landing__page-container-header">
        <h3>{i18n.t('landing.links.links')}</h3>
      </div>
      {
        links.map(link =>
          <div key={link.key} className="landing__link-container">
            <a href={link.href} target="_blank">{i18n.t(`landing.links.${link.key}`)}</a>
          </div>
        )
      }

      {/*repository*/}
      <div className="landing__repository-header">
        <h3>{i18n.t('landing.links.repository')}</h3>
        <input
          ref="file"
          type="file"
          style={{display: 'none'}}
          onChange={e => {
            uploadFile(countryIso, this.refs.file.files[0])
          }}
        />
        <button className="btn-s btn-primary"
                disabled={isStatusSaving(status)}
                onClick={() => {
                  // first reset current value, then trigger click event
                  this.refs.file.value = ''
                  this.refs.file.dispatchEvent(new MouseEvent('click'))
                }}>
          <Icon className="icon-sub icon-white" name="hit-up"/>
          {i18n.t('landing.links.uploadFile')}
        </button>
      </div>
      {
        filesList
          ? filesList.map((file, i) =>
            <div key={i} className="landing__link-container">
              <a href={`/api/fileRepository/${countryIso}/file/${file.id}`} target="_blank">{file.fileName}</a>
              <button className="btn-xs landing__btn-remove-file"
                      disabled={isStatusSaving(status)}
                      onClick={
                        () => window.confirm(i18n.t('landing.links.confirmDelete', {file: file.fileName}))
                          ? deleteFile(countryIso, file.id)
                          : null
                      }>
                <Icon className="icon-no-margin" name="trash-simple"/>
              </button>
            </div>
          )
          : null
      }


    </div>
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  status: state.autoSave.status,
  ...state.landing.repository,
})

export default connect(mapStateToProps, {uploadFile, getFilesList, deleteFile})(LinksView)
