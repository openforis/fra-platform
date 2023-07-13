import { Assessment } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
}

export const migrateForestServiceCategoryValues = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const schemaAssessment = Schemas.getName(assessment)

  const getUpdateQuery = (cycleName: string): string => {
    const cycle = assessment.cycles.find((c) => c.name === cycleName)
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)

    return `
        with a as (select distinct n.id,
                                   n.value ->> 'raw'                                               value,
                                   regexp_matches(n.value ->> 'raw', '([a-zA-Z]+[ a-zA-Z]+)', 'g') rep
                   from ${schemaCycle}.node n
                            left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
                            left join ${schemaAssessment}.row r on r.id = c.row_id
                            left join ${schemaAssessment}."table" t on r.table_id = t.id
                   where c.props ->> 'colName' = 'forest_service_category'
                     and n.value ->> 'raw' is not null),
             b as (select a.id, a.value, a.rep[1], replace(initcap(replace(a.rep[1], '_', ' ')), ' ', '') as val
                   from a)
        update ${schemaCycle}.node n
        set value = jsonb_set(n.value, '{raw}', to_jsonb(val.key))
        from (select b.id, b.value, b.val, lower(substring(b.val, 1, 1)) || substring(b.val, 2) as key
              from b) as val
        where val.id = n.id;

    `
  }

  return client.query(['2020', '2025'].map(getUpdateQuery).join(` `))
}
