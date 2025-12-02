import 'tsconfig-paths/register'

import path from 'path'
import { config } from 'dotenv'

const envFileExt = process.env.NODE_ENV_SCRIPT ? `.${process.env.NODE_ENV_SCRIPT}` : ''
const envFilePath = path.resolve(__dirname, '..', '..', `.env${envFileExt}`)

config({ path: envFilePath })
