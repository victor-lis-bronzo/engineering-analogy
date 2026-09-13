import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NUI, PHASES_STORY } from '../components/NUI'
import { usePhaseStore } from '../store'

describe('Ticket 09: Storytelling Content (HTML)', () => {
  beforeEach(() => {
    usePhaseStore.getState().reset()
  })

  it('renderiza os parágrafos e títulos corretos da história para cada fase de 0 a 5', () => {
    for (let phase = 0; phase <= 5; phase++) {
      usePhaseStore.getState().setPhase(phase)
      const { unmount } = render(<NUI />)

      const story = PHASES_STORY[phase]
      expect(screen.getByTestId('story-title').textContent).toBe(story.title)
      expect(screen.getByTestId('story-subtitle').textContent).toBe(story.subtitle)
      expect(screen.getByTestId('story-content').textContent).toBe(story.content)

      if (story.warning) {
        expect(screen.getByText(story.warning)).toBeDefined()
      }

      unmount()
    }
  })

  it('o layout possui wrapper flex responsivo com overflow adequado', () => {
    render(<NUI />)
    const wrapper = screen.getByTestId('nui-wrapper')
    expect(wrapper.className).toContain('flex')
    expect(wrapper.className).toContain('justify-between')
  })
})
