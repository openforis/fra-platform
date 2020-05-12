import React from 'react'

import { Link } from 'react-router-dom'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as ForestCharacteristicsState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsState'
import * as ForestCharacteristicsValidatorState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsValidatorState'

const tableRows = [
  {
    type: 'field',
    field: 'naturalForestArea',
    rowHeaderLabelKey: 'forestCharacteristics.naturalForestArea',
    rowVariable: '(a)',
  },
  {
    type: 'field',
    field: 'plantedForest',
    className: 'fra-table__header-cell-left',
    rowHeaderLabelKey: 'forestCharacteristics.plantedForest',
    rowVariable: '(b)',
    calculated: true,
    calculateFn: ForestCharacteristicsState.getPlantedForest,
  },
  {
    type: 'field',
    field: 'plantationForestArea',
    rowHeaderLabelKey: 'forestCharacteristics.plantationForestArea',
  },
  {
    type: 'field',
    field: 'plantationForestIntroducedArea',
    validator: ForestCharacteristicsValidatorState.plantationForestValidator,
    className: 'fra-table__subcategory-cell',
    rowHeaderLabelKey: 'forestCharacteristics.plantationForestIntroducedArea',
  },
  {
    type: 'field',
    field: 'otherPlantedForestArea',
    rowHeaderLabelKey: 'forestCharacteristics.otherPlantedForestArea',
  },
  {
    type: 'field',
    field: 'total',
    validator: ForestCharacteristicsValidatorState.totalForestAreaNotEqualToExtentOfForestValidator,
    className: 'fra-table__header-cell-left',
    rowHeaderLabelKey: 'forestCharacteristics.total',
    rowVariable: '(a+b)',
    calculated: true,
    calculateFn: ForestCharacteristicsState.getTotalForest,
  },
  {
    type: 'field',
    field: 'totalForestArea',
    className: 'fra-table__header-cell-left',
    rowHeaderLabelKey: 'forestCharacteristics.totalForestArea',
    calculated: true,
    calculateFn: datum => state => ExtentOfForestState.getForestByYear(datum.name)(state),
    rowHeaderComponent: () => {
      const i18n = useI18n()
      const countryIso = useCountryIso()

      return (
        <>
          <div className="only-print">{i18n.t('forestCharacteristics.totalForestArea')}</div>
          <Link to={`/country/${countryIso}/extentOfForest`} className="link no-print">
            {i18n.t('forestCharacteristics.totalForestArea')}
          </Link>
        </>
      )
    },
  },
  {
    type: 'custom',
    render: () => (
      <tr>
        <td rowSpan="2" />
      </tr>
    ),
  },
  {
    type: 'validationErrors',
    validationMessages: ForestCharacteristicsValidatorState.getValidationMessages,
  },
]

export default tableRows
