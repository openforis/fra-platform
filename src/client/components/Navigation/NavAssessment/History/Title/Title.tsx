import React from 'react'
import { useTranslation } from 'react-i18next'

import { HistoryItemState } from 'client/store/data'

type Props = {
  value: HistoryItemState
}

const Title: React.FC<Props> = (props: Props) => {
  const { value } = props
  const { t } = useTranslation()

  return (
    <div className="nav-section__header" role="button" tabIndex={0}>
      <div key={value.sectionKey}> {t(value.sectionLabelKey)} </div>
    </div>
  )
}

export default Title
