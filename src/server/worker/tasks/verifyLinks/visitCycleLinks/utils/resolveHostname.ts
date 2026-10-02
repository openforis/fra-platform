import dns from 'dns'

const resolver = new dns.promises.Resolver({ timeout: 3000, tries: 2 })

// 'transient': an error stopped the lookup before the link could be verified (e.g. a temporary connection failure to the DNS server).
export type HostnameResolution = 'resolved' | 'transient' | 'unresolved'

// Error codes that count as 'transient'. Links with transient resolution errors are retried.
const transientErrorCodes = new Set<string>([dns.CANCELLED, dns.CONNREFUSED, dns.REFUSED, dns.SERVFAIL, dns.TIMEOUT])

const _getErrorCode = (error: unknown): string => (error as NodeJS.ErrnoException).code ?? ''

const _isTransientError = (error: unknown): boolean => transientErrorCodes.has(_getErrorCode(error))

export const resolveHostname = async (hostname: string): Promise<HostnameResolution> => {
  try {
    const ipv4Addresses = await resolver.resolve4(hostname)
    return ipv4Addresses.length > 0 ? 'resolved' : 'unresolved'
  } catch (error) {
    return _isTransientError(error) ? 'transient' : 'unresolved'
  }
}
