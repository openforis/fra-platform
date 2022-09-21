export const asQueryStringArray = (arr: string[]) => `(${arr.map((v) => `'${v}'`).join(',')})`
const genders = ['total', 'female', 'male']
export const getEmploymentQuery = (schemaCycle: string) => {
  const variableNames = [
    'employment_in_forestry_and_logging',
    'of_which_gathering_of_non_wood_forest_products',
    'of_which_logging',
    'of_which_silviculture_and_other_forestry_activities',
    'of_which_support_services_to_forestry',
  ]
  return `
      select country_iso,
             x.year                                as year,
             ${variableNames.map((variableName) =>
               genders
                 .map(
                   (gender) =>
                     `max(case when variable_name = '${variableName}' and
                              col_name ilike year || '_${gender}'
                              then value ->> 'raw' end) as ${variableName}_${gender}`
                 )
                 .join(',\n')
             )}
      from ${schemaCycle}.employment
               inner join (select country_iso,
                                  regexp_replace(col_name, '_.*', '') as year
                           from ${schemaCycle}.employment
                           group by 1, 2) x using (country_iso)
      where variable_name in ${asQueryStringArray(variableNames)}
      group by 1, 2
  `
}
export const getGraduationOfStudentsQuery = (schemaCycle: string) => {
  const variableNames = ['bachelors_degree', 'doctoral_degree', 'masters_degree', 'technician_certificate', 'total']
  return `
      select country_iso,
             x.year as year,
 ${variableNames.map((variableName) =>
   genders
     .map(
       (gender) =>
         `
                      max(case when variable_name = '${variableName}' and
                          col_name ilike year || '_${gender}'
                         then value ->> 'raw' end) as ${variableName}_${gender}`
     )
     .join(',\n')
 )}

      from ${schemaCycle}.graduationofstudents
               inner join (select country_iso,
                                  regexp_replace(col_name, '_.*', '') as year
                           from ${schemaCycle}.graduationofstudents
                           group by 1, 2) x using (country_iso)
      where variable_name in ${asQueryStringArray(variableNames)}
      group by 1, 2
  `
}
