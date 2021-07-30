import React from 'react'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import CommentsEditor from './commentsEditor'
import useClassNameComments from '../../../../../../../components/OriginalDataPoint/NationalClasses/NationalClass/useClassNameComments'

type Props = {
  canEditData: boolean
  odp: any
}
const Comments = (props: Props) => {
  const { odp, canEditData } = props
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const target = [`${odp.odpId}`, 'comments']
  const className = useClassNameComments(target)
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
