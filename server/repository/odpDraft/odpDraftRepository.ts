import { OdpClassRepository } from '@server/repository'

export const getDraftId = async (client: any, odpId: any) => {
  const [{ draft_id: draftId }] = await client.query('SELECT draft_id FROM odp WHERE id = $1', [odpId])
  return draftId
}

export const updateDraft = async (client: any, draft: any) => {
  const [{ draft_id: draftId }] = await client.query('SELECT draft_id FROM odp WHERE id = $1', [draft.odpId])

  await OdpClassRepository.wipeClassData(client, draftId)
  await OdpClassRepository.addClassData(client, draftId, draft)

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

  const [{ odp_version_id: odpVersionId }] = await client.query(
    'SELECT last_value AS odp_version_id FROM odp_version_id_seq'
  )
  await OdpClassRepository.addClassData(client, odpVersionId, draft)

  return client.query('UPDATE odp SET draft_id = (SELECT last_value FROM odp_version_id_seq) WHERE id = $1', [odpId])
}
