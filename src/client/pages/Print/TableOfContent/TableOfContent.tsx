import './TableOfContent.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { useSections } from 'client/store/metadata'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  deskStudy: boolean
}

const TableOfContent: React.FC<Props> = (props) => {
  const { deskStudy } = props

  const { t } = useTranslation()

  const { assessmentName } = useCountryRouteParams()
  const cycle = useCycle()
  const sections = useSections()

  if (!sections) return null

  return (
    <>
      <div className="page-break" />

      <div className="disclaimer">
        <p>{t(`${assessmentName}.print.disclaimer`)}</p>
        <p>
          {deskStudy
            ? t(`${assessmentName}.print.disclaimerGeneratedDeskStudy`)
            : t(`${assessmentName}.print.disclaimerGenerated`, { cycleName: cycle?.name })}
        </p>
      </div>

      <div className="page-break" />

      <div>
        <h2 className="table-of-content__header">{t(`${assessmentName}.print.tableOfContent`)}</h2>

        <ol className="table-of-content__list">
          {Object.entries(sections).map(([key, section]) => (
            <li key={key} data-idx={key}>
              <a href={`#section${key}`}>{Labels.getCycleLabel({ cycle, labels: section.props.labels, t })}</a>
            </li>
          ))}
        </ol>
      </div>

      <div className="page-break" />
    </>
  )
}

export default TableOfContent
