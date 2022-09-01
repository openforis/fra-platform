import './TableOfContent.scss'
import React from 'react'

import { FRA } from '@core/assessment'
import { useI18n } from '@webapp/hooks'

type Props = {
  deskStudy: boolean
}

const TableOfContent: React.FC<Props> = (props) => {
  const i18n = useI18n()
  const { deskStudy } = props

  return (
    <>
      <div className="page-break" />

      <div className="disclaimer">
        <p>{i18n.t('fraReportPrint.disclaimer')}</p>
        <p>
          {deskStudy
            ? i18n.t('fraReportPrint.disclaimerGeneratedDeskStudy')
            : i18n.t('fraReportPrint.disclaimerGenerated')}
        </p>
      </div>

      <div className="page-break" />

      <div>
        <h2 className="table-of-content__header">{i18n.t('fraReportPrint.tableOfContent')}</h2>

        <ol className="table-of-content__list">
          {Object.entries(FRA.sections).map(([key, section]) => (
            <li key={key} data-idx={key}>
              <a href={`#section${key}`}>{i18n.t(section.label)}</a>
            </li>
          ))}
        </ol>
      </div>

      <div className="page-break" />
    </>
  )
}

export default TableOfContent
