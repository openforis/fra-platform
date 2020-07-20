import React from 'react'

import useI18n from '@webapp/components/hooks/useI18n'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as ExtentOfForestValidator from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

const tableRows = [
  {
    type: 'field',
    field: 'forestArea',
    validator: ExtentOfForestValidator.forestAreaValidator,
    rowHeaderLabelKey: 'extentOfForest.forestArea',
    rowVariable: '(a)',
  },
  {
    type: 'field',
    field: 'otherWoodedLand',
    validator: ExtentOfForestValidator.otherWoodedLandValidator,
    rowHeaderLabelKey: 'fraClass.otherWoodedLand',
    rowVariable: '(b)',
  },
  {
    type: 'field',
    field: 'otherLand',
    validator: ExtentOfForestValidator.areasNotExceedingTotalLandAreaValidator,
    className: 'fra-table__header-cell-left',
    rowHeaderLabelKey: 'fraClass.otherLand',
    rowVariable: '(c-a-b)',
    calculated: true,
    calculateFn: ExtentOfForestState.getOtherLand,
  },
  {
    type: 'field',
    field: 'faoStat',
    className: 'fra-table__header-cell-left',
    rowHeaderLabelKey: 'extentOfForest.totalLandArea',
    rowVariable: '(c)',
    calculated: true,
    calculateFn: ExtentOfForestState.getFaoStatArea,
  },
  {
    type: 'custom',
    render: () => (
      <tr>
        <td className="fra-table__notice-message-cell" rowSpan="2">
          {useI18n().t('extentOfForest.tableNoticeMessage')}
        </td>
      </tr>
    ),
  },
  {
    type: 'validationErrors',
    validationMessages: ExtentOfForestValidator.getValidationMessages,
  },
]

export default tableRows
