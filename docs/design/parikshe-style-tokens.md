Parikshe Visual Style Tokens (MVP)
Android-first, original Parikshe-first system

1) Color Tokens

Light Theme
- color.primary.600 = #1E5EFF
- color.primary.500 = #3B74FF
- color.primary.100 = #E8F0FF
- color.secondary.600 = #00A389
- color.secondary.100 = #DFF8F3
- color.background = #F7F8FA
- color.surface = #FFFFFF
- color.surfaceAlt = #F1F3F7
- color.text.primary = #111827
- color.text.secondary = #4B5563
- color.text.muted = #6B7280
- color.border = #E5E7EB
- color.success = #16A34A
- color.warning = #F59E0B
- color.error = #EF4444
- color.info = #0EA5E9

Dark Theme
- color.primary.600 = #5B8CFF
- color.primary.500 = #7AA2FF
- color.primary.100 = #1A2440
- color.secondary.600 = #2DD4BF
- color.secondary.100 = #0F2E2A
- color.background = #0B1220
- color.surface = #111827
- color.surfaceAlt = #0F172A
- color.text.primary = #F9FAFB
- color.text.secondary = #D1D5DB
- color.text.muted = #9CA3AF
- color.border = #1F2937
- color.success = #22C55E
- color.warning = #FBBF24
- color.error = #F87171
- color.info = #38BDF8

Semantic Usage
- primary: main CTAs, active tabs, progress
- secondary: highlights, pills, success accents
- surfaceAlt: cards in lists, toggles
- warning: limited access, expired items
- error: payment failures, test invalid states

2) Typography Tokens
- font.family.base = "Inter"
- font.family.kannada = "Noto Sans Kannada"
- font.size.10 = 10
- font.size.12 = 12
- font.size.14 = 14
- font.size.16 = 16
- font.size.18 = 18
- font.size.20 = 20
- font.size.24 = 24
- font.weight.regular = 400
- font.weight.medium = 500
- font.weight.semibold = 600
- font.weight.bold = 700
- line.height.tight = 1.2
- line.height.base = 1.4
- line.height.relaxed = 1.6

Type Scale (Usage)
- display = 24/700
- title = 20/600
- heading = 18/600
- body = 16/400
- bodyStrong = 16/600
- caption = 12/400
- overline = 10/500 (uppercase)

3) Spacing Tokens (base 4)
- space.2 = 2
- space.4 = 4
- space.8 = 8
- space.12 = 12
- space.16 = 16
- space.20 = 20
- space.24 = 24
- space.32 = 32
- space.40 = 40

4) Radius Tokens
- radius.4 = 4
- radius.8 = 8
- radius.12 = 12
- radius.16 = 16
- radius.full = 999

5) Elevation / Shadows
- elevation.1 = 0 1 2 rgba(0,0,0,0.06)
- elevation.2 = 0 2 6 rgba(0,0,0,0.08)
- elevation.3 = 0 6 16 rgba(0,0,0,0.12)

6) Icon Sizes
- icon.16 = 16
- icon.20 = 20
- icon.24 = 24
- icon.32 = 32

7) Component Tokens (Core)

Buttons
- button.height.sm = 36
- button.height.md = 44
- button.height.lg = 52
- button.radius = radius.12
- button.primary.bg = color.primary.600
- button.primary.text = #FFFFFF
- button.secondary.bg = color.surfaceAlt
- button.secondary.text = color.primary.600
- button.disabled.bg = #D1D5DB
- button.disabled.text = #9CA3AF

Cards
- card.radius = radius.12
- card.bg = color.surface
- card.shadow = elevation.1
- card.padding = space.16

Inputs
- input.height = 44
- input.radius = radius.8
- input.bg = color.surface
- input.border = color.border
- input.focus = color.primary.500

Chips
- chip.radius = radius.full
- chip.bg = color.surfaceAlt
- chip.text = color.text.secondary
- chip.active.bg = color.primary.100
- chip.active.text = color.primary.600

8) Motion Tokens
- motion.fast = 120ms
- motion.base = 180ms
- motion.slow = 240ms
- motion.easing = cubic-bezier(0.2, 0.0, 0.2, 1)

9) Accessibility
- min.tap.size = 44
- contrast.target = WCAG AA for text

10) Brand Tone (Usage)
- Friendly, local, confident
- Use Kannada + English for key labels
