import * as fs from 'fs'
import * as path from 'path'

import { BaseProtocol } from 'server/db'

async function insertFile(client: BaseProtocol, year: number, filePath: string) {
  const _filePath = path.join(__dirname, filePath)
  const fileName = path.basename(_filePath)
  const fileData = fs.readFileSync(_filePath)

  const { uuid: fileUuid } = await client.one(
    `
    insert into public.file (name, file)
    values ($1, $2)
    returning uuid;
  `,
    [fileName, fileData]
  )

  await client.query(
    `
    update assessment_fra_${year}.repository
    set file_uuid = $1, link = null
    where link ilike '/api/file/sdg-focal-points%';
  `,
    [fileUuid]
  )
}

export default async (client: BaseProtocol) => {
  await insertFile(client, 2025, './data/NSO SDG Contact Persons_as of 17.10.2023.xlsx')
  await insertFile(client, 2020, './data/NSO_SDG_Contact_Persons_en.xlsx')
}
