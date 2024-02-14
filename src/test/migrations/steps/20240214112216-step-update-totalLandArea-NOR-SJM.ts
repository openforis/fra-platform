import { BaseProtocol } from 'server/db'

import { TotalLandAreaUpdateData, updateTotalLandArea } from 'test/migrations/steps/utils/updateTotalLandArea'

const data: TotalLandAreaUpdateData = {
  SJM: [
    { year: 2007, value: 6099.567 },
    { year: 2008, value: 6099.567 },
    { year: 2009, value: 6099.567 },
    { year: 2010, value: 6099.767 },
    { year: 2011, value: 6099.767 },
    { year: 2012, value: 6099.767 },
    { year: 2013, value: 6099.767 },
    { year: 2014, value: 6099.767 },
    { year: 2015, value: 6099.767 },
    { year: 2016, value: 6099.767 },
    { year: 2017, value: 6099.767 },
    { year: 2018, value: 6099.767 },
    { year: 2019, value: 6099.767 },
    { year: 2020, value: 6021.167 },
    { year: 2021, value: 6021.167 },
    { year: 2022, value: 6021.167 },
    { year: 2023, value: 6021.167 },
    { year: 2024, value: 6021.167 },
    { year: 2025, value: 6021.167 },
  ],
  NOR: [
    { year: 2007, value: 30424.93 },
    { year: 2008, value: 30424.93 },
    { year: 2009, value: 30424.93 },
    { year: 2010, value: 30424.85 },
    { year: 2011, value: 30424.85 },
    { year: 2012, value: 30424.85 },
    { year: 2013, value: 30424.584 },
    { year: 2014, value: 30422.548 },
    { year: 2015, value: 30419.303 },
    { year: 2016, value: 30414.806 },
    { year: 2017, value: 30412.529 },
    { year: 2018, value: 30411.018 },
    { year: 2019, value: 30409.583 },
    { year: 2020, value: 30407.306 },
    { year: 2021, value: 30405.469 },
    { year: 2022, value: 30405.15 },
    { year: 2023, value: 30404.864 },
    { year: 2024, value: 30404.079 },
    { year: 2025, value: 30404.079 },
  ],
}

export default async (client: BaseProtocol) => {
  await updateTotalLandArea({ cycleName: '2025', data }, client)
}
