import cron from 'node-cron'

import { cleanUpFiles } from 'server/worker/jobs/cleanUpFiles'
import { refreshMaterializedViews } from 'server/worker/jobs/refreshMaterializedViews'
import { remindReviewers } from 'server/worker/jobs/remindReviewers'

// every hour, at minute 0
cron.schedule('0 * * * *', refreshMaterializedViews)

// every Sunday at 00:00 (midnight)
cron.schedule('0 0 * * 0', cleanUpFiles)

// every day at 00:01 (12:01 AM)
cron.schedule('0 0 * * 0', remindReviewers)
