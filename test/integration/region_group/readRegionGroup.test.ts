import { RegionGroupService } from '@server/service/region_group'

export default () =>
  test('Expect region group exists', async () => {
    const regionGroups = await RegionGroupService.readAll()

    expect(Array.isArray(regionGroups)).toBe(true)
    expect(regionGroups[0]).toHaveProperty('id')
  })
