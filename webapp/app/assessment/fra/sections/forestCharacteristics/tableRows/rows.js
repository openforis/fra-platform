import React from 'react'

import RowPlantedForest
  from '@webapp/app/assessment/fra/sections/forestCharacteristics/tableRows/components/rowPlantedForest'
import RowTotalForest
  from '@webapp/app/assessment/fra/sections/forestCharacteristics/tableRows/components/rowTotalForest'
import RowTotal from '@webapp/app/assessment/fra/sections/forestCharacteristics/tableRows/components/rowTotal'

import * as ForestCharacteristicsValidatorState
  from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsValidatorState'

const tableRows = [
  {
    type: 'field',
    field: 'naturalForestArea',
    rowHeaderLabelKey: 'forestCharacteristics.naturalForestArea',
    rowVariable: '(a)'
  },
  {
    type: 'custom',
    render: RowPlantedForest
  },
  {
    type: 'field',
    field: 'plantationForestArea',
    rowHeaderLabelKey: 'forestCharacteristics.plantationForestArea'
  },
  {
    type: 'field',
    field: 'plantationForestIntroducedArea',
    validator: ForestCharacteristicsValidatorState.plantationForestValidator,
    className: 'fra-table__subcategory-cell',
    rowHeaderLabelKey: 'forestCharacteristics.plantationForestIntroducedArea'
  },
  {
    type: 'field',
    field: 'otherPlantedForestArea',
    rowHeaderLabelKey: 'forestCharacteristics.otherPlantedForestArea'
  },
  {
    type: 'custom',
    render: RowTotal
  },
  {
    type: 'custom',
    render: RowTotalForest
  },
  {
    type: 'custom',
    render: () => (
      <tr>
        <td rowSpan="2"/>
      </tr>
    )
  },
  {
    type: 'validationErrors',
    validationMessages: ForestCharacteristicsValidatorState.getValidationMessages
  }
]

export default tableRows
