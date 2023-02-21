with values as (select n.country_iso,
                       r.uuid as row_uuid,
                       c.uuid as col_uuid,
                       n.value as value_orig,
                       ext_n.value as value_ext
                from assessment_fra_2025.node n
                         left join assessment_fra.row r
                                   on r.uuid = n.row_uuid
                         left join assessment_fra.col c
                                   on c.uuid = n.col_uuid
                         left join assessment_fra."table" t
                                   on t.id = r.table_id
                         left join assessment_fra_2025.node_ext ext_n on ext_n.table_name = t.props ->> 'name' and ext_n.variable_name = r.props ->> 'variableName' and ext_n.col_name = c.props ->> 'colName' and ext_n.country_iso = n.country_iso
                where t.props ->> 'name' = 'sustainableDevelopment15_2_1_5'
                order by 1, 2, 3
)
UPDATE assessment_fra_2025.node n
SET value = v.value_ext
FROM values v
WHERE n.country_iso = v.country_iso
  AND n.row_uuid = v.row_uuid
  AND n.col_uuid = v.col_uuid
  AND v.value_ext is not null
