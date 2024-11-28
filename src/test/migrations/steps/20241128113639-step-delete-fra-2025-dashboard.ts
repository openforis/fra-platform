import { BaseProtocol } from 'server/db'

// delete FRA 2025 dashboard
export default async (client: BaseProtocol) => {
  await client.query(`delete from assessment_fra_2025.node_ext where (props->>'region')::boolean = true;`)
}
