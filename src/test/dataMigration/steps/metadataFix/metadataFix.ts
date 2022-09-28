import { Assessment } from '@meta/assessment'

import { BaseProtocol, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
}

export const metadataFix = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props

  const schema = Schemas.getName(assessment)

  // fix growingStock tables col header colSpan
  await Promise.all(
    assessment.cycles.map((cycle) =>
      client.query(`
          update ${schema}.col
          set props = jsonb_set(
                  props,
                  '{style,${cycle.uuid},colSpan}',
                  to_jsonb(d.col_span)
              )
          from (select c.id                                                            as column_id,
                       jsonb_array_length(t.props -> 'columnNames' -> '${cycle.uuid}') as col_span
                from ${schema}.col c
                         left join ${schema}.row r on r.id = c.row_id
                         left join ${schema}."table" t on t.id = r.table_id
                where t.props ->> 'name' in ('growingStockAvg', 'growingStockTotal')
                  and c.props ->> 'colType' = 'header'
                  and c.props ->> 'index' = '1'
                  and c.props -> 'style' -> '${cycle.uuid}' ->> 'colSpan' is null) as d
          where id = d.column_id
      `)
    )
  )

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
--                     (t.props ->> 'name' = 'extentOfForest' and
--                      r.props ->> 'variableName' in ('otherLand', 'totalLandArea'))
--                     or 
--                     (t.props ->> 'name' = 'forestCharacteristics' and
--                         r.props ->> 'variableName' in ('plantedForest', 'forestArea', 'totalForestArea'))
--                     or
                    (t.props ->> 'name' = 'forestAreaChange' and r.props ->> 'variableName' in ('forestAreaNetChange'))
                    or (t.props ->> 'name' = 'otherLandWithTreeCover' and
                        r.props ->> 'variableName' in ('otherLandWithTreeCoverTotal', 'otherLand'))
                    or (t.props ->> 'name' = 'primaryDesignatedManagementObjective' and
                        r.props ->> 'variableName' in ('no_unknown', 'totalForestArea'))
                    or (t.props ->> 'name' = 'forestOwnership' and
                        r.props ->> 'variableName' in ('other_or_unknown', 'totalForestArea'))
                    or (t.props ->> 'name' = 'holderOfManagementRights' and
                        r.props ->> 'variableName' in ('other', 'totalPublicOwnership'))
                    or (t.props ->> 'name' = 'disturbances' and
                        r.props ->> 'variableName' in ('total', 'totalForestArea'))
                    or (t.props ->> 'name' = 'sustainableDevelopment15_1_1' and
                        r.props ->> 'variableName' in ('forestAreaProportionLandArea2015'))
                    or (t.props ->> 'name' = 'sustainableDevelopment15_2_1_1' and
                        r.props ->> 'variableName' in ('forestAreaAnnualNetChangeRate'))
                    or (t.props ->> 'name' = 'sustainableDevelopment15_2_1_2' and
                        r.props ->> 'variableName' in ('aboveGroundBiomassStockForests'))
                    or (t.props ->> 'name' = 'sustainableDevelopment15_2_1_3' and
                        r.props ->> 'variableName' in ('proportionForestAreaLegallyEstablishedProtectedAreas'))
                    or (t.props ->> 'name' = 'sustainableDevelopment15_2_1_4' and
                        r.props ->> 'variableName' in ('proportionForestAreaLongTermForestManagement'))
                    or (t.props ->> 'name' = 'sustainableDevelopment15_2_1_5' and
                        r.props ->> 'variableName' in ('forestAreaVerifiedForestManagement'))
                )
              and c.props ->> 'colType' = 'decimal') as d
      where id = d.col_id;

-- forestAreaChange
      update ${schema}.col
      set props = jsonb_set(
              props,
              '{calculateFn}',
              '"(extentOfForest.forestArea[''2025''] - extentOfForest.forestArea[''2020'']) / 5"'
          )
      from (select c.id as col_id
            from ${schema}.col c
                     left join ${schema}.row r
                               on r.id = c.row_id
                     left join ${schema}."table" t
                               on r.table_id = t.id
            where t.props ->> 'name' = 'forestAreaChange'
              and r.props ->> 'variableName' in ('forestAreaNetChange')
              and c.props ->> 'colName' = '2020-2025') as d
      where id = d.col_id;

-- sustainableDevelopment15_2_1_1
      update ${schema}.col
      set props = jsonb_set(
              props,
              '{calculateFn}',
              '"(((extentOfForest.forestArea[''2025''] / extentOfForest.forestArea[''2020'']) ** 0.2) - 1) * 100"'
          )
      from (select c.id as col_id
            from ${schema}.col c
                     left join ${schema}.row r
                               on r.id = c.row_id
                     left join ${schema}."table" t
                               on r.table_id = t.id
            where t.props ->> 'name' = 'sustainableDevelopment15_2_1_1'
              and r.props ->> 'variableName' in ('forestAreaAnnualNetChangeRate')
              and c.props ->> 'colName' = '2020-2025') as d
      where id = d.col_id;
      update ${schema}.col
      set props = jsonb_set(
              props,
              '{calculateFn}',
              '"(((extentOfForest.forestArea[''2025''] / extentOfForest.forestArea[''2015'']) ** 0.1) - 1) * 100"'
          )
      from (select c.id as col_id
            from ${schema}.col c
                     left join ${schema}.row r
                               on r.id = c.row_id
                     left join ${schema}."table" t
                               on r.table_id = t.id
            where t.props ->> 'name' = 'sustainableDevelopment15_2_1_1'
              and r.props ->> 'variableName' in ('forestAreaAnnualNetChangeRate')
              and c.props ->> 'colName' = '2015-2025') as d
      where id = d.col_id;
      update ${schema}.col
      set props = jsonb_set(
              props,
              '{calculateFn}',
              '"(((extentOfForest.forestArea[''2015''] / extentOfForest.forestArea[''2005'']) ** 0.1) - 1) * 100"'
          )
      from (select c.id as col_id
            from ${schema}.col c
                     left join ${schema}.row r
                               on r.id = c.row_id
                     left join ${schema}."table" t
                               on r.table_id = t.id
            where t.props ->> 'name' = 'sustainableDevelopment15_2_1_1'
              and r.props ->> 'variableName' in ('forestAreaAnnualNetChangeRate')
              and c.props ->> 'colName' = '2005-2015') as d
      where id = d.col_id;
  `)
}
