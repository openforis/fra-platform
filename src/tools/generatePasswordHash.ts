import { passwordHash } from 'server/api/auth/utils/passwordUtils'
import { Logger } from 'server/utils/logger'

if (process.argv[2]) passwordHash(process.argv[2]).then(Logger.info)
else Logger.info('usage: ts-node generatePasswordHash.ts <password>\nEx: ts-node generatePasswordHash.ts 123')
export {}
