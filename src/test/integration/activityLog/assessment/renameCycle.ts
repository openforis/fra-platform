import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { CacheController } from 'server/cache/controller'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { sectionParams, subSectionParams } from 'test/integration/mock/section'
import { colParams, rowParams, tableParams } from 'test/integration/mock/table'
import { tableSectionParams } from 'test/integration/mock/tableSection'
import { testContext } from 'test/integration/testContext'

// Populate cycle with section, subsection, tablesection, table, row and column
// This is required for renameCycle which expects the base cycle metadata and cache to exist
const _initialiseCycle = async (props: { assessment: Assessment; cycle: Cycle; user: User }): Promise<void> => {
  const { assessment, cycle, user } = props
  const cycles = [cycle.uuid]

  const section = await MetadataController.createSection({ assessment, section: sectionParams(cycle.uuid), user })
  const subSection = await MetadataController.createSubSection({
    assessment,
    parentSectionUuid: section.uuid,
    section: subSectionParams(cycle.uuid),
    user,
  })
  const tableSection = await MetadataController.createTableSection({
    assessment,
    tableSection: { props: { ...tableSectionParams.props, cycles }, sectionUuid: subSection.uuid },
    user,
  })
  const table = await MetadataController.createTable({
    assessment,
    table: { props: { ...tableParams.props, cycles }, tableSectionUuid: tableSection.uuid },
    user,
  })
  const row = await MetadataController.createRow({ assessment, cycles: [cycle], rowProps: rowParams, table })
  await MetadataController.createCol({ assessment, colProps: colParams, cycles: [cycle], row })

  await SectionRedisRepository.getMany({ assessment, cycle, force: true })
  await SectionRedisRepository.getManyMetadata({ assessment, cycle, force: true })
  await CacheController.generateData({ assessment, cycle })
}

export default (): void => {
  test('Expect rename cycle to write activity log', async () => {
    const { user } = testContext.activityLog
    const { activityLogCycle } = testContext
    // assessment with the cycle created in createCycle
    const assessment = await AssessmentController.getOne({
      assessmentName: testContext.activityLog.assessment.props.name,
    })

    await _initialiseCycle({ assessment, cycle: activityLogCycle, user })

    const { cycle } = await AssessmentController.renameCycle({
      assessment,
      cycle: activityLogCycle,
      name: '2027',
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      message: ActivityLogMessage.assessmentCycleRename,
      section: 'assessment',
      target: cycle,
      user,
    })

    testContext.activityLogCycle = cycle
  })
}
