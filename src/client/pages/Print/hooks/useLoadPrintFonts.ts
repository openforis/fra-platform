import { useEffect } from 'react'

const links = [
  'https://fonts.googleapis.com/css2?family=Chau+Philomene+One:ital@0;1&display=swap',
  'https://fonts.googleapis.com/css2?family=Signika:wght@300&display=swap',
]

let fontsLoaded = false

export const useLoadPrintFonts = (): void => {
  useEffect(() => {
    if (fontsLoaded) return

    links.forEach((href) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      document.head.appendChild(link)
    })

    fontsLoaded = true
  }, [])
}
