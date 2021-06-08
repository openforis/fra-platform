import * as schedule from 'node-schedule'
import * as versioningRepository from '../../repository/versioning/versioningRepository'

export * as versioningRepository from '../../repository/versioning/versioningRepository'

const handleNewVersion = async (version: any) => {
  const { id, versionNumber } = version

  try {
    await versioningRepository.updateVersionStatus(id, 'running')

    try {
      await versioningRepository.newSchemaVersion(`public_${versionNumber}`)
    } catch (error) {
      console.error('Failed to create new schema version!')
      console.error(error)
      throw error
    }

    await versioningRepository.updateVersionStatus(id, 'completed')
  } catch (error) {
    await versioningRepository.updateVersionStatus(id, 'failed')
    console.error(`Error creating new schema: ${error.toString()}`)
  }
}

export const init = async () => {
  // Check every 5 minutes for new entries/if we need to do something
  // For debugging, it is suggested to add a star in the end for 5 sec interval
  schedule.scheduleJob('*/5 * * * *', async () => {
    /* 
      3. lock system
    */

    const versions = await versioningRepository.getPendingVersions()
    // If no versions, do nothing
    if (!versions.length) {
      return
    }

    for (const version of versions) {
      await handleNewVersion(version)
    }
  })
}

export default {
  init,
}
