import './GenerateValues.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'
import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'
import { Objects } from 'utils/objects'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import Button from 'client/components/Buttons/Button'
import Select, { Option, SelectSize } from 'client/components/Inputs/Select'

import { useEstimationStatusListener } from './hooks/useEstimationStatusListener'
import { useGenerateValues } from './hooks/useGenerateValues'
import FieldsOption from './FieldsOption'
import { Method } from './method'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  sectionName: string
  tableName: string
  rows: Array<Row>
  data: RecordAssessmentData
}

const methods: Array<{ method: Method; labelKey: string }> = [
  { method: Method.linear, labelKey: 'tableWithOdp.linearExtrapolation' },
  { method: Method.repeatLast, labelKey: 'tableWithOdp.repeatLastExtrapolation' },
  { method: Method.annualChange, labelKey: 'tableWithOdp.annualChangeExtrapolation' },
]

const GenerateValues: React.FC<Props> = (props) => {
  const { assessmentName, cycleName, data, rows, sectionName, tableName } = props

  const { t } = useTranslation()
  const country = useAssessmentCountry()
  const useOriginalDataPoint = country?.props?.forestCharacteristics?.useOriginalDataPoint

  const { fields, generateValues, method, setFields, setMethod, valid } = useGenerateValues(
    assessmentName,
    cycleName,
    sectionName,
    tableName,
    rows,
    data
  )
  const isEstimationPending = useEstimationStatusListener()
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(true)

  // When ODPs are hidden, don't show generate values in table 1b
  // ODPs cannot be hidden for table 1a
  if (!useOriginalDataPoint && tableName === TableNames.forestCharacteristics) return null

  const buttonLabel =
    isEstimationPending || !buttonEnabled ? 'tableWithOdp.generatingFraValues' : 'tableWithOdp.generateFraValues'

  const options = methods.map<Option>((m) => {
    return { value: m.method, label: t(m.labelKey) }
  })
  return (
    <div className="app-view__section-toolbar no-print">
      <div className="data-table-generate-values">
        <Select
          bordered
          onChange={(value: Method) => setMethod(value)}
          options={options}
          placeholder={t('tableWithOdp.placeholderSelect')}
          size={SelectSize.s}
          value={method ?? ''}
        />

        <Button
          disabled={isEstimationPending || !valid || !buttonEnabled}
          label={t(buttonLabel)}
          onClick={(): void => {
            setButtonEnabled(false)
            generateValues()
            setTimeout(() => {
              setButtonEnabled(true)
            }, 4_000)
          }}
        />

        {!Objects.isEmpty(method) && <FieldsOption fields={fields} method={method} setFields={setFields} />}
      </div>
    </div>
  )
}

export default GenerateValues
