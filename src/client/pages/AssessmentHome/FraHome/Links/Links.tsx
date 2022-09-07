import './Links.scss'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from '@meta/api/endpoint'
import { AssessmentFile } from '@meta/assessment'

import { useAssessment } from '@client/store/assessment'
import { useCountryIso, useGetRequest } from '@client/hooks'

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
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const i18n = useTranslation()

  const { data, dispatch: fetchData } = useGetRequest(ApiEndPoint.File.Assessment.many(), {
    params: { countryIso, assessmentName: assessment.props.name },
  }) as { data: Array<AssessmentFile>; dispatch: any }

  const fetchRef = useRef(fetchData)

  useEffect(() => fetchRef.current(), [fetchRef])

  if (!data) return null

  const countryFiles = data.filter((f) => f.countryIso === countryIso)
  const globalFiles = data.filter((f) => !f.countryIso)

  return (
    <div className="landing__page-container">
      <div className="landing__page-container-header landing__repository-header">
        <h3>{i18n.t('landing.links.links')}</h3>
      </div>

      {links.map((link) => (
        <div key={link.key} className="landing__link-container">
          <a href={link.href} target="_blank" rel="noreferrer">
            {i18n.t(`landing.links.${link.key}`)}
          </a>
        </div>
      ))}

      {globalFiles.map((assessmentFile, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <div key={String(index)}>{assessmentFile.fileName}</div>
      })}

      <div className="landing__page-container-header landing__repository-header">
        <h3>{i18n.t('landing.links.repository')}</h3>

        {countryFiles.map((assessmentFile, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <div key={String(index)}>{assessmentFile.fileName}</div>
        })}
      </div>
    </div>
  )
}

export default Links
