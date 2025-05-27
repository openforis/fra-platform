import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cols } from 'meta/assessment/cols'

import { useCycle } from 'client/store/meta/hooks/cycles'

import { PropsCell } from '../props'

const Placeholder: React.FC<PropsCell> = (props) => {
  const { col, nodeValue } = props
  const { t } = useTranslation()
  const cycle = useCycle()

  const labelCell = Cols.getLabel({ cycle, col, t })

  return labelCell || nodeValue?.raw || ''
}

export default Placeholder
