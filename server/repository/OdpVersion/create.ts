import { BaseProtocol, DB } from '@server/db'

import { ODP } from '@core/odp'

export const create = async (options: { draft: ODP }, client: BaseProtocol = DB) => {
  const { draft } = options
  const res = await client.query(
    `
  INSERT INTO odp_version
    (year, description, data_source_references, data_source_methods, data_source_additional_comments)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id;`,
    [
      draft.year,
      draft.description,
      draft.dataSourceReferences,
      { methods: draft.dataSourceMethods },
      draft.dataSourceAdditionalComments,
    ]
  )

  return res?.[0]?.id
}
