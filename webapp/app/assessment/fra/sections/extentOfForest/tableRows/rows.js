import React from 'react'
import useI18n from '@webapp/components/hooks/useI18n'

import RowOtherLand from '@webapp/app/assessment/fra/sections/extentOfForest/tableRows/components/rowOtherLand'
import * as ExtentOfForestValidator from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

const tableRows = [
  {
    type: 'field',
    field: 'forestArea',
    validator: ExtentOfForestValidator.forestAreaValidator,
    rowHeaderLabelKey: 'extentOfForest.forestArea',
    rowVariable: '(a)'
  },
  {
    type: 'field',
    field: 'otherWoodedLand',
    validator: ExtentOfForestValidator.otherWoodedLandValidator,
    rowHeaderLabelKey: 'fraClass.otherWoodedLand',
    rowVariable: '(b)'
  },
  {
    type: 'custom',
    render: RowOtherLand
  },
  // {
  //   type: 'custom',
  //   render: faoStatTotalLandAreaRow
  // },
  {
    type: 'custom',
    render: () => {
      const i18n = useI18n()
      return (
        <tr>
          <td className="fra-table__notice-message-cell" rowSpan="2">
            {i18n.t('extentOfForest.tableNoticeMessage')}
          </td>
        </tr>
      )
    }
  },
  // {
  //   type: 'validationErrors',
  //   validationErrorMessages
  // }
]

export default tableRows
