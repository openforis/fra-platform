import React from 'react'
import { Route } from 'react-router-dom'

import { Routes } from 'meta/routes/routes'

import { lazyLoad } from './_lazyLoad'

// Only KioskLayout uses lazyLoad with suspense to avoid flickering when switching between pages.
const KioskLayout = lazyLoad(
  () =>
    import(
      /* webpackChunkName: "kiosk" */
      'client/components/KioskLayout'
    )
)
const ForestKids = React.lazy(
  () =>
    import(
      /* webpackChunkName: "kiosk" */
      'client/pages/Kiosk/ForestKids'
    )
)
const Fra2020DataPlatform = React.lazy(
  () =>
    import(
      /* webpackChunkName: "kiosk" */
      'client/pages/Kiosk/Fra2020DataPlatform'
    )
)
const FraProcess = React.lazy(
  () =>
    import(
      /* webpackChunkName: "kiosk" */
      'client/pages/Kiosk/FraProcess'
    )
)
const InteractiveStories = React.lazy(
  () =>
    import(
      /* webpackChunkName: "kiosk" */
      'client/pages/Kiosk/InteractiveStories'
    )
)
const Kiosk = React.lazy(
  () =>
    import(
      /* webpackChunkName: "kiosk" */
      'client/pages/Kiosk/Kiosk'
    )
)
const RecentHighlights = React.lazy(
  () =>
    import(
      /* webpackChunkName: "kiosk" */
      'client/pages/Kiosk/RecentHighlights'
    )
)

export const KioskRoutes: React.ReactElement = (
  <Route element={<KioskLayout />} path={Routes.Kiosk.path.relative}>
    <Route element={<Kiosk />} index />
    <Route element={<FraProcess />} path={Routes.FraProcess.path.relative} />
    <Route element={<RecentHighlights />} path={Routes.RecentHighlights.path.relative} />
    <Route element={<Fra2020DataPlatform />} path={Routes.Fra2020DataPlatform.path.relative} />
    <Route element={<InteractiveStories />} path={Routes.InteractiveStories.path.relative} />
    <Route element={<ForestKids />} path={Routes.ForestKids.path.relative} />
  </Route>
)
