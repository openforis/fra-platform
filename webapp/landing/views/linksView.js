import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import { isAdministrator } from '@common/countryRole'

import { isStatusSaving } from '../../autosave/autosave'
import { getFilesList, uploadFile, deleteFile } from '../actions'

import Icon from '@webapp/components/icon'

import * as UserState from '@webapp/user/userState'
import * as AutosaveState from '@webapp/autosave/autosaveState'
import UsersTableFilter from '@webapp/userManagement/list/usersTableFilter'

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

    const {i18n, userInfo, match, uploadFile, status, filesList = [], deleteFile} = this.props
    const countryIso = match.params.countryIso

    const isAdmin = isAdministrator(userInfo)

    const countryFiles = filesList.filter(f => f.countryIso === countryIso)
    const globalFiles = filesList.filter(f => R.isNil(f.countryIso))

    return <div className="landing__page-container">

      {/*links*/}
      <div className="landing__repository-header" style={{marginTop: 0}}>
        <h3>{i18n.t('landing.links.links')}</h3>
        <input
          ref="globalFile"
          type="file"
          style={{display: 'none'}}
          onChange={e => {
            uploadFile(countryIso, this.refs.globalFile.files[0], true)
          }}
        />
        {
          isAdmin
            ? <button className="btn-s btn-primary"
                      disabled={isStatusSaving(status)}
                      onClick={() => {
                        // first reset current value, then trigger click event
                        this.refs.globalFile.value = ''
                        this.refs.globalFile.dispatchEvent(new MouseEvent('click'))
                      }}>
              <Icon className="icon-sub icon-white" name="hit-up"/>
              {i18n.t('landing.links.uploadFile')}
            </button>
            : null
        }
      </div>
      {
        links.map(link =>
          <div key={link.key} className="landing__link-container">
            <a href={link.href} target="_blank">{i18n.t(`landing.links.${link.key}`)}</a>
          </div>
        )
      }
      {
        globalFiles.map((file, i) =>
          <div key={i} className="landing__link-container">
            <a href={`/api/fileRepository/${countryIso}/file/${file.id}`} target="_blank">{file.fileName}</a>
            {
              isAdmin
                ? <button className="btn-xs landing__btn-remove-file"
                          disabled={isStatusSaving(status)}
                          onClick={
                            () => window.confirm(i18n.t('landing.links.confirmDelete', {file: file.fileName}))
                              ? deleteFile(countryIso, file.id)
                              : null
                          }>
                  <Icon className="icon-no-margin" name="trash-simple"/>
                </button>
                : null
            }
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
        countryFiles.map((file, i) =>
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
      }


    </div>
  }
}

const mapStateToProps = state => ({
  i18n: UserState.getI18n(state),
  userInfo: UserState.getUserInfo(state),
  status: AutosaveState.getStatus(state),
  ...state.landing.repository,
})

export default connect(mapStateToProps, {uploadFile, getFilesList, deleteFile})(LinksView)
