import cron from 'node-cron'

import { CleanUpFiles } from 'server/worker/cronJobs/cleanUpFiles'
import { NotifyLinksInvalid } from 'server/worker/cronJobs/notifyLinksInvalid'
import { RefreshMaterializedViews } from 'server/worker/cronJobs/refreshMaterializedViews'
import { RemindReviewers } from 'server/worker/cronJobs/remindReviewers'

const cleanUpFiles = new CleanUpFiles()
const notifyLinksInvalid = new NotifyLinksInvalid()
const refreshMaterializedViews = new RefreshMaterializedViews()
const remindReviewers = new RemindReviewers()

// every hour, at minute 0
cron.schedule('0 * * * *', refreshMaterializedViews.run.bind(refreshMaterializedViews))

// every Sunday at 00:00 (midnight)
cron.schedule('0 0 * * 0', cleanUpFiles.run.bind(cleanUpFiles))

// every day at 00:01 (12:01 AM)
cron.schedule('0 0 * * 0', remindReviewers.run.bind(remindReviewers))

// every Monday at 00:05
cron.schedule('5 0 * * 1', notifyLinksInvalid.run.bind(notifyLinksInvalid))
