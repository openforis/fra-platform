import { passwordHash } from '../src/server/api/auth/utils/passwordUtils'

if (process.argv[2]) passwordHash(process.argv[2]).then(console.log)
else console.log('usage: ts-node generatePasswordHash.ts <password>\nEx: ts-node generatePasswordHash.ts 123')
export {}
