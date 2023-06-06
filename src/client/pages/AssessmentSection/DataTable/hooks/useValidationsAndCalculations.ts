import { Table } from 'meta/assessment'

import { useCalculations } from 'client/pages/AssessmentSection/DataTable/hooks/useCalculations'
import { useValidations } from 'client/pages/AssessmentSection/DataTable/hooks/useValidations'

export const useValidationsAndCalculations = (props: { table: Table }) => {
  useValidations(props)
  useCalculations(props)
}
