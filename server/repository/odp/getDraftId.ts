export const getDraftId = async (client: any, odpId: any) => {
  const [{ draft_id: draftId }] = await client.query('SELECT draft_id FROM odp WHERE id = $1', [odpId])
  return draftId
}
