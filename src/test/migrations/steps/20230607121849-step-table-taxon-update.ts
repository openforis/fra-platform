import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(
    `
      INSERT INTO ext_data.taxon(code, family, scientific_name) VALUES
        ((SELECT max(code::int) + 1 FROM ext_data.taxon), 'Myrtaceae', 'Eucalyptus sp')
    `
  )
}
