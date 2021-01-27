// Old Microsoft edge version
import 'core-js/features/array/flat'
import 'core-js/features/array/flat-map'
import 'core-js/features/object/from-entries'
import ResizeObserver from './resizeObserver'

if (typeof (window as any).ResizeObserver === 'undefined') {
  ;(window as any).ResizeObserver = ResizeObserver
}
