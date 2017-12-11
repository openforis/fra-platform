# FRA Platform Design

## Technical design choices

1. All numeric values for areas are stored in the unit displayed for the corresponding table
2. In most cases, sums are calculated in the UI and the totals are *not* stored in the database
3. Decimal inputs have always 2 decimals and are restricted maximum 20 characters
4. Qualitative data is stored as HTML to database
5. Data points are stored in precision of year

## Styleguide & Design files

The FRA Platform styleguide can be found on [Zeplin](https://zeplin.io/). Cosimo has been made the owner of the project, so ha can give access. If you just want to preview the styleguide and don't need any measurements, have a look at the [Zeplin Scene preview](https://scene.zeplin.io/project/591160b68341f5adef6f2819).

Design files are available in Sketch format in the `/doc/sketch` directory. Lately we have been only drawing mockups on a on-demand basis, as design directly in the browser has turned out to be quite fast for simpler tasks.

## Design principles

1. Design with a small laptop screen in mind
2. Panels and sidebars should be hideable to maximize the screen estate for the main content area
3. Align elements using a grid
4. Utilize [the 8 point grid](https://spec.fm/specifics/8-pt-grid) for a consistent spacing
5. Components that belong together should be grouped together surrounded by enough white space 
6. Actionable components should be close to the element they affect
7. Don't hide elements/actions/content unless you really need to
