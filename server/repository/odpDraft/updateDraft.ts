import { OdpClassRepository } from '@server/repository'

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
