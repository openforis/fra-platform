/**
 * Advisory lock namespace
 *
 * The lock is identified by the namespace (given from here) and the key.
 * Two transactions block each other only when both match.
 *
 * Values are arbitrary, but it is preferred to use the issue number
 * Never reuse the same lock namespace
 */
export enum AdvisoryLock {
  nodeWrites = 6233,
}
