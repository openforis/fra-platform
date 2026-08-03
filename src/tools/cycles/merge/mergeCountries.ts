import { PropsMerge } from 'tools/cycles/merge/_types'
import { getSchemas } from 'tools/cycles/merge/_utils'

import { BaseProtocol } from 'server/db/db'

export const mergeCountries = async (props: PropsMerge, client: BaseProtocol): Promise<void> => {
  const { countryISOs } = props

  const { schemaCycleFrom, schemaCycleTo } = getSchemas(props)
  const params = { countryISOs }

  await client.query(
    `
        delete
        from ${schemaCycleTo}.country
        where country_iso in ($(countryISOs:list));

        insert into ${schemaCycleTo}.country
          (country_iso, props, status, last_update, last_edit, last_edit_odp, last_in_editing,
           last_in_review, last_in_approval, last_in_accepted, last_in_published)
        select f.country_iso,
               f.props,
               f.status,
               f.last_update,
               f.last_edit,
               f.last_edit_odp,
               f.last_in_editing,
               f.last_in_review,
               f.last_in_approval,
               f.last_in_accepted,
               f.last_in_published
        from ${schemaCycleFrom}.country f
        where f.country_iso in ($(countryISOs:list));
    `,
    params
  )
}
