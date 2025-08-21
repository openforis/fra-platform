/**
 * Creates a union of objects, where each object contains a `key` from the original type T,
 * and a `value` with the corresponding type of that key.
 *
 * For example:
 * type Car = { type: string; year: number; }
 * type CarProperty = KeyedValue<Car>
 * The result is: { key: "type"; value: string; } | { key: "year"; value: number; }
 */
export type KeyedValue<T> = {
  [K in keyof T]: {
    key: K
    value: T[K]
  }
}[keyof T]
