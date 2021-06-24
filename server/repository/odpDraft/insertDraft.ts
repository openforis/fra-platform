import { OdpClassRepository } from '@server/repository'

export const insertDraft = async (client: any, _countryIso: any, _user: any, odpId: any, draft: any) => {
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
