import { describe, expect, it } from 'vitest'
import { formatBytes, hostOf } from '@renderer/lib/format'

describe('hostOf', () => {
	it('keeps the real host when the path has a % that is not an escape', () => {
		expect(hostOf('https://shop.example.com/sale-50%')).toEqual({
			host: 'shop.example.com',
			rest: '/sale-50%'
		})
	})

	it('still decodes valid escapes in the path', () => {
		expect(hostOf('https://example.com/caf%C3%A9')).toEqual({
			host: 'example.com',
			rest: '/café'
		})
	})
})

describe('formatBytes', () => {
	it('rounds up into the next unit instead of showing 1024', () => {
		expect(formatBytes(1048575)).toBe('1.0 MB')
		expect(formatBytes(1073741823)).toBe('1.0 GB')
	})

	it('drops the decimal once the rounded value is 10 or more', () => {
		expect(formatBytes(10239)).toBe('10 KB')
		expect(formatBytes(10240)).toBe('10 KB')
	})

	it('keeps a decimal below 10 and leaves bytes alone', () => {
		expect(formatBytes(1024)).toBe('1.0 KB')
		expect(formatBytes(500)).toBe('500 B')
	})
})
