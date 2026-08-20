// Values are passed by run.sh as k6 -e flags (see README.md)
const required = (name: string): string => {
  const value = __ENV[name]
  if (!value) throw new Error(`missing env var ${name} (run through run.sh, or pass it as a k6 -e flag)`)
  return value
}

export const baseUrl = required('HOST')
