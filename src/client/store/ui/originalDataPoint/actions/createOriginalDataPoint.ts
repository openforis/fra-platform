import { NavigateFunction } from 'react-router-dom'

import { createAsyncThunk } from '@reduxjs/toolkit'

import { CycleParams } from 'meta/api/request'
import { ClientRoutes } from 'meta/app'
import { ODPs, OriginalDataPoint } from 'meta/assessment'

export const createOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  CycleParams & {
    navigate: NavigateFunction
  }
>('originalDataPoint/create', async ({ assessmentName, cycleName, countryIso, navigate }) => {
  navigate(
    ClientRoutes.Assessment.Cycle.Country.OriginalDataPoint.Section.getLink({
      countryIso,
      assessmentName,
      cycleName,
      year: '-1',
      sectionName: 'extentOfForest',
    })
  )

  // Populate store with placeholder
  return ODPs.addNationalClassPlaceHolder({
    countryIso,
    year: null,
    dataSourceAdditionalComments: '',
    dataSourceMethods: [],
    dataSourceReferences: '',
    description: '',
    nationalClasses: [],
  } as OriginalDataPoint)
})
