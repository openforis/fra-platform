import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'
import { isAdministrator } from '@common/countryRole'
import { isStatusSaving } from '@webapp/app/components/autosave/autosave'
import Icon from '@webapp/components/icon'
import useI18n from '@webapp/hooks/useI18n'
import { UserState } from '@webapp/store/user'
import * as AutosaveState from '@webapp/app/components/autosave/autosaveState'
import { getFilesList, uploadFile, deleteFile } from '@webapp/app/countryLanding/actions'
import { useCountryIso } from '@webapp/hooks'

const links = [
  {
    href: 'http://unfccc.int/parties_observers/parties/national_focal_points/items/9336.php',
    key: 'unfcccFocalPoints',
  },
  { href: '/api/landing/sdgFocalPoints', key: 'sdgFocalPoints' },
  { href: 'http://www.slms4redd.org', key: 'reddPortal' },
  { href: 'https://goo.gl/aYJmzd', key: 'fraGeoSpatialTools' },
]
const LinksView = () => {
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const userInfo = useSelector(UserState.getUserInfo)
  const status = useSelector(AutosaveState.getStatus)
  // TODO use repository state
  const filesList = useSelector(R.pathOr([], ['landing', 'repository', 'filesList']))
  const i18n = useI18n()
  const fileRef = useRef(null)
  const fileGlobalRef = useRef(null)
  useEffect(() => {
    dispatch(getFilesList(countryIso))
  }, [])
  const isAdmin = isAdministrator(userInfo)
  const countryFiles = (filesList as any).filter((f: any) => f.countryIso === countryIso)
  const globalFiles = (filesList as any).filter((f: any) => R.isNil(f.countryIso))
  return (
    <div className="landing__page-container">
      <div className="landing__repository-header">
        <h3>{(i18n as any).t('landing.links.links')}</h3>
        <input
          ref={fileGlobalRef}
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => {
            dispatch(uploadFile(countryIso, fileGlobalRef.current.files[0], true))
          }}
        />
        {isAdmin ? (
          <button
            className="btn-s btn-primary"
            disabled={isStatusSaving(status)}
            onClick={() => {
              // first reset current value, then trigger click event
              fileGlobalRef.current.value = ''
              fileGlobalRef.current.dispatchEvent(new MouseEvent('click'))
            }}
          >
            <Icon className="icon-sub icon-white" name="hit-up" />
            {(i18n as any).t('landing.links.uploadFile')}
          </button>
        ) : null}
      </div>
      {links.map((link) => (
        <div key={link.key} className="landing__link-container">
          <a href={link.href} target="_blank" rel="noreferrer">
            {(i18n as any).t(`landing.links.${link.key}`)}
          </a>
        </div>
      ))}
      {globalFiles.map((file: any, i: any) => (
        <div key={i} className="landing__link-container">
          <a href={`/api/fileRepository/${countryIso}/file/${file.id}`} target="_blank" rel="noreferrer">
            {file.fileName}
          </a>
          {isAdmin ? (
            <button
              className="btn-xs landing__btn-remove-file"
              disabled={isStatusSaving(status)}
              onClick={() =>
                window.confirm((i18n as any).t('landing.links.confirmDelete', { file: file.fileName }))
                  ? dispatch(deleteFile(countryIso, file.id))
                  : null
              }
            >
              <Icon className="icon-no-margin" name="trash-simple" />
            </button>
          ) : null}
        </div>
      ))}

      <div className="landing__repository-header">
        <h3>{(i18n as any).t('landing.links.repository')}</h3>
        <input
          ref={fileRef}
          type="file"
          style={{ display: 'none' }}
          onChange={() => {
            dispatch(uploadFile(countryIso, fileRef.current.files[0]))
          }}
        />
        <button
          className="btn-s btn-primary"
          disabled={isStatusSaving(status)}
          onClick={() => {
            // first reset current value, then trigger click event
            fileRef.current.value = ''
            fileRef.current.dispatchEvent(new MouseEvent('click'))
          }}
        >
          <Icon className="icon-sub icon-white" name="hit-up" />
          {(i18n as any).t('landing.links.uploadFile')}
        </button>
      </div>
      {countryFiles.map((file: any, i: any) => (
        <div key={i} className="landing__link-container">
          <a href={`/api/fileRepository/${countryIso}/file/${file.id}`} target="_blank" rel="noreferrer">
            {file.fileName}
          </a>
          <button
            className="btn-xs landing__btn-remove-file"
            disabled={isStatusSaving(status)}
            onClick={() =>
              window.confirm((i18n as any).t('landing.links.confirmDelete', { file: file.fileName }))
                ? dispatch(deleteFile(countryIso, file.id))
                : null
            }
          >
            <Icon className="icon-no-margin" name="trash-simple" />
          </button>
        </div>
      ))}
    </div>
  )
}
export default LinksView
