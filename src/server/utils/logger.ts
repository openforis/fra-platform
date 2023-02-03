import * as winston from 'winston'

import { ProcessEnv } from './processEnv'

const Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  level: ProcessEnv.logLevel,
  transports: [new winston.transports.Console()],
})

export { Logger }
