import { Assessment } from '../../src/meta/assessment/assessment'
import { BaseProtocol } from '../../src/server/db'
import { DBNames } from './_DBNames'

type Props = {
  assessment: Assessment
  client: BaseProtocol
}

export const migrateRepository = async (props: Props): Promise<void> => {
  const { assessment, client } = props

  const schema = DBNames.getAssessmentSchema(assessment.props.name)

  await client.query(
    `
        delete from ${schema}.file;

        insert into ${schema}.file (country_iso, file_name, file)
        select country_iso, file_name, file
        from _legacy.repository;
    `
  )
}
