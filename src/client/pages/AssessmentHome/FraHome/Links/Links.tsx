import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'

import { ApiEndPoint } from '@meta/api/endpoint'
import { AssessmentFile } from '@meta/assessment'

import { useAssessment } from '@client/store/assessment'
import { useCountryIso, useGetRequest } from '@client/hooks'

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

  return (
    <div className="landing__page-container">
      <div className="landing__repository-header">
        <h3>{i18n.t('landing.links.links')}</h3>
      </div>
      {!Objects.isEmpty(data) ? (
        data.map((assessmentFile, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <div key={String(index)}>{assessmentFile.fileName}</div>
        })
      ) : (
        <div>Empty!</div>
      )}
    </div>
  )
}

export default Links
