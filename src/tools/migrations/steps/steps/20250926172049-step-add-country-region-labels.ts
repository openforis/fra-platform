import { addCountryRegionLabels } from 'tools/addCountryRegionLabels/addCountryRegionLabels'

import { DB } from 'server/db'

const _updateDDL = async (): Promise<void> => {
  // Update public.country/region tables
  await Promise.all([
    DB.none(`alter table public.country add column if not exists labels jsonb not null default '{}'::jsonb`),
    DB.none(`alter table public.region add column if not exists labels jsonb not null default '{}'::jsonb`),
  ])
}

export default async (): Promise<void> => {
  await _updateDDL()

  await addCountryRegionLabels(DB)
}
