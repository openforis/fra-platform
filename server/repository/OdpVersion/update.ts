import { BaseProtocol, DB } from '@server/db'

import { ODP } from '@core/odp'

export const update = async (options: { draft: ODP; draftId: number }, client: BaseProtocol = DB) => {
  const { draft, draftId } = options
  return client.query(
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
