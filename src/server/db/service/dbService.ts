import { initSchema } from './initSchema/initSchema'

const initSchemas = async (): Promise<void> => {
  await initSchema()
}

const _export = (): void => {}
const _import = (): void => {}

export const DBService = {
  initSchemas,
  export: _export,
  import: _import,
}
