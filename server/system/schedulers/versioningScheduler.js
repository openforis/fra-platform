const schedule = require('node-schedule')
const versioningRepository = require('../../versioning/versioningRepository')

const handleNewVersion = async (version) => {
  const {
    id,
    versionNumber,
    // publishTime: timestamp,
  } = version

  try {

    const startTime = +new Date() / 1000
    await versioningRepository.updateVersionStatus(id, 'running')
    
    try {
      await versioningRepository.newSchemaVersion(`public_${versionNumber}`)
    } catch (error) {
      console.error('Failed to create new schema version!')
      console.error(error)
      throw error
    }

    await versioningRepository.updateVersionStatus(id, 'completed')

    console.log((+new Date() / 1000) - startTime)
    console.log(`Created new schema version: ${versionNumber} (${id})`)

  } catch (error) {
    await versioningRepository.updateVersionStatus(id, 'failed')
    console.error(`Error creating new schema: ${error.toString()}`)
  }
}

const init = async () => {
  // Check every 5 minutes for new entries/if we need to do something
  // schedule.scheduleJob('*/5 * * * *', async () => {
  schedule.scheduleJob('*/5 * * * * *', async () => {
    /* 
      3. lock system
    */

    const versions = await versioningRepository.getPendingVersions();
    console.log({ versions, ts: +new Date() })
    // If no versions, do nothing
    if (!versions.length) {
      return
    }

    versions.forEach(async (version) => {
      console.log('New version pending creation:')
      console.table(version)

      handleNewVersion(version)

    });


  })
}

module.exports = {
  init
}
