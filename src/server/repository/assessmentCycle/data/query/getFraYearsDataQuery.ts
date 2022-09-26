import { asQueryStringArray, getEmploymentQuery, getGraduationOfStudentsQuery } from './genderTables'
import { getAreaOfPermanentForestEstateQuery } from './getAreaOfPermanentForestEstateQuery'
import { getClimaticDomainQuery } from './getClimaticDomainQuery'
import { getForestPolicyQuery } from './getForestPolicyQuery'
import { ODPQuery } from './getODPTableQuery'
import { getRegionsQuery } from './getRegionsQuery'
import { getYearsQuery } from './getYearsQuery'
import { specialTables, tables, TableType } from './tables'

type Props = {
  schemaCycle: string
  table: TableType
}

const getTableQuery = (props: Props) => {
  const { schemaCycle, table } = props
  return `
  ${table.tableName} as (select country_iso,
                                col_name                        as year,
                               ${Object.keys(table.variableNames)
                                 .map(
                                   (variableName) =>
                                     `max(case when variable_name = '${variableName}' then value ->> 'raw' end)      as ${variableName}`
                                 )
                                 .join(',\n')}
                        from ${schemaCycle}.${table.tableName}
                        where variable_name in ${asQueryStringArray(Object.keys(table.variableNames))}
                        group by 1, 2)
  `
}

const getJoinClause = (tables: Array<TableType>) =>
  tables.map((table) => `left join ${table.tableName} using (country_iso, year)`).join('\n')

const getSelectClause = (tables: Array<TableType>) =>
  tables
    .map((table) =>
      Object.entries(table.variableNames)
        .map(([field, as]) => `${table.tableName}.${field} as "${as}"`)
        .join(', \n')
    )
    .sort((a: string, b: string) => {
      const anchorRegex = /(\d[a-z])/
      return anchorRegex.exec(a)[1].localeCompare(anchorRegex.exec(b)[1])
    })
    .join(',\n')

// Specials
const getCarbonStockSoilDepthQuery = (schemaCycle: string) => `
        select country_iso,
               max(case when variable_name = 'soil_depth' then value ->> 'raw' end) as soil_depth
        from ${schemaCycle}.carbonstocksoildepth
        where variable_name in (
            'soil_depth'
            )
        group by 1`
const getDegradedForestQuery = (schemaCycle: string) => `
    select country_iso,
           max(case when variable_name = 'does_country_monitor' then value ->> 'raw' end) as does_country_monitor
    from ${schemaCycle}.degradedforest
    where variable_name in (
        'does_country_monitor'
        )
    group by 1`

const getJoinClauseSpecialTables = (specialTables: TableType[]) => {
  const specialJoin = (table: TableType) => {
    const { joinOn } = table
    const [baseTable, columnName] = joinOn.split('.')
    return `left join ${table.tableName} on (${baseTable}.${columnName} = ${table.tableName}.${columnName})`
  }
  const defaultJoin = (table: TableType) => {
    return `left join ${table.tableName} using (country_iso, year)`
  }

  return specialTables.map((table) => (table.joinOn ? specialJoin(table) : defaultJoin(table))).join('\n')
}

export const getFraYearsDataQuery = (schemaCycle: string) => `
    with ${tables.map((table) => getTableQuery({ schemaCycle, table })).join(', ')},
     carbonstocksoildepth as (${getCarbonStockSoilDepthQuery(schemaCycle)}),
     degradedforest as (${getDegradedForestQuery(schemaCycle)}),
    forestpolicy as (${getForestPolicyQuery(schemaCycle)}),
    areaofpermanentforestestate as (${getAreaOfPermanentForestEstateQuery(schemaCycle)}),
    employment as (${getEmploymentQuery(schemaCycle)}),
    graduationofstudents as (${getGraduationOfStudentsQuery(schemaCycle)}),
    
-- tables with original data point
    ${ODPQuery.extentOfForest.subquery(schemaCycle)},
    ${ODPQuery.forestCharacteristics.subquery(schemaCycle)},

-- other
     climaticdomain as (${getClimaticDomainQuery(schemaCycle)}),
     _regions as (${getRegionsQuery(schemaCycle)}),
     _years as (${getYearsQuery(schemaCycle)})
select r.regions,
    cc.country_iso,
    y.year,
    boreal,
    temperate,
    tropical,
    sub_tropical as subtropical,
    ${getSelectClause([...ODPQuery.tables, ...tables, ...specialTables])}

from ${schemaCycle}.country cc
    join _regions r using (country_iso)
    join _years y using (country_iso)
    join climaticdomain c using (country_iso)
    ${getJoinClause([...ODPQuery.tables, ...tables])}
-- special cases
    ${getJoinClauseSpecialTables(specialTables)}

where cc.country_iso not ilike 'X%'
`
