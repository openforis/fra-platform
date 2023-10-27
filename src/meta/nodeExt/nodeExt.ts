export type NodeExt<Datum = any> = {
  uuid: string
  props: Record<string, Datum>
}
