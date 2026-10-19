import type { CycleNames } from 'meta/assessment/cycle/names'

export type ReadmeCycleName = CycleNames._2020 | CycleNames._2025

type ReadmeYears = {
  yearRange: string
  years: string
}

export type ReadmeYearsByCycle = Record<ReadmeCycleName, ReadmeYears>

type GetReadmeTemplateProps = { cycleName: ReadmeCycleName }

export type GetReadmeTemplate = (props: GetReadmeTemplateProps) => string
