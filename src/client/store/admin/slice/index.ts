import { combineSlices } from '@reduxjs/toolkit'

import { LinksSlice } from 'client/store/admin/links/slice'

export const AdminSlice = combineSlices(LinksSlice)
