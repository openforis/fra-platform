import { AssessmentService } from '@server/service'

export default () =>
  test('Expect region group exists', async () => {
    const regionGroups = await AssessmentService.getRegionGroups()

    expect(Array.isArray(regionGroups)).toBe(true)
    expect(regionGroups[0]).toHaveProperty('id')
  })
