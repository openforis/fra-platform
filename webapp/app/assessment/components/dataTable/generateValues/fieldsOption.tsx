import React from 'react'
import * as R from 'ramda'
import { methods } from '@webapp/app/assessment/components/dataTable/generateValues/methods'
import useI18n from '@webapp/components/hooks/useI18n'

type Props = {
  method: string
  fields: any[]
  setFields: (...args: any[]) => any
}
const FieldsOption = (props: Props) => {
  const i18n = useI18n()
  const { method, fields, setFields } = props
  const setField = (fieldIdx: any) => (field: any) => R.pipe(R.update(fieldIdx, field), setFields)(fields)
  const toggleSelected = (fieldIdx: any) =>
    R.pipe(R.prop(fieldIdx), (field: any) => R.assoc('selected', !field.selected)(field), setField(fieldIdx))(fields)
  const setAnnualChangeRateValue = (fieldIdx: any, prop: any, value: any) =>
    R.pipe(R.prop(fieldIdx), R.assocPath(['annualChangeRates', prop], value), setField(fieldIdx))(fields)
  const rateValidationClass = (fieldIdx: any, prop: any) => {
    const selected = R.path([fieldIdx, 'selected'])(fields)
    const value = R.path([fieldIdx, 'annualChangeRates', prop])(fields)
    return selected && R.isEmpty(value) ? ' validation-error' : ''
  }
  return (
    <>
      {method === methods.annualChange && (
        <>
          <div className="annual-change-rates">
            <div className="annual-change-rates__label">{(i18n as any).t('tableWithOdp.placeholderPast')}</div>
            <div className="annual-change-rates__label">{(i18n as any).t('tableWithOdp.placeholderFuture')}</div>
          </div>
        </>
      )}

      {fields.map((field, fieldIdx) => {
        const { variableName, labelKey, selected, annualChangeRates } = field
        return (
          <React.Fragment key={variableName}>
            <div className="field">
              <div
                role="button"
                aria-label={(i18n as any).t(labelKey)}
                tabIndex={0}
                className={`fra-checkbox${selected ? ' checked' : ''}`}
                onClick={() => toggleSelected(fieldIdx)}
                onKeyDown={() => {}}
              />
              <div
                role="button"
                aria-label={(i18n as any).t(labelKey)}
                tabIndex={0}
                onClick={() => toggleSelected(fieldIdx)}
                onKeyDown={() => {}}
              >
                {(i18n as any).t(labelKey)}
              </div>
            </div>

            {method === methods.annualChange && (
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
                <div className="annual-change-rates__unit">{(i18n as any).t('tableWithOdp._1000haYear')}</div>
              </div>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}
export default FieldsOption
