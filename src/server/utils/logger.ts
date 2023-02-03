import * as winston from 'winston'

import { ProcessEnv } from './processEnv'

const Logger = winston.createLogger({
  level: ProcessEnv.logLevel,
  transports: [new winston.transports.Console()],
})

export { Logger }
