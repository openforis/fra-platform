import './tableOfContent.less'

import React from 'react'
import { assessments } from '@common/assessmentSectionItems'

const getAssessmentHeaders = ({ fra2020 }) => fra2020.filter(x =>
  !x.label.includes('introduction') && Number(x.sectionNo) > 0
)

const TableOfContentLink = ({ children, i }) => <li><a href={`#section${i + 1}`}>{children}</a></li>
const TableOfContent = props => {
  const { i18n } = props

  return (
    <>
      <ol className="table-of-content">
        {
          getAssessmentHeaders(assessments).map(
            (section, i) => <TableOfContentLink key={i} i={i}>{i18n.t(section.label)}</TableOfContentLink>
          )
        }
      </ol>
      <div className="page-break"/>
    </>
  )
}

export default TableOfContent
