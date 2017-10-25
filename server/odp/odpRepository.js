const db = require('../db/db')
const R = require('ramda')
const Promise = require('bluebird')
const camelize = require('camelize')
const {validateDataPoint} = require('../../common/validateOriginalDataPoint')
const {deleteIssuesByIds, deleteIssues} = require('../review/reviewRepository')
const {checkCountryAccess} = require('../utils/accessControl')
const auditRepository = require('./../audit/auditRepository')

module.exports.saveDraft = (client, countryIso, user, draft) =>
  !draft.odpId ? createOdp(client, countryIso, user)
      .then(newOdpId => updateOrInsertDraft(client, user, newOdpId, countryIso, draft))
    : updateOrInsertDraft(client, user, draft.odpId, countryIso, draft)

const wipeNationalClassIssues = (client, odpId, countryIso, nationalClasses) => {
  const hasClasses = nationalClasses.length > 0
  const classUuids = nationalClasses.map(c => `"${c.uuid}"`)
  const classQueryPlaceholders = R.range(3, nationalClasses.length + 3).map(i => '$' + i).join(',')

  return client.query(
    `
      SELECT
        i.id as issue_id
      FROM issue i
      WHERE i.country_iso = $1
      AND i.section = $2
      AND i.target #> '{params,0}' = '"${odpId}"'
      ${ hasClasses
      ? `AND i.target #> '{params,2}' NOT IN (${classQueryPlaceholders})`
      : `AND i.target #> '{params,1}' = '"class"'`}
    `
    , hasClasses ? [countryIso, 'odp', ...classUuids] : [countryIso, 'odp'])
    .then(res => res.rows.map(r => r.issue_id))
    .then(issueIds => deleteIssuesByIds(client, issueIds))
    .then(() => ({odpId}))
}

const updateOrInsertDraft = (client, user, odpId, countryIso, draft) =>
  auditRepository.insertAudit(client, user.id, 'updateOrInsertDraft', countryIso, 'odp', {odpId})
    .then(() => getDraftId(client, odpId))
    .then(draftId => {
      if (!draftId)
        return insertDraft(client, countryIso, user, odpId, draft)
          .then(() => ({odpId}))
      else
        return updateDraft(client, draft)
          .then(() => wipeNationalClassIssues(client, odpId, countryIso, draft.nationalClasses))
    })

const getDraftId = (client, odpId) =>
  client.query(
    'SELECT draft_id FROM odp WHERE id = $1', [odpId]
  ).then(resp => resp.rows[0].draft_id)

const createOdp = (client, countryIso, user) =>
  client.query('INSERT INTO odp (country_iso ) VALUES ($1)', [countryIso]).then(resp =>
    client.query('SELECT last_value FROM odp_id_seq').then(resp => resp.rows[0].last_value)
  ).then(odpId =>
      Promise.all([odpId, auditRepository.insertAudit(client, user.id, 'createOdp', countryIso, 'odp', {odpId})])
  ).then(([odpId, _]) => odpId)

const insertDraft = (client, countryIso, user, odpId, draft) =>
  client.query(
    `INSERT INTO
     odp_version
     (year,
     description,
     data_source_references,
     data_source_methods,
     data_source_years,
     data_source_applies_to_variables,
     data_source_additional_comments)
     VALUES
     ($1, $2, $3, $4, $5, $6, $7);`,
    [
      draft.year,
      draft.description,
      draft.dataSourceReferences,
      {methods: draft.dataSourceMethods},
      draft.dataSourceYears,
      {variables: draft.dataSourceAppliesToVariables},
      draft.dataSourceAdditionalComments
    ]
  ).then(() => client.query('SELECT last_value AS odp_version_id FROM odp_version_id_seq')
  ).then(result => addClassData(client, result.rows[0].odp_version_id, draft)
  ).then(() =>
    client.query('UPDATE odp SET draft_id = (SELECT last_value FROM odp_version_id_seq) WHERE id = $1', [odpId])
  )

const updateDraft = (client, draft) =>
  client.query(
    'SELECT draft_id FROM odp WHERE id = $1', [draft.odpId]
  ).then((res) => res.rows[0].draft_id
  ).then(draftId => {
      return [draftId, wipeClassData(client, draftId), addClassData(client, draftId, draft)]
    }
  ).then(([draftId, ..._]) =>
    client.query(`
    UPDATE
    odp_version
    SET year = $2,
    description = $3,
    data_source_references = $4,
    data_source_methods = $5,
    data_source_years  = $6,
    data_source_applies_to_variables = $7,
    data_source_additional_comments = $8
    WHERE id = $1;
    `,
      [
        draftId,
        draft.year,
        draft.description,
        draft.dataSourceReferences,
        {methods: draft.dataSourceMethods},
        draft.dataSourceYears,
        {variables: draft.dataSourceAppliesToVariables},
        draft.dataSourceAdditionalComments
      ])
  )

module.exports.deleteDraft = (client, odpId, user) =>
  getAndCheckOdpCountryId(client, odpId, user)
    .then(countryIso => Promise.all([client.query('SELECT actual_id FROM odp WHERE id = $1', [odpId]), countryIso]))
    .then(([actualRes, countryIso]) => {
      const actualId = actualRes.rows[0].actual_id
      return actualId
        ? client.query('UPDATE odp SET draft_id = null WHERE id = $1', [odpId])
          .then(() => getOdpVersionId(client, odpId))
          .then(odpVersionId => getOdpNationalClasses(client, odpVersionId))
          .then(odpClasses => wipeNationalClassIssues(client, odpId, countryIso, odpClasses))
        : deleteOdp(client, odpId, user)
    })

const wipeClassData = (client, odpVersionId) =>
  client.query('DELETE FROM odp_class WHERE odp_version_id = $1', [odpVersionId])

const addClassData = (client, odpVersionId, odp) => {
  const nationalInserts = R.map(
    (nationalClass) => client.query(
      `INSERT INTO odp_class
        (odp_version_id,
        name,
        definition,
        area,
        forest_percent,
        other_wooded_land_percent,
        other_land_percent,
        forest_natural_percent,
        forest_plantation_percent,
        forest_plantation_introduced_percent,
        other_planted_forest_percent,
        other_land_palms_percent,
        other_land_tree_orchards_percent,
        other_land_agroforestry_percent,
        other_land_trees_urban_settings_percent,
        uuid)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);`,
      [
        odpVersionId,
        nationalClass.className,
        nationalClass.definition,
        nationalClass.area,
        nationalClass.forestPercent,
        nationalClass.otherWoodedLandPercent,
        nationalClass.otherLandPercent,
        nationalClass.naturalForestPercent,
        nationalClass.plantationPercent,
        nationalClass.plantationIntroducedPercent,
        nationalClass.otherPlantedPercent,
        nationalClass.otherLandPalmsPercent,
        nationalClass.otherLandTreeOrchardsPercent,
        nationalClass.otherLandAgroforestryPercent,
        nationalClass.otherLandTreesUrbanSettingsPercent,
        nationalClass.uuid
      ]),
    odp.nationalClasses)
  return Promise.all(nationalInserts)
}

module.exports.markAsActual = (client, odpId, user) => {
  const currentOdpPromise = client.query('SELECT actual_id, draft_id FROM odp WHERE id = $1', [odpId])
  const checkCountryAccess = getAndCheckOdpCountryId(client, odpId, user)
  const updateOdpPromise = client.query(
    'UPDATE odp SET actual_id = draft_id, draft_id = null WHERE id = $1 AND draft_id IS NOT NULL', [odpId]
  )
  return Promise.join(currentOdpPromise, checkCountryAccess, updateOdpPromise, (oldActualResult, countryIso) => {
    if (oldActualResult.rowCount > 0 && oldActualResult.rows[0].draft_id) {
      return ({oldActualId: oldActualResult.rows[0].actual_id, countryIso})
    }
    return ({countryIso})
  })
    .then(({countryIso, oldActualId}) => {
      const audit = auditRepository.insertAudit(client, user.id, 'markAsActual', countryIso, 'odp', {odpId})
      return Promise.all([audit, oldActualId])
    })
    .then(([_, oldActualId]) => {
      if (oldActualId) {
        return Promise.all([
          wipeClassData(client, oldActualId),
          client.query('DELETE FROM odp_version WHERE id = $1', [oldActualId])])
      }
      return null
    })
}

const getAndCheckOdpCountryId = (client, odpId, user) =>
  client.query('SELECT country_iso FROM odp WHERE id = $1', [odpId])
    .then(res => {
      const countryIso = res.rows[0].country_iso
      checkCountryAccess(countryIso, user)
      return countryIso
    })

module.exports.getAndCheckOdpCountryId = getAndCheckOdpCountryId

const deleteOdp = (client, odpId, user) =>
      getAndCheckOdpCountryId(client, odpId, user)
        .then( countryIso =>
         Promise.all([countryIso, auditRepository.insertAudit(client, user.id, 'deleteOdp', countryIso, 'odp', {odpId})])
        )
        .then(([countryIso, _]) =>
          Promise.all([
            client.query('SELECT actual_id, draft_id FROM odp WHERE id = $1', [odpId]),
            countryIso])
        ).then(([selectResult, countryIso]) =>
        client.query('DELETE FROM odp WHERE id = $1', [odpId])
          .then(() => [selectResult.rows[0].draft_id, selectResult.rows[0].actual_id, countryIso])
      ).then(([draftId, actualId, countryIso]) => {
        return Promise.all([
          draftId
            ? wipeClassData(client, draftId)
            .then(() => client.query('DELETE FROM odp_version WHERE id = $1', [draftId]))
            : Promise.resolve(),
          actualId
            ? wipeClassData(client, actualId)
            .then(() => client.query('DELETE FROM odp_version WHERE id = $1', [actualId]))
            : Promise.resolve(),
          deleteIssues(client, countryIso, 'odp', 0, odpId)
        ])
      })

module.exports.deleteOdp = deleteOdp

const getOdpVersionId = (queryProvider, odpId) =>
  queryProvider.query(
    `
        SELECT
          CASE WHEN draft_id IS NULL
            THEN actual_id
            ELSE draft_id
          END AS version_id
        FROM odp
        WHERE id = $1
        `
    , [odpId]
  ).then(result => result.rows[0].version_id)

const getOdpNationalClasses = (queryProvider, odpVersionId) =>
  queryProvider.query(
    `SELECT
      name,
      definition,
      area,
      forest_percent,
      other_wooded_land_percent,
      other_land_percent,
      forest_natural_percent,
      forest_plantation_percent,
      forest_plantation_introduced_percent,
      other_planted_forest_percent,
      other_land_palms_percent,
      other_land_tree_orchards_percent,
      other_land_agroforestry_percent,
      other_land_trees_urban_settings_percent,
      uuid
     FROM odp_class
     WHERE odp_version_id = $1`
    ,
    [odpVersionId])
    .then(result => R.map(row => ({
      className: row.name,
      definition: row.definition,
      area: row.area,
      forestPercent: row.forest_percent,
      otherWoodedLandPercent: row.other_wooded_land_percent,
      otherLandPercent: row.other_land_percent,
      naturalForestPercent: row.forest_natural_percent,
      plantationPercent: row.forest_plantation_percent,
      plantationIntroducedPercent: row.forest_plantation_introduced_percent,
      otherPlantedPercent: row.other_planted_forest_percent,
      otherLandPalmsPercent: row.other_land_palms_percent,
      otherLandTreeOrchardsPercent: row.other_land_tree_orchards_percent,
      otherLandAgroforestryPercent: row.other_land_agroforestry_percent,
      otherLandTreesUrbanSettingsPercent: row.other_land_trees_urban_settings_percent,
      uuid: row.uuid
    }), result.rows))

const getOdp = odpId =>
  getOdpVersionId(db, odpId)
    .then(versionId =>
      Promise.all([versionId, getOdpNationalClasses(db, versionId)])
    )
    .then(([versionId, nationalClasses]) =>
      Promise.all([db.query(
        `SELECT
          p.id AS odp_id,
          p.country_iso,
          v.year,
          v.description,
          v.data_source_references,
          v.data_source_methods,
          v.data_source_years,
          v.data_source_applies_to_variables,
          v.data_source_additional_comments,
          CASE
            WHEN (p.draft_id IS NOT NULL) AND (p.actual_id IS NOT NULL) THEN 'actualDraft'
            WHEN (p.draft_id IS NOT NULL) AND (p.actual_id IS NULL) THEN 'newDraft'
            WHEN (p.draft_id IS NULL) AND (p.actual_id IS NOT NULL) THEN 'noChanges'
            ELSE 'unknown' -- Should never happen
          END AS edit_status
        FROM odp p
        JOIN odp_version v
        ON v.id = $2
        WHERE p.id = $1
        `, [odpId, versionId]),
        nationalClasses])
    ).then(([result, nationalClasses]) => {
        const camelizedResult = camelize(result.rows[0])
        const dataSourceMethods = R.path(['dataSourceMethods', 'methods'], camelizedResult)
        const dataSourceAppliesToVariables = R.path(['dataSourceAppliesToVariables', 'variables'], camelizedResult)
        return {...camelizedResult, nationalClasses, dataSourceMethods, dataSourceAppliesToVariables}
      }
    )

module.exports.getOdp = getOdp

const eofReducer = (results, row, type = 'fra') => R.assoc(`odp_${row.year}`,
  {
    odpId: row.odp_id,
    forestArea: row.forest_area,
    otherWoodedLand: row.other_wooded_land_area,
    otherLand: row.other_land_area,
    otherLandPalms: row.other_land_palms,
    otherLandTreeOrchards: row.other_land_tree_orchards,
    otherLandAgroforestry: row.other_land_agroforestry,
    otherLandTreesUrbanSettings: row.other_land_trees_urban_settings,
    name: row.year + '',
    type: 'odp',
    year: Number(row.year),
    draft: row.draft
  },
  results)

const focReducer = (results, row, type = 'fra') => R.assoc(`odp_${row.year}`,
  {
    odpId: row.odp_id,
    naturalForestArea: row.natural_forest_area,
    plantationForestArea: row.plantation_forest_area,
    plantationForestIntroducedArea: row.plantation_forest_introduced_area,
    otherPlantedForestArea: row.other_planted_forest_area,
    name: row.year + '',
    type: 'odp',
    year: Number(row.year),
    draft: row.draft
  },
  results)

module.exports.readEofOdps = (countryIso) =>
  db.query(`
        SELECT
          p.id as odp_id,
          v.year,
          SUM(c.area * c.forest_percent / 100.0) AS forest_area,
          SUM(c.area * c.other_wooded_land_percent / 100.0) AS other_wooded_land_area,
          SUM(c.area * c.other_land_percent / 100.0) AS other_land_area,
          SUM(c.area * c.other_land_palms_percent * c.other_land_percent / 10000.0) AS other_land_palms,
          SUM(c.area * c.other_land_tree_orchards_percent * c.other_land_percent / 10000.0) AS other_land_tree_orchards,
          SUM(c.area * c.other_land_agroforestry_percent * c.other_land_percent / 10000.0) AS other_land_agroforestry,
          SUM(c.area * c.other_land_trees_urban_settings_percent * c.other_land_percent / 10000.0) AS other_land_trees_urban_settings,
          CASE
            WHEN p.draft_id IS NULL
            THEN FALSE
            ELSE TRUE
          END AS draft
        FROM odp p
        JOIN odp_version v
        ON v.id =
          CASE WHEN p.draft_id IS NULL
          THEN p.actual_id
          ELSE p.draft_id
        END
        LEFT OUTER JOIN odp_class c
          ON c.odp_version_id = v.id
        WHERE p.country_iso = $1 AND year IS NOT NULL
        GROUP BY odp_id, v.year, draft
        `
    , [countryIso]).then(result => R.reduce(eofReducer, {}, result.rows))

module.exports.readFocOdps = (countryIso) =>
  db.query(`
        SELECT
          p.id as odp_id,
          v.year,
          SUM(c.area * c.forest_percent * c.forest_natural_percent / 10000.0) AS natural_forest_area,
          SUM(c.area * c.forest_percent * c.forest_plantation_percent / 10000.0) AS plantation_forest_area,
          SUM(c.area * c.forest_percent * c.forest_plantation_percent * c.forest_plantation_introduced_percent / 1000000.0) AS plantation_forest_introduced_area,
          SUM(c.area * c.forest_percent * c.other_planted_forest_percent / 10000.0) AS other_planted_forest_area,
        CASE
          WHEN p.draft_id IS NULL
          THEN FALSE
          ELSE TRUE
        END AS draft
        FROM odp p
        JOIN odp_version v
        ON v.id =
          CASE WHEN p.draft_id IS NULL
          THEN p.actual_id
          ELSE p.draft_id
        END
        LEFT OUTER JOIN odp_class c
          ON c.odp_version_id = v.id
        WHERE p.country_iso = $1 AND year IS NOT NULL
        GROUP BY odp_id, v.year, draft
        `
    , [countryIso]).then(result => R.reduce(focReducer, {}, result.rows))

const listOriginalDataPoints = countryIso =>
  db.query(`SELECT p.id as odp_id FROM odp p WHERE country_iso = $1`, [countryIso])
    .then(res => Promise.all(res.rows.map(r => getOdp(r.odp_id))))
    .then(odps => R.pipe(R.sortBy(R.prop('year')), R.reverse)(R.values(odps)))

module.exports.listOriginalDataPoints = listOriginalDataPoints

module.exports.listAndValidateOriginalDataPoints = countryIso =>
  listOriginalDataPoints(countryIso)
    .then(odps => R.map(odp => R.assoc('validationStatus', validateDataPoint(odp), odp), odps))


