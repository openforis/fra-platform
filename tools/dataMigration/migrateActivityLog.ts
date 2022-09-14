import { Cycle } from '../../src/meta/assessment'
import { Assessment } from '../../src/meta/assessment/assessment'
import { BaseProtocol } from '../../src/server/db'
import { DBNames } from './_DBNames'

export const migrateActivityLog = async (props: { assessment: Assessment }, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const cycle = assessment.cycles.find((cycle: Cycle) => cycle.name === '2020')

  const schemaName = DBNames.getAssessmentSchema(assessment.props.name)
  const query = `
      insert into ${schemaName}.activity_log (
          time, message, country_iso, section, target, user_id, cycle_uuid
      )
      select
          time,
          message,
          country_iso,
          section,
          target,
          u.id,
          '${cycle.uuid}' as cycle_uuid
      from _legacy.fra_audit a
          join public.users u on (a.user_login_email = u.email);`
  await client.query(query)
}
