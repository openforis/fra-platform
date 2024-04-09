import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'
import { DashboardItem } from 'meta/dashboard'

type Props = {
  item: DashboardItem<unknown>
}
const Title: React.FC<Props> = (props: Props) => {
  const { item } = props
  const { t } = useTranslation()
  return <h3 className="header">{t(Labels.getLabel({ label: item.title, t }))}</h3>
}

export default Title
