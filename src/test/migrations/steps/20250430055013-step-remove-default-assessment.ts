import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(`
    update assessment
    set props = props #- '{defaultCycle}'
  `)
}
