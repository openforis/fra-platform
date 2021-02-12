require('dotenv').config()

import * as migrations from './db/migration/execMigrations'

import * as init from './serverInit'

migrations()
init.serverInit()
