const schedule = require('node-schedule')
const versioningRepository = require('../../versioning/versioningRepository')

const handleNewVersion = async (version) => {
  const {
    id,
    versionNumber,
  } = version

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

const init = async () => {
  // Check every 5 minutes for new entries/if we need to do something
  schedule.scheduleJob('*/5 * * * *', async () => {
    /* 
      3. lock system
    */

    const versions = await versioningRepository.getPendingVersions();
    // If no versions, do nothing
    if (!versions.length) {
      return
    }

    for (const version of versions) {
      console.log('New version pending creation:')
      console.table(version)
      await handleNewVersion(version)
    }
  })
}

module.exports = {
  init
}
