/**
 * Given an Array, iterates serially over all the values in it, executing the given callback on each element.
 * If the callback returns a Promise, it is awaited before continuing to the next iteration.
 */
const each = async <Item, Result = unknown>(
  iterable: ArrayLike<Item>,
  callback: (item: Item, index: number) => Result | Promise<Result>
): Promise<Array<Result>> => {
  const results: Array<Result> = []

  for (let i = 0; i < iterable.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    results.push(await callback(iterable[i], i))
  }

  return results
}

export const Promises = {
  each,
}
