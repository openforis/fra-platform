const R = require('ramda')
const db = require('../db/db')
const camelize = require('camelize')

/*
 * Determine the "overall status" from multiple statuses.
 * For example, one review is enough to determine that overall
 * the whole country is in review.
 * If all statuses are in accepted, we determine that country is in
 * accepted status.
 */
const determineCountryAssessmentStatus = (type, statuses) => R.pipe(
  R.filter(R.propEq('type', type)),
  R.head,
  R.defaultTo({status: 'editing'}), //Initially, there are no rows for country's assessment,
  //this is also considered to be 'editing' status
  R.prop('status')
)(statuses)

const determineRole = roles => countryIso =>
  R.pipe(R.filter(R.propEq('countryIso', countryIso)), R.head, R.prop('role'))(roles)

const getStatuses = groupedRows =>
  R.pipe(
    R.map(R.pick(['type', 'status'])),
    R.filter(R.identity)
  )(groupedRows)

const getCountryProperties = country => ({
  countryIso: country.countryIso,
  region: country.region,
  listName: {
    en: country.listNameEn,
    es: country.listNameEs,
    fr: country.listNameFr,
    ru: country.listNameRu
  },
  fullName: {
    en: country.fullNameEn,
    es: country.fullNameEs,
    fr: country.fullNameFr,
    ru: country.fullNameRu
  },
  panEuropean : country.panEuropean,
  lastEdit: country.lastEdited
})

const handleCountryResult = resolveRole => result => {
  const grouped = R.groupBy(row => row.countryIso, camelize(result.rows))
  return R.pipe(
    R.toPairs,
    R.map(
      ([countryIso, vals]) => {
        return {
          ...getCountryProperties(vals[0]),
          annualAssessment: determineCountryAssessmentStatus('annuallyUpdated', getStatuses(vals)),
          fra2020Assessment: determineCountryAssessmentStatus('fra2020', getStatuses(vals)),
          role: resolveRole(countryIso),
        }
      }),
    R.groupBy(R.prop('role'))
  )(grouped)
}

const getAllCountries = role => {
  const excludedMsgs = ['createIssue', 'createComment', 'deleteComment']
  return db.query(`
    WITH fa AS (
      SELECT country_iso, to_char(max(time), 'YYYY-MM-DD"T"HH24:MI:ssZ') as last_edited
      FROM fra_audit
      WHERE NOT (message in ($1))
      GROUP BY country_iso
    )
    SELECT
      c.country_iso, c.region, c.list_name_en, c.full_name_en, c.list_name_es, c.full_name_es, c.list_name_fr, c.full_name_fr, c.list_name_ru, c.full_name_ru, c.pan_european,
      a.type, a.status,
      fa.last_edited
    FROM
      country c
    LEFT OUTER JOIN
      assessment a ON c.country_iso = a.country_iso
    LEFT OUTER JOIN
      fa ON fa.country_iso = c.country_iso
    ORDER BY list_name_en ASC`, [excludedMsgs])
    .then(handleCountryResult(() => role))
}

const getAllCountriesList = async () => {
   const rs = await db.query(`
    SELECT
        c.country_iso, 
        c.region, 
        c.list_name_en, 
        c.full_name_en, 
        c.list_name_es, 
        c.full_name_es, 
        c.list_name_fr, 
        c.full_name_fr, 
        c.list_name_ru, 
        c.full_name_ru, 
        c.pan_european
    FROM
      country c
    ORDER BY 
        c.country_iso
   `)
  return camelize(rs.rows)
}

const getAllowedCountries = roles => {
  const hasRole = (role) => R.find(R.propEq('role', role), roles)
  if (hasRole('ADMINISTRATOR')) {
    return getAllCountries('ADMINISTRATOR')
  } else {
    const excludedMsgs = ['createIssue', 'createComment', 'deleteComment']
    const allowedCountryIsos = R.pipe(R.map(R.prop('countryIso')), R.reject(R.isNil))(roles)
    const allowedIsoQueryPlaceholders = R.range(2, allowedCountryIsos.length + 2).map(i => '$' + i).join(',')
    return db.query(`
      WITH fa AS (
        SELECT country_iso, to_char(max(time), 'YYYY-MM-DD"T"HH24:MI:ssZ') as last_edited
        FROM fra_audit
        WHERE country_iso in (${allowedIsoQueryPlaceholders})
        AND NOT (message in ($1))
        GROUP BY country_iso
      )
      SELECT
        c.country_iso, c.region, c.list_name_en, c.full_name_en, c.list_name_es, c.full_name_es, c.list_name_fr, c.full_name_fr, c.list_name_ru, c.full_name_ru, c.pan_european,
        a.type, a.status,
        fa.last_edited
      FROM
        country c
      LEFT OUTER JOIN
        assessment a ON c.country_iso = a.country_iso
      LEFT OUTER JOIN
        fa ON fa.country_iso = c.country_iso
      WHERE c.country_iso in (${allowedIsoQueryPlaceholders})
      ORDER BY list_name_en ASC`,
      [excludedMsgs, ...allowedCountryIsos])
      .then(handleCountryResult(determineRole(roles)))
  }
}

const getDynamicCountryConfiguration = async countryIso => {
  const result = await db.query(`
      SELECT config
        FROM dynamic_country_configuration
        WHERE country_iso = $1
    `,
    [countryIso])
  if (result.rows.length === 0) return {}
  return result.rows[0].config
}

const saveDynamicConfigurationVariable = async (client, countryIso, key, value) => {
  const configResult = await client.query(
    'SELECT config FROM dynamic_country_configuration WHERE country_iso = $1',
    [countryIso]
  )
  if (configResult.rows.length > 0) {
    await client.query(
      `UPDATE dynamic_country_configuration
       SET config = $1
       WHERE country_iso = $2`,
      [{...configResult.rows[0].config, [key]: value}, countryIso]
    )
  } else {
    await client.query(
      `INSERT INTO dynamic_country_configuration
       (country_iso, config)
       VALUES
       ($1, $2)`,
      [countryIso, {[key]: value}]
    )
  }
}

const getCountry = countryIso =>
  db.query(`
    SELECT
      c.country_iso, c.list_name_en, c.full_name_en, c.list_name_es, c.full_name_es, c.list_name_fr, c.full_name_fr, c.list_name_ru, c.full_name_ru, c.pan_european
    FROM country c
    WHERE c.country_iso = $1
  `,[countryIso])
    .then(res => getCountryProperties(camelize(res.rows[0])))

module.exports.getAllowedCountries = getAllowedCountries
module.exports.getAllCountriesList = getAllCountriesList
module.exports.getDynamicCountryConfiguration = getDynamicCountryConfiguration
module.exports.saveDynamicConfigurationVariable = saveDynamicConfigurationVariable
module.exports.getFirstAllowedCountry = roles =>
  getAllowedCountries(roles).then(result => R.pipe(R.values, R.head, R.head)(result))
module.exports.getCountry = getCountry
