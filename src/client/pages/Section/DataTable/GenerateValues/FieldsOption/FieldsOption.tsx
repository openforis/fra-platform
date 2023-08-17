import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import ButtonCheckBox from 'client/components/ButtonCheckBox'

import { GenerateValuesField } from '../field'
import { Method } from '../method'

type Props = {
  method: Method
  fields: Array<GenerateValuesField>
  setFields: (fields: Array<GenerateValuesField>) => void
}

const FieldsOption: React.FC<Props> = (props) => {
  const i18n = useTranslation()
  const { method, fields, setFields } = props

  const setField = (field: GenerateValuesField, idx: number): void => {
    const fieldsClone = [...fields]
    fieldsClone[idx] = field
    setFields(fieldsClone)
  }

  const toggleSelected = (idx: number): void => {
    const field = fields[idx]
    field.selected = !field.selected
    setField(field, idx)
  }

  const setAnnualChangeRateValue = (idx: number, prop: 'past' | 'future', value: string) => {
    const field = fields[idx]
    field.annualChangeRates[prop] = value
    setField(field, idx)
  }

  const rateValidationClass = (idx: number, prop: 'past' | 'future'): string => {
    const field = fields[idx]
    const { annualChangeRates, selected } = field
    const value = annualChangeRates[prop]
    return selected && Objects.isEmpty(value) ? ' validation-error' : ''
  }

  return (
    <>
      {method === Method.annualChange && (
        <div className="annual-change-rates">
          <div className="annual-change-rates__label">{i18n.t('tableWithOdp.placeholderPast')}</div>
          <div className="annual-change-rates__label">{i18n.t('tableWithOdp.placeholderFuture')}</div>
        </div>
      )}

      {fields.map((field, fieldIdx) => {
        const { variableName, labelKey, selected, annualChangeRates } = field
        return (
          <React.Fragment key={variableName}>
            <ButtonCheckBox checked={selected} label={labelKey} onClick={() => toggleSelected(fieldIdx)} />

            {method === Method.annualChange && (
              <div className="annual-change-rates">
                <input
                  type="number"
                  className={`text-input-s${rateValidationClass(fieldIdx, 'past')}`}
                  value={annualChangeRates.past}
                  onChange={(e) => setAnnualChangeRateValue(fieldIdx, 'past', e.target.value)}
                />
                <input
                  type="number"
                  className={`text-input-s${rateValidationClass(fieldIdx, 'future')}`}
                  value={annualChangeRates.future}
                  onChange={(e) => setAnnualChangeRateValue(fieldIdx, 'future', e.target.value)}
                />
                <div className="annual-change-rates__unit">{i18n.t('tableWithOdp._1000haYear')}</div>
              </div>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default FieldsOption
