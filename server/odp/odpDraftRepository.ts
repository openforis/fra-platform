import { insertAudit } from '../repository/audit/auditRepository'

import { wipeNationalClassIssues, wipeClassData, addClassData } from './odpClassRepository'

export const getDraftId = async (client: any, odpId: any) => {
  const res = await client.query('SELECT draft_id FROM odp WHERE id = $1', [odpId])
  return res.rows[0].draft_id
}

export const updateOrInsertDraft = async (client: any, user: any, odpId: any, countryIso: any, draft: any) => {
  const draftId = await getDraftId(client, odpId)

  if (draftId) {
    await updateDraft(client, draft)
    await wipeNationalClassIssues(client, odpId, countryIso, draft.nationalClasses)
  } else {
    await insertDraft(client, countryIso, user, odpId, draft)
  }

  await insertAudit(client, user.id, 'updateOrInsertDraft', countryIso, 'odp', { odpId })

  return { odpId }
}

export const updateDraft = async (client: any, draft: any) => {
  const res = await client.query('SELECT draft_id FROM odp WHERE id = $1', [draft.odpId])
  const draftId = res.rows[0].draft_id

  await wipeClassData(client, draftId)
  await addClassData(client, draftId, draft)

  await client.query(
    `
    UPDATE
      odp_version
    SET year = $2,
      description = $3,
      data_source_references = $4,
      data_source_methods = $5,
      data_source_additional_comments = $6
    WHERE id = $1;
    `,
    [
      draftId,
      draft.year,
      draft.description,
      draft.dataSourceReferences,
      { methods: draft.dataSourceMethods },
      draft.dataSourceAdditionalComments,
    ]
  )
}

export const insertDraft = async (client: any, countryIso: any, user: any, odpId: any, draft: any) => {
  await client.query(
    `
  INSERT INTO odp_version
    (year, description, data_source_references, data_source_methods, data_source_additional_comments)
  VALUES ($1, $2, $3, $4, $5);`,
    [
      draft.year,
      draft.description,
      draft.dataSourceReferences,
      { methods: draft.dataSourceMethods },
      draft.dataSourceAdditionalComments,
    ]
  )

  const resOdpVersionId = await client.query('SELECT last_value AS odp_version_id FROM odp_version_id_seq')
  await addClassData(client, resOdpVersionId.rows[0].odp_version_id, draft)

  return await client.query('UPDATE odp SET draft_id = (SELECT last_value FROM odp_version_id_seq) WHERE id = $1', [
    odpId,
  ])
}

export default {
  updateOrInsertDraft,
}
