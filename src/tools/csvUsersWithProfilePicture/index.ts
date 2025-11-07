import '../scriptInit'

import * as fs from 'fs'
import * as path from 'path'
import * as archiver from 'archiver'
import { CSV } from 'tools/utils/CSV'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { Files } from 'meta/file'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { AssessmentController } from 'server/controller/assessment'
import { FileStorage } from 'server/service/fileStorage'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

type DBRole = { country_iso: string; role: string }

type DBUser = {
  full_name: string
  email: string
  roles: Array<DBRole>
  profile_picture_file_uuid: string
  file_name: string
}

type CSVUser = {
  countryIso: string
  fullName: string
  email: string
  role: string
  fileName: string
}

const transformUser = (user: DBUser, role: DBRole): CSVUser => {
  const originalFileName = path.parse(user.file_name).name
  const originalExtension = path.extname(user.file_name)
  return {
    countryIso: role.country_iso,
    fullName: user.full_name,
    email: user.email,
    role: role.role,
    fileName: `${originalFileName}_${user.profile_picture_file_uuid}${originalExtension}`,
  }
}

const assessmentName = 'fra'
const cycleName = '2025'

const downloadProfilePictures = async (): Promise<void> => {
  const users = await client.tx<Array<CSVUser>>(async (tx) => {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, tx)
    const schemaName = Schemas.getNameCycle(assessment, cycle)

    return client
      .map(
        `
        select cus.full_name, cus.email, coalesce(jsonb_agg(cus.role) filter ( where cus.role is not null ), '[]') as roles, 
               u.profile_picture_file_uuid, f.name as file_name
        from ${schemaName}.country_user_summary cus
        left join public.users u on cus.uuid = u.uuid
        left join public.file f on u.profile_picture_file_uuid = f.uuid
        where cus.role is not null and cus.status in ('active') and u.profile_picture_file_uuid is not null and cus.country_iso not like 'X%'
        group by u.profile_picture_file_uuid, f.name, cus.full_name, cus.email, cus.lang
        order by full_name asc
      `,
        [],
        (dbuser: DBUser) => dbuser.roles.map((r) => transformUser(dbuser, r))
      )
      .then((results) => results.flat())
  })

  users.sort((a, b) => {
    const countryComparison = a.countryIso.localeCompare(b.countryIso)
    if (countryComparison !== 0) return countryComparison

    const nameComparison = a.fullName.localeCompare(b.fullName)
    if (nameComparison !== 0) return nameComparison

    return a.role.localeCompare(b.role)
  })

  // Write to CSV
  const fileName = `users_${assessmentName}_${cycleName}`
  await CSV.write(users, fileName)

  Logger.info('Starting profile picture download')

  // Create zip file with profile pictures
  const zipFileName = `avatars_${assessmentName}_${cycleName}.zip`
  const output = fs.createWriteStream(path.join('tmp', zipFileName))
  const archive = archiver('zip', { zlib: { level: 9 } })

  return new Promise<void>((resolve, reject) => {
    output.on('close', () => {
      Logger.info(`Archive created, size: ${Files.humanReadableSize(archive.pointer())}`)
      resolve()
    })

    archive.on('error', (err) => {
      reject(err)
    })

    archive.pipe(output)

    // Track downloaded files to avoid duplicates
    const downloadedFiles = new Set<string>()

    // Download and add each profile picture to the zip
    Promise.all(
      users
        .filter((user) => user.fileName)
        .map(async (user) => {
          try {
            // Skip if already downloaded
            if (downloadedFiles.has(user.fileName)) {
              return
            }

            downloadedFiles.add(user.fileName)
            const fileUuid = path.parse(user.fileName).name.split('_').pop()
            const fileStream = await FileStorage.File.get({ key: fileUuid })
            const name = user.fileName
            archive.append(fileStream, { name })
          } catch (error) {
            Logger.error(`Failed to fetch profile picture for ${user.fullName}: ${error.message}`)
          }
        })
    )
      .then(() => archive.finalize())
      .catch(reject)
  })
}

ToolsUtils.exec(downloadProfilePictures)
