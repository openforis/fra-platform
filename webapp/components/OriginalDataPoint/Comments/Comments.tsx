import React from 'react'

import { ODP } from '@core/odp'
import { useCountryIso, useI18n } from '@webapp/components/hooks'

import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import CommentsEditor from './CommentsEditor'
import { useNationalClassNameComments } from '../hooks'

type Props = {
  canEditData: boolean
  odp: ODP
}

const Comments: React.FC<Props> = (props) => {
  const { odp, canEditData } = props

  const i18n = useI18n()
  const countryIso = useCountryIso()
  const target = [`${odp.odpId}`, 'comments']
  const className = useNationalClassNameComments(target)

  return (
    <div className="odp__section">
      <div className="fra-description">
        <div className={`fra-description__wrapper ${className}`}>
          <CommentsEditor canEditData={canEditData} odp={odp} />
        </div>

        <div className="fra-description__review-indicator-wrapper">
          {odp.odpId && canEditData && (
            <ReviewIndicator
              section="odp"
              title={i18n.t('nationalDataPoint.nationalDataPoint')}
              target={target}
              countryIso={countryIso}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Comments
