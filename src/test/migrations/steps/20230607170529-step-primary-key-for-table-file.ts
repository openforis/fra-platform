import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(`ALTER TABLE assessment_fra.file ADD PRIMARY KEY (id);`)

  await client.query(`ALTER TABLE assessment_paneuropean.file ADD PRIMARY KEY (id);`)
}
