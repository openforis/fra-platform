import './tableOfContent.less'

import React from 'react'

import * as FRA from '@common/assessment/fra'

import useI18n from '@webapp/components/hooks/useI18n'

const TableOfContent = () => {
  const i18n = useI18n()

  return (
    <ol className="table-of-content">
      {Object.entries(FRA.sections).map(([key, section]) => (
        <li key={key} data-idx={key}>
          <a href={`#section${key}`}>{i18n.t(section.label)}</a>
        </li>
      ))}
    </ol>
  )
}

export default TableOfContent
