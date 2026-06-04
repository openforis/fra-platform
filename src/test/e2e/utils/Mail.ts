interface MailHogMessage {
  Content: {
    Headers: Record<string, Array<string>>
    Body: string
  }
}

const mailHogUrl = process.env.MAILHOG_URL || 'http://localhost:8025'

// eslint-disable-next-line no-promise-executor-return
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

const getEmailByRecipient = async (recipient: string, attempts = 10): Promise<MailHogMessage> => {
  const response = await fetch(`${mailHogUrl}/api/v2/search?kind=to&query=${recipient}`)
  const data = await response.json()
  if (data.items?.length > 0) return data.items[0]
  if (attempts <= 1) throw new Error(`No email found for ${recipient}`)
  await delay(1000)
  return getEmailByRecipient(recipient, attempts - 1)
}

// Mailhog v2 api returns emails in 'quotedPrintable' -> decode it so we can extract url
const decodeQuotedPrintable = (str: string): string =>
  str.replace(/=\r?\n/g, '').replace(/=([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))

const getInvitationLink = async (recipient: string): Promise<string> => {
  const email = await getEmailByRecipient(recipient)
  const html = decodeQuotedPrintable(email.Content.Body)
  const match = html.match(/href="([^"]*invitationUuid=[^"]*)"/)

  // throw error if no match
  if (!match) throw new Error(`No invitation link found in email for ${recipient}`)
  const url = new URL(match[1])
  return `${url.pathname}${url.search}`
}

export const MailUtil = {
  getEmailByRecipient,
  getInvitationLink,
}
