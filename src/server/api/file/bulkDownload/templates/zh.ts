import { CycleNames } from 'meta/assessment/cycle/names'

import type { GetReadmeTemplate, ReadmeYearsByCycle } from '../types'

const readmeYearsByCycle: ReadmeYearsByCycle = {
  [CycleNames._2020]: {
    yearRange: '1990-2000、2000-2010、2010-2015 或 2015-2020',
    years: '1990、2000、2010、2015 和 2020',
  },
  [CycleNames._2025]: {
    yearRange: '1990-2000、2000-2010、2010-2015、2015-2020 或 2020-2025',
    years: '1990、2000、2010、2015、2020 和 2025',
  },
}

export const getReadmeZh: GetReadmeTemplate = (props) => {
  const { cycleName } = props
  const { yearRange, years } = readmeYearsByCycle[cycleName]

  return `README

批量下载的 zip 压缩包包含三个文件夹：

“Annual_variables”（年度变量）,该文件夹包含按变量划分的森林干扰年度数据，变量包括：病害、虫害、极端天气、其他和火灾。数据以年度列的形式组织，覆盖时期为 2000 年至最近一个报告年份。每个文件均按照 FRA 报告结构命名：[章节][小节]_[变量]_[yyyy]-[mm]-[dd].csv。日期部分在本文件及其他地方均指数据下载日期。

“FRA_Years_variables”（FRA 年份变量）,大多数报告数据位于该文件夹中。通常，数据按每个变量分别存放在单独文件中。每个文件通常包含 FRA 报告年份的单独列：${years}。文件命名规则为：[章节][小节]_[变量]_[yyyy]-[mm]-[dd].csv。

“Intervals_variables”（区间变量）,该文件夹包含关于森林扩张、造林、自然扩张和毁林的年均变化数据的单独文件。每条数据记录包含一个国家的信息，以及 ${yearRange} 的区间数据。每个文件命名规则为：[章节][小节]_[变量]_[yyyy]-[mm]-[dd].csv。

除上述子文件夹外，批量下载包还包含若干文件：

“Annual_[yyyy]-[mm]-[dd].csv”包含“Annual_variables”文件夹中所有变量的数据，汇总在一个 Excel 工作表中。此外，该文件还包含每个数据点的标记状态代码（“标记”）。标记说明见 U 列。

“DegradedForest_[yyyy]-[mm]-[dd].csv”包含关于退化森林报告的描述性数据。

“ForestPolicy_[yyyy]-[mm]-[dd].csv”包含关于森林政策报告的描述性数据。

“ForestRestoration_[yyyy]-[mm]-[dd].csv”包含关于森林恢复报告的描述性数据。

“FRA_years_[yyyy]-[mm]-[dd].csv”包含“FRA_Years_variables”文件夹中所有变量的数据，汇总在一个 Excel 工作表中。此外，该文件还包含每个数据点的“标记”，标记说明见 IA 列。

“Intervals_[yyyy]-[mm]-[dd].csv”包含“Intervals_variables”文件夹中所有变量的数据，汇总在一个 Excel 工作表中。此外，该文件还包含每个数据点的“标记”，标记说明见 Q 列。

“NDPYear_[yyyy]-[mm]-[dd].csv”包含使用国家数据点方法报告森林面积的国家/地区所使用的“国家数据点”的最早年份和最近年份数据。

“NWFP_[yyyy]-[mm]-[dd].csv”，包含报告的前 10 种非木材林产品（NWFP）数据，包括：名称、价值（以 1000 本地货币计）以及非木材林产品类别。有关不同类别的更多信息，请参见 FRA 平台表 7。

“Tiers_[yyyy]-[mm]-[dd].csv”包含表 1a 森林面积（状况和趋势）、表 2a 立木蓄积量（状况）和表 2c 生物量（状况）所报告的层级信息。有关不同层级标准的更多信息，请参见 FRA 平台中 1a、2a 和 2c 的等级标准部分。

报告变量单位可在各文件中或 FRA 平台上找到。

必備引用格式 [聯合國糧農組織（FAO）。下載年度。《全球森林資源評估》。網址。查閱日期：下載日期]

联系方式：fra@fao.org`
}
