# Definition texts
Definition texts are implemented with markdown document. Under directory `/server/definitions/{lang}` is a markdown file containing text content for definitions. This markdown is rendered to html when user clicks a definition link inside the fra-platform.

## Anchor links
Anchor links are automatically created for headings with level 3 or less. Id of anchor will be the first word in heading with lower case.

E.g. If heading has text "1A Tree cover", the anchor id will be `1a`.
