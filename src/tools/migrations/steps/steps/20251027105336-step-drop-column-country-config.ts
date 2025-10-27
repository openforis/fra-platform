import { DB } from 'server/db'

export default async (): Promise<void> => {
  // drop paneuropean 2020 odp tables/views
  await DB.none(`drop table if exists assessment_paneuropean_2020.original_data_point cascade;`)
  await DB.none(`drop view if exists assessment_paneuropean_2020.original_data_point_data cascade;`)
  // drop paneuropean 2025 odp tables/views
  await DB.none(`drop table if exists assessment_paneuropean_2025.original_data_point cascade;`)
  await DB.none(`drop view if exists assessment_paneuropean_2025.original_data_point_data cascade;`)

  await DB.none(`alter table public.country drop column if exists config;`)
}
