export const getClimaticDomainQuery = (schemaCycle: string) => {
  const variableNames = ['boreal', 'sub_tropical', 'temperate', 'tropical']
  return `
                select country_iso,
                       ${variableNames
                         .map(
                           (variableName) =>
                             `coalesce(max(case when variable_name = '${variableName}' and col_name = 'percentOfForestArea2015' then value ->> 'raw' end),
                                 max(case when variable_name = '${variableName}' and col_name = 'percentOfForestArea2015Default' then value ->> 'raw' end)
                               ) as "${variableName}"`
                         )
                         .join(',\n')}
                from ${schemaCycle}.climaticdomain
                group by country_iso
        `
}
