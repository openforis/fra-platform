import { NavigateFunction } from 'react-router-dom'

import { createAsyncThunk } from '@reduxjs/toolkit'

import { CycleParams } from 'meta/api/request'
import { ODPs, OriginalDataPoint } from 'meta/assessment'
import { Routes } from 'meta/routes'

export const createOriginalDataPoint = createAsyncThunk<
  OriginalDataPoint,
  CycleParams & {
    navigate: NavigateFunction
  }
>('originalDataPoint/create', async ({ assessmentName, cycleName, countryIso, navigate }) => {
  navigate(
    Routes.OriginalDataPoint.generatePath({
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
