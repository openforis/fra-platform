import { useMediaQuery } from 'react-responsive'

enum Breakpoints {
  mobileLandscape = 480,
  tabletPortrait = 768,
  tabletLandscape = 1024,
  laptop = 1200,
  desktop = 1920,
}

export interface Responsive {
  minMobileLandscape: boolean
  minLaptop: boolean
}

export const useResponsive = (): Responsive => {
  const minMobileLandscape = useMediaQuery({ minWidth: Breakpoints.mobileLandscape })
  const minLaptop = useMediaQuery({ minWidth: Breakpoints.laptop })

  return {
    minMobileLandscape,
    minLaptop,
  }
}
