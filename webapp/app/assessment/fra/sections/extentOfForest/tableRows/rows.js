import RowOtherLand from '@webapp/app/assessment/fra/sections/extentOfForest/tableRows/components/rowOtherLand'
import RowTotalLand from '@webapp/app/assessment/fra/sections/extentOfForest/tableRows/components/rowTotalLand'
import RowNoticeMessage from '@webapp/app/assessment/fra/sections/extentOfForest/tableRows/components/rowNoticeMessage'

import * as ExtentOfForestValidator
  from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

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
  {
    type: 'custom',
    render: RowTotalLand
  },
  {
    type: 'custom',
    render: RowNoticeMessage
  },
  {
    type: 'validationErrors',
    validationMessages: ExtentOfForestValidator.getValidationMessages
  }
]

export default tableRows
