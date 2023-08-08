import { useMemo } from 'react'

import { LayerKey, LayerSectionKey } from '@meta/geo'

import { useGeoLayerSection } from '@client/store/ui/geo'

export const useCountSectionSelectedLayers = (sectionKey: LayerSectionKey) => {
  const sectionState = useGeoLayerSection(sectionKey)

  const selectedLayersCount = useMemo(() => {
    if (sectionState === undefined) return 0
    let count = 0
    Object.keys(sectionState).forEach((layerKey) => {
      if (sectionState[layerKey as LayerKey].selected) {
        count += 1
      }
    })
    return count
  }, [sectionState])

  return selectedLayersCount
}

// import { useSelector } from 'react-redux';

// // Custom hook to track selected layers
// const useSelectedLayers = () => {
//   const [selectedLayers, setSelectedLayers] = useState([]);

//   // Get the sections property from the geo state
//   const sections = useSelector((state) => state.geo.sections);

//   useEffect(() => {
//     // Extract the selected layer keys from the sections
//     const selected = Object.entries(sections)
//       .filter(([_, layerState]) => layerState.selected)
//       .map(([layerKey]) => layerKey);

//     // Check if the selected layers have changed
//     const sortedSelected = [...selected].sort();
//     const sortedPrevious = [...selectedLayers].sort();
//     if (!sortedSelected.every((key, index) => key === sortedPrevious[index])) {
//       setSelectedLayers(selected);
//     }
//   }, [sections]);

//   return selectedLayers;
// };

// export default useSelectedLayers;
