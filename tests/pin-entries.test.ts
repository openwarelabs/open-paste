import { describe, expect, it, vi } from 'vitest'
import type { ClipView, Pinboard } from '@shared/types'

vi.mock('@renderer/api', () => ({
	api: {
		setPinned: vi.fn(),
		openExternal: vi.fn()
	}
}))

import { pinEntries } from '@renderer/shelf/shelf-app/components/shelf-body/components/item-menu/item-menu.utils'

const item = {
	id: 'clip-1',
	pinboards: [] as string[]
} as ClipView

describe('pinEntries', () => {
	it('uses pinboard ids when two boards share a name', () => {
		const boards: Pinboard[] = [
			{ id: 'board-a', name: 'Work', color: '#f00', createdAt: 1 },
			{ id: 'board-b', name: 'Work', color: '#0f0', createdAt: 2 }
		]

		const entries = pinEntries(item, boards, () => {})
		const labeled = entries.filter((e) => e !== 'separator')

		expect(labeled.map((e) => (e === 'separator' ? null : e.label))).toEqual([
			'Work',
			'Work',
			'New pinboard…'
		])
		expect(labeled.map((e) => (e === 'separator' ? null : e.id))).toEqual([
			'board-a',
			'board-b',
			undefined
		])
		expect(new Set(labeled.map((e) => (e === 'separator' ? null : e.id ?? e.label))).size).toBe(
			3
		)
	})
})
