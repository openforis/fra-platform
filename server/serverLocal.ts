require('dotenv').config()

const migrations = require('./db/migration/execMigrations')

const serverInit = require('./serverInit')
migrations()
serverInit()
