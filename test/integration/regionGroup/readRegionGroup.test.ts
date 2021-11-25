import { AssessmentController } from '@server/controller'

export default () =>
  test('Expect region group exists', async () => {
    const assessment = await AssessmentController.read({
      name: 'fra',
    })

    const regionGroups = await AssessmentController.getRegionGroups({ assessment })

    expect(Array.isArray(regionGroups)).toBe(true)
    expect(regionGroups[0]).toHaveProperty('id')
  })
