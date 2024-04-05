export const validateLinks = (content: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')

  const links = doc.querySelectorAll('a')

  for (let i = 0; i < links.length; i += 1) {
    const link = links[i]
    const href = link.getAttribute('href')

    if (!href || href.trim() === '') {
      return false
    }
  }

  return true
}
