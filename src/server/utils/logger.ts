import { createLogger, format, transports } from 'winston'

import { ProcessEnv } from './processEnv'

const Logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'HH:mm:ss' }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  level: ProcessEnv.logLevel,
  transports: [new transports.Console()],
})

export { Logger }
