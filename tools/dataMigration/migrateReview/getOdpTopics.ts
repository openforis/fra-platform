import { Assessment } from '../../../src/meta/assessment/assessment'
import { Cycle } from '../../../src/meta/assessment/cycle'
import { BaseProtocol } from '../../../src/server/db'
import { Objects } from '../../../src/utils/objects'
import { DBNames } from '../_DBNames'
import { getIssuesLegacy } from './getIssuesLegacy'
import { MessageTopicRow } from './messageTopicRow'

export const getOdpTopics = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol
): Promise<Array<MessageTopicRow>> => {
  const { assessment, cycle } = props
  const cycleSchema = DBNames.getCycleSchema(assessment.props.name, cycle.name)
  const values: Array<MessageTopicRow> = []
  const ids = await client.one<Record<string, number>>(
    `
  select jsonb_object_agg(o.id_legacy,o.id) as data from ${cycleSchema}.original_data_point o;
  `,
    [],
    ({ data }) => data
  )

  const issues = await getIssuesLegacy({ odp: true }, client)
  issues.forEach((issue) => {
    const { id, countryIso, status, target } = issue
    const [idLegacy, ...otherTarget] = target
    let [name] = otherTarget.splice(otherTarget.length - 1, 1)
    if (name === 'value') name = 'extentOfForest'
    if (name === 'forest_charasteristics') name = 'forestCharacteristics'
    name = Objects.camelize(name)

    const odpId = ids[idLegacy]
    const key = [odpId, ...otherTarget, name].join('-')

    values.push({
      id,
      country_iso: countryIso,
      key,
      status,
      type: 'review',
    })
  })

  return values
}
