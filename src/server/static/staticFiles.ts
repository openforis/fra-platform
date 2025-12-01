import fs from 'fs/promises'
import path from 'path'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { FileStorage } from 'server/service/fileStorage/fileStorage'

type PropsClone = {
  assessment: Assessment
  cycleSource: Cycle
  cycleTarget: Cycle
}

type PropsRemove = {
  assessment: Assessment
  cycle: Cycle
}

const _getStaticDir = (dir: string): string => path.resolve(__dirname, dir)

const cloneCycle = async (props: PropsClone): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleSourceName } = cycleSource
  const { name: cycleTargetName } = cycleTarget

  const _cloneDir = async (dir: string): Promise<void> => {
    const staticDir = _getStaticDir(dir)

    const sourceDir = path.resolve(staticDir, assessmentName, cycleSourceName)
    // check if sourceDir exists
    try {
      await fs.access(sourceDir)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      return Promise.resolve()
    }

    const targetDir = path.resolve(staticDir, assessmentName, cycleTargetName)
    await fs.cp(sourceDir, targetDir, { force: true, recursive: true })
    return null
  }

  await _cloneDir('definitions')
  await FileStorage.Directory.copy({
    sourcePath: `static/${assessmentName}/${cycleSourceName}`,
    targetPath: `static/${assessmentName}/${cycleTargetName}`,
  })
}

const removeCycle = async (props: PropsRemove): Promise<void> => {
  const { assessment, cycle } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const _removeDir = async (dir: string): Promise<void> => {
    const staticDir = _getStaticDir(dir)
    const sourceDir = path.resolve(staticDir, assessmentName, cycleName)
    // check if sourceDir exists
    try {
      await fs.access(sourceDir)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      return Promise.resolve()
    }
    await fs.rm(sourceDir, { recursive: true, force: true })
    return null
  }

  await _removeDir('definitions')
  await FileStorage.Directory.remove({ path: `static/${assessmentName}/${cycleName}` })
}

const renameCycle = async (props: PropsClone): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleSourceName } = cycleSource
  const { name: cycleTargetName } = cycleTarget

  const _renameDir = async (dir: string): Promise<void> => {
    const staticDir = _getStaticDir(dir)

    const sourceDir = path.resolve(staticDir, assessmentName, cycleSourceName)
    // check if sourceDir exists
    try {
      await fs.access(sourceDir)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      return Promise.resolve()
    }

    const targetDir = path.resolve(staticDir, assessmentName, cycleTargetName)
    await fs.rename(sourceDir, targetDir)
    return null
  }

  await _renameDir('definitions')
  await FileStorage.Directory.copy({
    sourcePath: `static/${assessmentName}/${cycleSourceName}`,
    targetPath: `static/${assessmentName}/${cycleTargetName}`,
  })
  await FileStorage.Directory.remove({ path: `static/${assessmentName}/${cycleSourceName}` })
}

export const StaticFiles = {
  cloneCycle,
  removeCycle,
  renameCycle,
}
