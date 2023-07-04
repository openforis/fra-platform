import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Topics } from 'meta/messageCenter'

import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import ReviewIndicator from 'client/components/ReviewIndicator'

import { useNationalClassNameComments } from '../../hooks'
import CommentsEditor from './CommentsEditor'

type Props = {
  canEditData: boolean
}

const Comments: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()

  const { t } = useTranslation()
  const target = [`${originalDataPoint.id}`, 'comments']
  const className = useNationalClassNameComments(target)

  return (
    <div className="odp__section">
      <div className="fra-description">
        <div className={classNames('fra-description__wrapper', className)}>
          <CommentsEditor canEditData={canEditData} />
        </div>

        <div className="fra-description__review-indicator-wrapper">
          {originalDataPoint.id && canEditData && (
            <td className="fra-table__review-cell no-print">
              <ReviewIndicator
                title={t('nationalDataPoint.nationalDataPoint')}
                topicKey={Topics.getOdpReviewTopicKey(originalDataPoint.id, 'nationalDataPointComments')}
              />
            </td>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comments
