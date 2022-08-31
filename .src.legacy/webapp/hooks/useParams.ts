import { useParams } from 'react-router-dom'

export const useParamSection = (): string => {
  const { section } = useParams<{ section: string }>()
  return section
}
