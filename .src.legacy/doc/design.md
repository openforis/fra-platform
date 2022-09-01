# FRA Platform Design

## Styleguide & Design files

FRA Platform Styleguide is a resource for designers, developers and product managers that provides a common visual language for the FRA Platform. The styleguide can be found on [Zeplin](https://zpl.io/aXK9WBp) (Cosimo can give access). 

If you just want to preview the styleguide and don't have/want an Zeplin account, have a look at the [FRA Platfrom Styleguide (PDF)](sketch/fra-platform-styleguide.pdf).

Design files are available in Sketch format in the `/doc/sketch` directory. Lately we have been design directly in the browser so there are no up-to-date mockups of the platform. The platfrom in it self is a living design document.

## Technical design choices

- All numeric values for areas are stored in the unit displayed for the corresponding table
- In most cases, sums are calculated in the UI and the totals are *not* stored in the database
- Decimal inputs have always 2 decimals and are restricted maximum 20 characters
- Qualitative data is stored as HTML to database
- Data points are stored in precision of year
