import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cols } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'

import { PropsCell } from '../props'

const Placeholder: React.FC<PropsCell> = (props) => {
  const { col, nodeValue } = props
  const { t } = useTranslation()
  const cycle = useCycle()

  const labelCell = Cols.getLabel({ cycle, col, t })

  return <div>{labelCell || nodeValue?.raw || ''}</div>
}

export default Placeholder
