export type ActivityLogDb<Target> = {
  assessment_uuid: string
  cycle_uuid: string
  country_iso: string
  section: string
  message: string
  target: Target
  user_id: number
}
