import React from 'react'
import { Route } from 'react-router-dom'

import { Routes } from 'meta/routes/routes'

import { lazyLoad } from './_lazyLoad'

// Only KioskLayout uses lazyLoad with suspense to avoid flickering when switching between pages.
const KioskLayout = lazyLoad(
  () =>
    import(
      /* webpackChunkName: "kiosk" */
      'client/pages/Kiosk/KioskLayout'
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
const AFreshPerspective = React.lazy(
  () =>
    import(
      /* webpackChunkName: "kiosk" */
      'client/pages/Kiosk/InteractiveStories/AFreshPerspective'
    )
)
const HiddenInPlainSight = React.lazy(
  () =>
    import(
      /* webpackChunkName: "kiosk" */
      'client/pages/Kiosk/InteractiveStories/HiddenInPlainSight'
    )
)
const ExploringOurForests = React.lazy(
  () =>
    import(
      /* webpackChunkName: "kiosk" */
      'client/pages/Kiosk/InteractiveStories/ExploringOurForests'
    )
)
const TheSecretsOfMangroves = React.lazy(
  () =>
    import(
      /* webpackChunkName: "kiosk" */
      'client/pages/Kiosk/InteractiveStories/TheSecretsOfMangroves'
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

    <Route path={Routes.InteractiveStories.path.relative}>
      <Route element={<InteractiveStories />} index />
      <Route element={<AFreshPerspective />} path={Routes.AFreshPerspective.path.relative} />
      <Route element={<ExploringOurForests />} path={Routes.ExploringOurForests.path.relative} />
      <Route element={<HiddenInPlainSight />} path={Routes.HiddenInPlainSight.path.relative} />
      <Route element={<TheSecretsOfMangroves />} path={Routes.TheSecretsOfMangroves.path.relative} />
    </Route>

    <Route element={<ForestKids />} path={Routes.ForestKids.path.relative} />
  </Route>
)
