import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { ODP } from '@core/odp'

export const update = async (props: { id: string; odp: ODP }, client: BaseProtocol = DB): Promise<ODP> => {
  const { id, odp } = props

  return client.one<ODP>(
    `
        UPDATE original_data_point
        SET
            year = $1,
            data_source_additional_comments = $2,
            data_source_methods = $3::jsonb,
            data_source_references = $4,
            description = $5,
            national_classes = $6::jsonb
        WHERE
            id = $7
RETURNING *
    `,
    [
      odp.year,
      odp.dataSourceAdditionalComments,
      JSON.stringify(odp.dataSourceMethods),
      odp.dataSourceReferences,
      odp.description,
      JSON.stringify(odp.nationalClasses),
      id,
    ],
    Objects.camelize
  )
}
