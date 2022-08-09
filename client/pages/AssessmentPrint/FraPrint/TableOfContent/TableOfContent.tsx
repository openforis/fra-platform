import './TableOfContent.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAssessmentSections } from '@client/store/assessment'

type Props = {
  deskStudy: boolean
}

const TableOfContent: React.FC<Props> = (props) => {
  const i18n = useTranslation()
  const { deskStudy } = props
  const sections = useAssessmentSections()

  if (!sections) return null

  return (
    <>
      <div className="page-break" />

      <div className="disclaimer">
        <p>{i18n.t<string>('fraReportPrint.disclaimer')}</p>
        <p>
          {deskStudy
            ? i18n.t<string>('fraReportPrint.disclaimerGeneratedDeskStudy')
            : i18n.t<string>('fraReportPrint.disclaimerGenerated')}
        </p>
      </div>

      <div className="page-break" />

      <div>
        <h2 className="table-of-content__header">{i18n.t<string>('fraReportPrint.tableOfContent')}</h2>

        <ol className="table-of-content__list">
          {Object.entries(sections).map(([key, section]) => (
            <li key={key} data-idx={key}>
              <a href={`#section${key}`}>{i18n.t<string>(section.props.labelKey)}</a>
            </li>
          ))}
        </ol>
      </div>

      <div className="page-break" />
    </>
  )
}

export default TableOfContent
