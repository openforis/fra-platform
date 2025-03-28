import './GenerateValues.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Row, TableNames } from 'meta/assessment'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { RecordAssessmentData } from 'meta/data'

import { useAssessmentCountry } from 'client/store/area'

import FieldsOption from './FieldsOption'
import { Method } from './method'
import useGenerateValues from './useGenerateValues'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  sectionName: string
  tableName: string
  rows: Array<Row>
  data: RecordAssessmentData
}

const GenerateValues: React.FC<Props> = (props) => {
  const { assessmentName, cycleName, sectionName, tableName, rows, data } = props

  const { t } = useTranslation()
  const country = useAssessmentCountry()
  const useOriginalDataPoint = country?.props?.forestCharacteristics?.useOriginalDataPoint

  const { method, setMethod, fields, setFields, valid, generateValues, isEstimationPending } = useGenerateValues(
    assessmentName,
    cycleName,
    sectionName,
    tableName,
    rows,
    data
  )
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(true)

  // When ODPs are hidden, don't show generate values in table 1b
  // ODPs cannot be hidden for table 1a
  if (!useOriginalDataPoint && tableName === TableNames.forestCharacteristics) return null

  let buttonLabel = 'tableWithOdp.generateFraValues'
  if (isEstimationPending || !buttonEnabled) buttonLabel = 'tableWithOdp.generatingFraValues'

  return (
    <div className="app-view__section-toolbar no-print">
      <div className="data-table-generate-values">
        <select className="select-s" onChange={(evt) => setMethod(evt.target.value as Method)} value={method ?? ''}>
          <option disabled value="">
            {t('tableWithOdp.placeholderSelect')}
          </option>
          <option value={Method.linear}>{t('tableWithOdp.linearExtrapolation')}</option>
          <option value={Method.repeatLast}>{t('tableWithOdp.repeatLastExtrapolation')}</option>
          <option value={Method.annualChange}>{t('tableWithOdp.annualChangeExtrapolation')}</option>
        </select>

        <button
          className="btn-s btn-primary"
          disabled={isEstimationPending || !valid || !buttonEnabled}
          onClick={() => {
            setButtonEnabled(false)
            generateValues()
            setTimeout(() => {
              setButtonEnabled(true)
            }, 4_000)
          }}
          type="button"
        >
          {t(buttonLabel)}
        </button>

        {!Objects.isEmpty(method) && <FieldsOption fields={fields} method={method} setFields={setFields} />}
      </div>
    </div>
  )
}

export default GenerateValues
