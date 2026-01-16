import { processor } from 'client/components/EditorWYSIWYG/hooks/_sanitizer'

describe('EditorWYSIWYG sanitizer', () => {
  test('preserves link target and rel attributes', () => {
    const input = '<a href="https://example.com" target="_blank" rel="nofollow">Example</a>'
    const output = processor.processSync(input).toString()

    expect(output).toContain('href="https://example.com"')
    expect(output).toContain('target="_blank"')
    expect(output).toContain('rel="nofollow"')
  })
})
