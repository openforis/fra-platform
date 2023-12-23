import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { Contact } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  uuid: string
}

export const removeContact = async (props: Props, client: BaseProtocol = DB): Promise<Contact> => {
  const { assessment, cycle, uuid } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const deletedContact = await client.one<Contact>(
    `
         delete from ${schemaCycle}.node_ext
          where uuid = $1
          returning *
     `,
    [uuid],
    Objects.camelize
  )

  const { countryIso, type, props: contactProps } = deletedContact
  const { rowIndex } = contactProps

  // After deleting a contact, update all the other contacts' row_index for the same country_iso and type
  await client.query(
    `
         update ${schemaCycle}.node_ext
         set props = jsonb_set(props, '{rowIndex}', ((props->>'rowIndex')::int - 1)::text::jsonb)
         where
            (props->>'rowIndex')::int > $1
           and
           country_iso = $2
           and
           type = $3
     `,
    [rowIndex, countryIso, type]
  )

  return deletedContact
}
