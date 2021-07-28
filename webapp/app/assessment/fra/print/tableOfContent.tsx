import './tableOfContent.less'
import React from 'react'
import { FRA } from '@core/assessment'
import useI18n from '@webapp/components/hooks/useI18n'

type Props = {
  deskStudy: boolean
}
const TableOfContent = (props: Props) => {
  const i18n = useI18n()
  const { deskStudy } = props
  return (
    <>
      <div className="page-break" />

      <div className="disclaimer">
        <p>{(i18n as any).t('fraReportPrint.disclaimer')}</p>
        <p>
          {deskStudy
            ? (i18n as any).t('fraReportPrint.disclaimerGeneratedDeskStudy')
            : (i18n as any).t('fraReportPrint.disclaimerGenerated')}
        </p>
      </div>

      <div className="page-break" />

      <div>
        <h2 className="table-of-content__header">{(i18n as any).t('fraReportPrint.tableOfContent')}</h2>

        <ol className="table-of-content__list">
          {Object.entries(FRA.sections).map(([key, section]) => (
            <li key={key} data-idx={key}>
              <a href={`#section${key}`}>{(i18n as any).t((section as any).label)}</a>
            </li>
          ))}
        </ol>
      </div>

      <div className="page-break" />
    </>
  )
}
export default TableOfContent
