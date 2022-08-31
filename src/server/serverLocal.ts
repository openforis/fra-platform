import * as migrations from './db/migration/execMigrations'

import * as init from './serverInit'

require('dotenv').config()

migrations()
init.serverInit()
