import './Links.scss'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { AssessmentFiles } from 'meta/cycleData'
import { Authorizer, Users } from 'meta/user'

import { useCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import {
  useAssessmentFiles,
  useDeleteAssessmentFile,
  useGetAssessmentFiles,
  useUploadAssessmentFile,
} from 'client/store/ui/assessmentFiles'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

const Links: React.FC = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()
  const country = useCountry(countryIso)
  const { t } = useTranslation()
  const assessmentFiles = useAssessmentFiles()
  const user = useUser()

  const countryFileRef = useRef<HTMLInputElement>(null)
  const globalFileRef = useRef<HTMLInputElement>(null)

  const countryFiles = assessmentFiles[countryIso] || []
  const globalFiles = assessmentFiles.globals

  const isAdmin = Users.isAdministrator(user)

  const isAllowedToEdit = Authorizer.canEditAssessmentFile({ user, country, cycle })

  const uploadAssessmentFile = useUploadAssessmentFile()
  const deleteAssessmentFile = useDeleteAssessmentFile()
  useGetAssessmentFiles()

  const params = new URLSearchParams({ assessmentName, cycleName, countryIso })
  const links = [
    {
      href: 'https://unfccc.int/process/parties-non-party-stakeholders/parties/national-focal-point',
      key: 'unfcccFocalPoints',
    },
    {
      href: `${ApiEndPoint.File.sdgFocalPoints()}?${params}`,
      key: 'sdgFocalPoints',
    },
    { href: 'https://slms4redd.org/', key: 'reddPortal' },
    { href: 'https://geofra.users.earthengine.app/view/geofra-dev', key: 'fraGeoSpatialTools' },
  ]

  return (
    <div className="landing__page-container">
      <div className="landing__page-container-header landing__repository-header">
        <h3>{t('landing.links.links')}</h3>

        {isAdmin && (
          <>
            <input
              ref={globalFileRef}
              type="file"
              style={{ display: 'none' }}
              onChange={() =>
                uploadAssessmentFile({
                  fileCountryIso: null,
                  file: globalFileRef.current.files[0],
                })
              }
            />
            <button
              className="btn-s btn-primary"
              onClick={() => {
                globalFileRef.current.value = ''
                globalFileRef.current.dispatchEvent(new MouseEvent('click'))
              }}
              type="button"
            >
              <Icon className="icon-sub icon-white" name="hit-up" />
              {t('landing.links.uploadFile')}
            </button>
          </>
        )}
      </div>

      {links.map((link, index) => (
        <div
          key={link.key}
          className={classNames('landing__activity-item', 'withPadding', { withBorder: index !== 0 })}
        >
          <div className="landing__activity">
            <a className="link" href={link.href} rel="noreferrer" target="_blank">
              {t(`landing.links.${link.key}`)}
            </a>
          </div>
        </div>
      ))}

      {globalFiles.map((assessmentFile) => (
        <div key={assessmentFile.uuid} className="landing__activity-item withBorder withPadding">
          <div className="landing__activity">
            <a
              className="link"
              href={AssessmentFiles.getHref({ assessmentName, cycleName, countryIso, uuid: assessmentFile.uuid })}
              target="_blank"
              rel="noreferrer"
            >
              {assessmentFile.fileName}
            </a>
          </div>
          {isAdmin && (
            <div className="landing__activity-time">
              <button
                disabled={assessmentFile.loading}
                type="button"
                className="btn-xs"
                onClick={() =>
                  window.confirm(t('landing.links.confirmDelete', { file: assessmentFile.fileName }))
                    ? deleteAssessmentFile(assessmentFile.uuid)
                    : null
                }
              >
                <Icon className="icon-no-margin" name="trash-simple" />
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="landing__page-container-header landing__repository-header">
        <h3>{t('landing.links.repository')}</h3>

        {isAllowedToEdit && (
          <>
            <input
              ref={countryFileRef}
              type="file"
              style={{ display: 'none' }}
              onChange={() =>
                uploadAssessmentFile({
                  fileCountryIso: countryIso,
                  file: countryFileRef.current.files[0],
                })
              }
            />
            <button
              className="btn-s btn-primary"
              onClick={() => {
                countryFileRef.current.value = ''
                countryFileRef.current.dispatchEvent(new MouseEvent('click'))
              }}
              type="button"
            >
              <Icon className="icon-sub icon-white" name="hit-up" />
              {t('landing.links.uploadFile')}
            </button>
          </>
        )}
      </div>

      {countryFiles.map((assessmentFile, index) => (
        <div
          key={assessmentFile.uuid}
          className={classNames('landing__activity-item', 'withPadding', { withBorder: index !== 0 })}
        >
          <div className="landing__activity">
            <a
              className="link"
              href={AssessmentFiles.getHref({ assessmentName, cycleName, countryIso, uuid: assessmentFile.uuid })}
              target="_blank"
              rel="noreferrer"
            >
              {assessmentFile.fileName}
            </a>
          </div>
          {isAllowedToEdit && (
            <div className="landing__activity-time">
              <button
                disabled={assessmentFile.loading}
                type="button"
                className="btn-xs"
                onClick={() =>
                  window.confirm(t('landing.links.confirmDelete', { file: assessmentFile.fileName }))
                    ? deleteAssessmentFile(assessmentFile.uuid, countryIso)
                    : null
                }
              >
                <Icon className="icon-no-margin" name="trash-simple" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Links
