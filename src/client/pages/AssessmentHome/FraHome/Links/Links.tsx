import './Links.scss'
import React, { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CountryIso } from '@meta/area'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { AssessmentFilesActions } from '@client/store/ui/assessmentFiles'
import { useAssessmentFiles } from '@client/store/ui/assessmentFiles/hooks'
import { useCountryIso } from '@client/hooks'
import { useToaster } from '@client/hooks/useToaster'
import Icon from '@client/components/Icon'

const links = [
  {
    href: 'http://unfccc.int/parties_observers/parties/national_focal_points/items/9336.php',
    key: 'unfcccFocalPoints',
  },
  { href: '/api/landing/sdgFocalPoints', key: 'sdgFocalPoints' },
  { href: 'http://www.slms4redd.org', key: 'reddPortal' },
  { href: 'https://goo.gl/aYJmzd', key: 'fraGeoSpatialTools' },
]

const Links: React.FC = () => {
  const dispatch = useAppDispatch()
  const { toaster } = useToaster()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const i18n = useTranslation()
  const assessmentFiles = useAssessmentFiles()

  const countryFileRef = useRef<HTMLInputElement>(null)

  const countryFiles = assessmentFiles[countryIso] || []
  const globalFiles = assessmentFiles.globals

  const uploadAssessmentFile = useCallback(
    (countryIso?: CountryIso) => {
      dispatch(
        AssessmentFilesActions.upload({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          countryIso,
          file: countryFileRef?.current?.files[0],
        })
      ).then(() => {
        dispatch(
          AssessmentFilesActions.getFiles({
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
            countryIso,
          })
        )
        toaster.success('')
      })
    },
    [dispatch, assessment.props.name, cycle.name, toaster]
  )

  useEffect(() => {
    dispatch(
      AssessmentFilesActions.getFiles({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countryIso,
      })
    )
  }, [assessment, cycle, countryIso, dispatch])

  return (
    <div className="landing__page-container">
      <div className="landing__page-container-header landing__repository-header">
        <h3>{i18n.t('landing.links.links')}</h3>

        <input ref={countryFileRef} type="file" style={{ display: 'none' }} onChange={() => uploadAssessmentFile()} />
        <button
          className="btn-s btn-primary"
          onClick={() => {
            countryFileRef.current.value = ''
            countryFileRef.current.dispatchEvent(new MouseEvent('click'))
          }}
          type="button"
        >
          <Icon className="icon-sub icon-white" name="hit-up" />
          {i18n.t('landing.links.uploadFile')}
        </button>
      </div>

      {links.map((link) => (
        <div key={link.key} className="landing__link-container">
          <a href={link.href} target="_blank" rel="noreferrer">
            {i18n.t(`landing.links.${link.key}`)}
          </a>
        </div>
      ))}

      {globalFiles.map((assessmentFile, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="landing__link-container">
          <a
            href={`${ApiEndPoint.File.Assessment.one(assessmentFile.uuid)}?assessmentName=${assessment.props.name}`}
            target="_blank"
            rel="noreferrer"
          >
            {assessmentFile.fileName}
          </a>
        </div>
      ))}

      <div className="landing__page-container-header landing__repository-header">
        <h3>{i18n.t('landing.links.repository')}</h3>

        <input
          ref={countryFileRef}
          type="file"
          style={{ display: 'none' }}
          onChange={() => uploadAssessmentFile(countryIso)}
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
          {i18n.t('landing.links.uploadFile')}
        </button>
      </div>

      {countryFiles.map((assessmentFile, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="landing__link-container">
          <a
            href={`${ApiEndPoint.File.Assessment.one(assessmentFile.uuid)}?assessmentName=${assessment.props.name}`}
            target="_blank"
            rel="noreferrer"
          >
            {assessmentFile.fileName}
          </a>
        </div>
      ))}
    </div>
  )
}

export default Links
