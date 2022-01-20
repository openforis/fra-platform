import React from 'react'

// import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import { useOriginalDataPoint } from '@client/store/data/originalDataPoint'
import { useCountryIso } from '@client/hooks'
import { useTranslation } from 'react-i18next'
import { useNationalClassNameComments } from '../../hooks'
import CommentsEditor from './CommentsEditor'

type Props = {
  canEditData: boolean
}

const Comments: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()

  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const target = [`${originalDataPoint.odpId}`, 'comments']
  const className = useNationalClassNameComments(target)

  return (
    <div className="odp__section">
      <div className="fra-description">
        <div className={`fra-description__wrapper ${className}`}>
          <CommentsEditor canEditData={canEditData} odp={originalDataPoint} />
        </div>

        <div className="fra-description__review-indicator-wrapper">
          {/* {originalDataPoint.odpId && canEditData && ( */}
          {/*  // <ReviewIndicator */}
          {/*  //   section="odp" */}
          {/*  //   title={i18n.t('nationalDataPoint.nationalDataPoint')} */}
          {/*  //   target={target} */}
          {/*  //   countryIso={countryIso} */}
          {/*  // /> */}
          {/* // )} */}
        </div>
      </div>
    </div>
  )
}

export default Comments
