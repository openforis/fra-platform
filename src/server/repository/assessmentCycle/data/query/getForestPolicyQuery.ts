import { asQueryStringArray } from './genderTables'

export const getForestPolicyQuery = (schemaCycle: string) => {
  const variableNames = [
    'existence_of_traceability_system',
    'legislations_supporting_SFM',
    'platform_for_stakeholder_participation',
    'policies_supporting_SFM',
  ]
  return `
        select country_iso,
               ${variableNames
                 .map(
                   (variableName) => `
                max(
                 case
                     when
                                 variable_name = '${variableName}' and
                                 col_name = 'national_yes_no'
                         then value ->> 'raw' end) as national_${variableName},
               max(
                 case
                     when
                                 variable_name = '${variableName}' and
                                 col_name = 'sub_national_yes_no'
                         then value ->> 'raw' end) as sub_national_${variableName}
               `
                 )
                 .join(',\n')}
        from ${schemaCycle}.forestpolicy
        where variable_name in ${asQueryStringArray(variableNames)}
        group by 1
    `
}
