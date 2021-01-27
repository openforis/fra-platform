import './tableOfContent.less'
import React from 'react'
import PropTypes from 'prop-types'

import * as FRA from '@common/assessment/fra'

import useI18n from '@webapp/components/hooks/useI18n'

const TableOfContent = (props) => {
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

TableOfContent.propTypes = {
  deskStudy: PropTypes.bool.isRequired,
}

export default TableOfContent
