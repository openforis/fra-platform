import { createRoute } from 'meta/routes/routes/createRoute'
import { Root } from 'meta/routes/routes/root'

export const Kiosk = createRoute({ path: 'kiosk', parent: Root })
export const ForestKids = createRoute({ path: 'forest-kids', parent: Kiosk })
export const FraDataPlatform = createRoute({ path: 'fra-data-platform', parent: Kiosk })
export const FraProcess = createRoute({ path: 'fra-process', parent: Kiosk })
export const RemoteSensingSurvey = createRoute({ path: 'remote-sensing-survey', parent: Kiosk })
export const RecentHighlights = createRoute({ path: 'recent-highlights', parent: Kiosk })
export const InteractiveStories = createRoute({ path: 'interactive-stories', parent: Kiosk })
export const WatchingOverOurForests = createRoute({ path: 'watching-over-our-forests', parent: InteractiveStories })
export const ExploringOurForests = createRoute({ path: 'exploring-our-forests', parent: InteractiveStories })
export const HiddenInPlainSight = createRoute({ path: 'hidden-in-plain-sight', parent: InteractiveStories })
export const TheSecretsOfMangroves = createRoute({ path: 'the-secrets-of-mangroves', parent: InteractiveStories })
