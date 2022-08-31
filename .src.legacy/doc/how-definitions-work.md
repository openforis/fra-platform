# Definition/FAQ texts
Definitions and FAQ both work in the same way. Definitions/FAQs are implemented with a markdown document. Under directory `/server/definitions/{lang}` is a markdown file containing text content for definitions, `tad.md` for Terms and Definitions and `faq.md` for the FAQ. This markdown is rendered to html when user clicks a definition link inside the fra-platform.

## Anchor links
Anchor links are automatically created for headings with level 2 or less. Id of anchor will be the first word in heading with lower case. E.g. If heading has text "1A Tree cover", the anchor id will be `1a`. Be aware that sometimes certain sections have a shared definitions or are lacking the section all together.
