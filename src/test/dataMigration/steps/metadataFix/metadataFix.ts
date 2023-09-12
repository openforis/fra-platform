import { Assessment } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
}

export const metadataFix = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props

  const schema = Schemas.getName(assessment)

  // fix calculated columns + updated calculation formulas
  await client.query(`
      update ${schema}.col
      set props = jsonb_set(props, '{colType}', '"calculated"')
      from (select c.id as col_id
            from ${schema}.col c
                     left join ${schema}.row r
                               on r.id = c.row_id
                     left join ${schema}."table" t
                               on r.table_id = t.id
            where (
                    (t.props ->> 'name' = 'otherLandWithTreeCover' and
                        r.props ->> 'variableName' in ('otherLandWithTreeCoverTotal', 'otherLand'))
                    or (t.props ->> 'name' = 'forestOwnership' and
                        r.props ->> 'variableName' in ('other_or_unknown', 'totalForestArea'))
                    or (t.props ->> 'name' = 'holderOfManagementRights' and
                        r.props ->> 'variableName' in ('other', 'totalPublicOwnership'))
                    or (t.props ->> 'name' = 'disturbances' and
                        r.props ->> 'variableName' in ('total', 'totalForestArea'))
                )
              and c.props ->> 'colType' = 'decimal') as d
      where id = d.col_id;

-- nonWoodForestProductsRemovals
      update ${schema}.row
      set props = jsonb_set(row.props, '{variableName}', to_jsonb(d.variable))
      from (select r.id, 'product_' || (r.props ->> 'variableName'::varchar) as variable
            from ${schema}.row r
                     left join ${schema}."table" t on t.id = r.table_id
            where t.props ->> 'name' = 'nonWoodForestProductsRemovals'
              and r.props ->> 'type' = 'data'
              and (r.props ->> 'index')::numeric < 10) as d
      where d.id = row.id;
  `)
}
