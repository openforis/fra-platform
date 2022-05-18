import { Assessment } from '../../../meta/assessment/assessment'
import { BaseProtocol } from '../../../server/db'
import { getIssuesLegacy } from './getIssuesLegacy'
import { getTableRows } from './getTableRows'
import { MessageTopicRow } from './messageTopicRow'

export const getTableTopics = async (
  props: { assessment: Assessment },
  client: BaseProtocol
): Promise<Array<MessageTopicRow>> => {
  const values: Array<MessageTopicRow> = []
  const tableRows = await getTableRows(props, client)
  const issues = await getIssuesLegacy({ odp: false }, client)
  issues.forEach((issue) => {
    if (issue.target.length === 3) {
      const { id, countryIso, status, target } = issue
      const [tableName, , rowIndex] = target
      const key = tableRows[tableName][rowIndex]

      if (!values.find((v) => v.country_iso === countryIso && v.key === key)) {
        values.push({
          id,
          country_iso: countryIso,
          key,
          status,
          type: 'review',
        })
      }
      // else {
      //   console.log('========= duplicate topic ', countryIso, tableName, rowIndex)
      // }
    }
  })

  return values
}
