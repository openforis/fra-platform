import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { TableData } from '@meta/data'
import { User } from '@meta/user'

import { persistNodeValue } from './persistNodeValue'

interface Props {
  assessment: Assessment
  cycle: Cycle
  user: User
  tableData: TableData
  tableName: string
}

// Wrapper to support persisting full tables
export const persistNodeValues = async (props: Props): Promise<void> => {
  const { assessment, cycle, user, tableData, tableName } = props
  const promises = Object.entries(tableData).flatMap(([countryIso, countryValues]) =>
    Object.entries(countryValues).flatMap(([_section, sectionValues]) =>
      Object.entries(sectionValues).flatMap(([colName, colValues]) =>
        Object.entries(colValues).flatMap(([variableName, value]) => {
          return persistNodeValue({
            assessment,
            cycle,
            user,
            countryIso: countryIso as CountryIso,
            value,
            colName,
            variableName,
            tableName,
          })
        })
      )
    )
  )
  await Promise.all(promises)
}
