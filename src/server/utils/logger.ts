import * as winston from 'winston'

const Logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()],
})

export { Logger }
