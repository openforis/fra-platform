import '../scriptInit'

import * as fs from 'fs'
import * as path from 'path'
import * as archiver from 'archiver'
import { CSV } from 'tools/utils/CSV'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { Files } from 'meta/file'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { FileStorage } from 'server/service/fileStorage'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

type DBRole = { country_iso: string; role: string }

type DBUser = {
  full_name: string
  email: string
  roles: Array<DBRole>
  profile_picture_file_uuid: string
}

type CSVUser = {
  countryIso: string
  fullName: string
  email: string
  role: string
  fileName: string
}

const transformUser = (user: DBUser, role: DBRole): CSVUser => {
  return {
    countryIso: role.country_iso,
    fullName: user.full_name,
    email: user.email,
    role: role.role,
    fileName: user.profile_picture_file_uuid,
  }
}

const assessmentName = 'fra'
const cycleName = '2025'

const downloadProfilePictures = async () => {
  const users = await client.tx<Array<CSVUser>>(async (tx) => {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, tx)
    const schemaName = Schemas.getNameCycle(assessment, cycle)

    return client
      .map(
        `
        select cus.full_name, cus.email, coalesce(jsonb_agg(cus.role) filter ( where cus.role is not null ), '[]') as roles, u.profile_picture_file_uuid
        from ${schemaName}.country_user_summary cus
        left join public.users u on cus.uuid = u.uuid
        where cus.role is not null and cus.status in ('active') and u.profile_picture_file_uuid is not null and cus.country_iso not like 'X%'
        group by u.profile_picture_file_uuid , cus.full_name, cus.email, cus.lang
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
            const fileStream = await FileStorage.getFile({ key: user.fileName })
            const extension = path.extname(user.fileName) || '.jpg'
            const safeFileName = `${user.fileName}${extension}`
            archive.append(fileStream, { name: safeFileName })
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
