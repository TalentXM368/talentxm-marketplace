# TalentXM motion guide

How the site moves: animation, transitions and scroll behaviour, and the rules that keep them on brand. Read this with `BRANDING.md` before adding or changing any motion.

## Direction

The site should sell by sight: a visitor should see how an agent works, not only read about it. Motion is the tool for that.

**References** (given by the team, studied in their source code):

| Reference | What we take | What we leave |
|---|---|---|
| Squarespace | One shared scroll reveal, a small set of easing curves, cards that respond on hover, a rail of large cards, full support for reduced motion | Hero video (we have no footage yet), counting stats (we have no sourced numbers) |
| Lusion | Very large display type against small text, headings that rise from behind a mask, rolling button labels, one signature visual in the hero, a huge closing call to action, sections that slide over each other | Hijacked scrolling, blocked zoom, sound, a heavy 3D scene, no reduced-motion support |

**Level chosen:** hybrid. A refined base on every section, plus two signature moments on the home page: the ribbon field in the hero and the pinned agent story.

## Principles

1. **Motion explains the product.** The strongest animation on a page shows an agent doing its job: inputs arrive, the agent acts, a person decides, systems update.
2. **One idea per section.** A section gets one motion pattern, not three.
3. **Content never depends on motion.** Everything is in the server HTML and readable with JavaScript off, with reduced motion on, and on a slow phone.
4. **Play once.** Reveals run the first time an element enters the screen and never replay while scrolling up and down.
5. **Fast in, calm after.** Entrances are quick and ease out; nothing loops except the ribbon field, the slow background mesh and the small scroll hint.
6. **The page scrolls natively.** No smooth-scroll library and no scroll hijacking.

## Tokens

Defined in `app/globals.css` under `:root`. Use these; do not write new durations or curves in components.

| Token | Value | Use |
|---|---|---|
| `--txm-dur-fast` | 200ms | Colour and state changes |
| `--txm-dur-base` | 400ms | Hover movement, stage changes |
| `--txm-dur-reveal` | 800ms | Scroll reveals, load-in |
| `--txm-dur-slow` | 1200ms | Lines that draw |
| `--txm-ease-out` | `cubic-bezier(0.19, 1, 0.22, 1)` | Anything entering: reveals, cards lifting |
| `--txm-ease-sharp` | `cubic-bezier(0.4, 0, 0.1, 1)` | Direct interaction: rolling button labels |
| `--txm-ease-in-out` | `cubic-bezier(0.645, 0.045, 0.355, 1)` | State changes and drawn lines |
| `--txm-reveal-distance` | 24px | How far a revealed element travels |
| `--txm-stagger` | 80ms | Delay between items in a group |

Only `transform` and `opacity` are animated, so motion stays smooth on low-power devices.

## Patterns

Each pattern has one implementation. Reuse it; do not build a second version.

### Reveal

- **What:** an element fades in and rises 24px as it enters the screen.
- **Where:** section headers, card grids, any block below the first screen.
- **How:** `<Reveal>` in `components/motion/reveal.tsx`. Add `stagger` to reveal direct children one after another (card grids), and `reverse` to start from the last child (the stack diagram builds from the foundation up).
- **Trigger:** when 10% of the element is on screen, once. Elements already on screen at load are left alone, so nothing flashes.
- **Not for:** the first screen of a page (use Load-in), or text inside a card that is already being revealed.

### Heading reveal

- **What:** each word of a heading rises from behind a mask, 45ms apart.
- **Where:** the hero H1 on load; section H2s on scroll via `<SectionHeader reveal>`; the closing call to action.
- **How:** `<SplitText text="…" />` in `components/motion/split-text.tsx`. The words stay real text, so screen readers and search engines read the heading normally.
- **Not for:** body copy, or headings longer than about twelve words.

### Load-in

- **What:** the pieces around the hero headline (eyebrow, lede, buttons, scroll hint) fade up in sequence after the headline.
- **How:** class `txm-load` with `style={{ "--i": n }}` for the order. Built into `Hero`.

### Display type

- **What:** the large, tight headline. It is what makes the page feel designed before anything moves.
- **How:** `.txm-display` (hero, up to 88px) and `.txm-display-xl` (closing call, up to 120px). Enable with `<Hero display>` and `<CTABand size="xl">`.
- **Limit:** one display headline per screen.

### Ribbon field (brand shapes)

- **What:** the large flowing forms from the brand board's website concept: an orange ribbon with a glowing rim and a fine dot texture, over a teal crescent and a yellow lobe, with two hairline arcs and light film grain. They wipe in from the right on load, drift slowly, shift a little with the pointer and slide as the page scrolls.
- **Colour:** Energy Orange-Red, Human Teal and Opportunity Yellow on deep navy. On an orange surface (`palette="on-orange"`) the ribbon becomes Trust Blue.
- **How:** `<RibbonField />` in `components/motion/ribbon-field.tsx`. Every `Hero` shows it: the home hero at full strength, interior heroes with `tone="soft"`. One inline SVG moved with CSS; no canvas and no 3D library.
- **Rules:** shapes stay on the right so the headline on the left keeps its contrast; on small screens they sit behind the text at 38% opacity; decorative and hidden from assistive technology.
- **Limit:** hero and closing call only. Do not place it behind body content.

### Pinned story (the agent at work)

- **What:** the section stays fixed while scrolling walks through four stages: Inputs, Agent, Human decision, Systems. A progress rail on the left fills as you go.
- **Why:** this is the main "show, don't tell" moment. The human decision stage is the only one on the brand gradient, so the eye lands on the point that a person stays in charge.
- **How:** `<AgentFlowStory>` in `components/motion/agent-flow-story.tsx`. The home page builds the stages from a real agent record in `content/agents.ts` (`inputs`, `actions`, `humanDecisionPoints`, `techTags`); change `featuredAgentSlug` in `app/page.tsx` to feature another agent.
- **Fallback:** on screens under 1024px, with reduced motion, or without JavaScript, the four stages are simply stacked in the page.
- **Limit:** one pinned section per page. Each stage holds about 80% of a screen of scrolling; do not make it longer.

### Rail

- **What:** a horizontal row of large cards that scrolls sideways and snaps to each card.
- **How:** `<Rail label="…">` in `components/motion/rail.tsx` with `<li>` children. It uses native scrolling, so touch, trackpad and keyboard work; the arrow buttons move one card.
- **Not for:** fewer than four cards (use a grid).

### Hover

- **Cards:** `.txm-card` lifts 4px, gains a deeper shadow and an orange-tinted border, over 400ms.
- **Buttons:** on filled and outline buttons the label rolls up and a copy rolls in from below (`.txm-roll`, built into `ButtonLink`). Text links keep the arrow nudge.
- **Rule:** hover effects only run on devices with a real pointer.

### Drawn line

- **What:** a gradient line draws from left to right above a row of steps, then the steps rise in.
- **How:** `<JourneySteps reveal>`.

### Sheet

- **What:** a dark section with rounded top corners that overlaps the section before it, so it appears to slide over the page.
- **How:** class `txm-sheet` on a dark `Section`. Give the section before it extra bottom padding.
- **Limit:** once per page.

### Page transition

- **What:** on navigation the old page fades out quickly (160ms) and the new one rises in (460ms). The header does not move.
- **How:** `app/template.tsx` wraps every page in React's `ViewTransition`; the header is anchored with `viewTransitionName: "site-header"`. Browsers without support simply switch pages.

### Closing call

- **What:** a full-width Energy Orange-Red band with the largest type on the page, the ribbon field in Trust Blue, and the primary action as a deep navy pill. It is the one full-colour surface on a page.
- **How:** `<CTABand size="xl">`.

## Scroll triggers

- Threshold: 10% of the element visible, with the trigger line 6% above the bottom of the screen.
- Once only. If a visitor leaves the page and comes back, revealed elements stay revealed.
- Pinned content must clear the fixed header; use `--txm-header-h`.
- In-page links land below the header (`scroll-padding-top` is already set).

## Brand in motion

- Moving colour is limited to the brand shapes (ribbon field) and the brand gradient, on deep navy or on Energy Orange-Red.
- The background mesh keeps its low opacity; white text sits on it.
- Text on the gradient is navy, never white.
- One bright colour per component still applies when things move.

## Accessibility

| Pattern | With "reduce motion" on |
|---|---|
| Reveal, heading reveal, load-in | Content is visible immediately, no movement |
| Ribbon field | Still shapes, no drift, no pointer or scroll movement |
| Pinned story | Stages stacked in the page, no pinning |
| Rail | Still scrolls; buttons jump without animation |
| Hover lift and rolling labels | Off |
| Drawn line | Shown complete |
| Page transition | Instant page change |
| Background mesh, scroll hint | Still |

Also:
- Keyboard focus is always visible, and focus order follows the reading order.
- Nothing flashes, and nothing moves by itself for more than a few seconds apart from slow background drift.
- Zoom and text selection are never disabled.

## Performance

- No animation library is installed. Reveals use `IntersectionObserver` plus CSS; the story uses one scroll listener throttled to a frame; the ribbon field is one inline SVG moved with CSS.
- The hero headline is real text and appears within the first second; the canvas starts after the page is interactive.
- Every observer, listener and animation loop is cleaned up when a page is hidden, because Next keeps previous pages mounted.
- Before adding a dependency (Motion, GSAP, three.js), show that the pattern cannot be built with what is here.

## Mobile

- Pinned story becomes four stacked cards.
- Ribbon field sits behind the text at 38% opacity.
- Rails use native swipe with snap.
- Hover effects do not run on touch.

## Home page script

| # | Section | Motion |
|---|---|---|
| 1 | Hero | Display headline rises word by word; ribbon field; brand signature line; load-in; scroll hint |
| 2 | Frameworks strip | Reveal |
| 3 | Inside an agent | Pinned story |
| 4 | What we do | Heading reveal; four cards staggered |
| 5 | Five domains, one stack | Layers build from the foundation up |
| 6 | Define. Match. Deploy. | Drawn line, then steps |
| 7 | Six agents | Rail |
| 8 | Industries | Cards staggered |
| 9 | Delivery models | Sheet; two panels staggered |
| 10 | Work, Trust | Cards staggered |
| 11 | Closing call | Display-XL headline on orange with the ribbon field in Trust Blue |
| 12 | Marketplace teaser | Still |

## Roadmap for other pages

Not built yet; apply with the same components.

- **Agent page (`/ai-agents/[slug]`):** replace the static four-box flow with `AgentFlowStory` for that agent; reveal on current versus assisted workflow.
- **POC Library:** staggered grid; on the POC page, a progress line on the walkthrough timeline tied to the video.
- **Services:** stack diagram reveal with the current layer highlighted; capability cards staggered.
- **Industries:** use-case rows revealed in sequence.
- **Later, with assets:** short self-hosted video loops on POC cards, and shared-element transitions from a card to its page.

## Adding motion

1. Check whether a pattern above already does it.
2. Use the tokens; animate only `transform` and `opacity`.
3. Keep content in the server HTML; put only the behaviour in a small client component.
4. Add the reduced-motion behaviour to the table above, and clean up in effects.
5. Update this file in the same change.
