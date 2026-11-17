# TalentXM motion guide

How the site moves: animation, transitions and scroll behaviour, and the rules that keep them on brand. Read this with `BRANDING.md` before adding or changing any motion.

## Direction

The site should sell by sight: a visitor should see how an agent works, not only read about it. Motion is the tool for that.

**References** (given by the team, studied in their source code):

| Reference | What we take | What we leave |
|---|---|---|
| Squarespace | One shared scroll reveal, a small set of easing curves, cards that respond on hover, a rail of large cards, full support for reduced motion | Hero video (we have no footage yet), counting stats (we have no sourced numbers) |
| Lusion | Very large display type against small text, headings that rise from behind a mask, rolling button labels, one signature visual in the hero, a huge closing call to action, sections that slide over each other | Hijacked scrolling, blocked zoom, sound, a heavy 3D scene, no reduced-motion support |

**Level chosen:** hybrid. A refined base on every section, plus signature moments on the home page: the logo form in the hero, the agent flow, and scroll-linked type in place of card grids. Home sections are built as one idea each, set large, not as rows of identical cards.

## Principles

1. **Motion explains the product.** The strongest animation on a page shows an agent doing its job: inputs arrive, the agent acts, a person decides, systems update.
2. **One idea per section.** A section gets one motion pattern, not three.
3. **Content never depends on motion.** Everything is in the server HTML and readable with JavaScript off, with reduced motion on, and on a slow phone.
4. **Play once.** Reveals run the first time an element enters the screen and never replay while scrolling up and down. The exception is depth on scroll, which is tied to scroll position by design and settles flat.
5. **Fast in, calm after.** Entrances are quick and ease out; nothing loops except the logo form and the small scroll hint.
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

### Logo form

- **What:** the TalentXM mark larger than the hero and cut by its top, bottom and right edges, as on the brand essence board ("Human Intelligence Extended"). Orange, yellow and teal blend inside it; its rims glow against deep navy. It is drawn in 3D from its first frame: it breathes slowly, catches light from the pointer and recedes as the page scrolls.
- **How:** `<LogoForm />` in `components/motion/logo-form.tsx`, with the mark's paths in `components/brand/mark-paths.ts`. On deep navy, WebGL (`components/motion/logo-form-gl.ts`) starts as soon as the component mounts: the mark is turned into a signed distance field and drawn by one fragment shader. Raw WebGL, no library. The inline SVG is in the HTML but stays hidden while WebGL starts (CSS `@media (scripting: enabled)`), so the flat version never flashes first.
- **Variants:** `tone="hero"` on the home page; `tone="soft"`, placed further right and dimmer, on every interior `Hero` and inner-page closing band. `palette="on-orange"` draws the mark flat in Trust Blue for the home closing call.
- **Rules:** the form stays on the right so the headline on the left keeps its contrast; on small screens it sits behind the text at reduced opacity; decorative and hidden from assistive technology.
- **Fallback:** without JavaScript, without WebGL (`data-gl="off"`), if the WebGL context is lost, if the first frame has not arrived after 2.5 seconds, or with reduced motion, the still SVG shows.
- **Limit:** heroes and closing bands only, so at most two per page. Do not place it behind body content.

### Agent flow (the agent at work)

- **What:** one request travels along a line through the four stations of an agent: Inputs, Agent, Human decision, Systems. The current station is lit, the line fills in Energy Orange-Red behind it, and a yellow packet rides the line. It rests longest at the human decision, the only station drawn in Opportunity Yellow.
- **Why:** this is the main "show, don't tell" moment. It plays by itself, so there is no card-by-card scrolling to get through, and the eye lands on the point where a person stays in charge.
- **How:** `<AgentFlow>` in `components/motion/agent-flow.tsx`. It plays only while at least a third of it is on screen; a pause button stops it, and clicking any station opens that one and stops playback. Items can link (`href`).
- **Where:** the home page uses it to explain the whole offer (platforms and data, AI agents, people decide, teams), each item linking to the page that covers it. Every agent page (`/ai-agents/[slug]`) uses it for that agent, built from its record in `content/agents.ts` (`inputs`, `actions`, `humanDecisionPoints`, `techTags`).
- **Fallback:** without JavaScript, or with reduced motion, every station is shown at full strength and nothing plays. Under 1024px the stations stack, joined by short connectors.

### Rail

- **What:** a horizontal row of large cards that scrolls sideways and snaps to each card.
- **How:** `<Rail label="…">` in `components/motion/rail.tsx` with `<li>` children. It uses native scrolling, so touch, trackpad and keyboard work; the arrow buttons move one card.
- **Not for:** fewer than four cards (use a grid).

### Hover

- **Cards:** `.txm-card` lifts 4px, gains a deeper shadow and an orange-tinted border, over 400ms.
- **Buttons:** on filled and outline buttons the label rolls up and a copy rolls in from below (`.txm-roll`, built into `ButtonLink`). Text links keep the arrow nudge.
- **Rule:** hover effects only run on devices with a real pointer.

### Drawn line

- **What:** a solid orange line draws from left to right above a row of steps, then the steps rise in.
- **How:** `<JourneySteps reveal>`.

### Scroll-linked type and layout

CSS scroll-driven animations (`animation-timeline`) in `app/globals.css`, used in place of card grids on the home page. They are tied to scroll position, so they also run backwards, and everything comes to rest fully visible. With reduced motion, or in browsers without support, the layout is shown still and complete.

- **Scroll-lit statement** (`<ScrubStatement>` in `components/motion/scroll-type.tsx`): a large sentence whose words brighten one after another as it moves up the screen. One per page.
- **Step words** (`<StepWords>`, same file): a real sequence set as very large words that start as outlines and fill in, one after another. Use only for content that is a sequence.
- **Spotlight index** (`<StackIndex>` in `components/sections/stack-index.tsx`): the service domains as large type rows, top layer first; each row's words drift in and brighten as it passes the middle of the screen. From 768px up.
- **Coverflow rail** (`<Rail coverflow>`): cards near the edges of the rail turn away in depth and fade; cards fully in view face forward. Driven by the rail's own sideways scroll. From 768px up.
- **Hours band** (`<FollowTheSun>` in `components/motion/follow-the-sun.tsx`): each delivery hub's working day on one 24-hour axis in the visitor's time zone, with a line at the current time. Bars grow in on scroll. Before the visitor's clock is known (server render), it is drawn in UTC.
- **Expanding panels** (`<IndustryPanels>` in `components/sections/industry-panels.tsx`): industries as tall photo panels side by side; the one under the pointer or keyboard focus widens. This answers the visitor, it is not scroll-linked. Stacked under 1024px.

### Sheet

- **What:** a dark section with rounded top corners that overlaps the section before it, so it appears to slide over the page.
- **How:** class `txm-sheet` on a dark `Section`. Give the section before it extra bottom padding.
- **Limit:** once per page.

### Page transition

- **What:** on navigation the old page fades out quickly (160ms) and the new one rises in (460ms). The header does not move.
- **How:** `app/template.tsx` wraps every page in React's `ViewTransition`; the header is anchored with `viewTransitionName: "site-header"`. Browsers without support simply switch pages.

### Closing call

- **What:** a full-width Energy Orange-Red band with the largest type on the page, the logo form in Trust Blue, and the primary action as a deep navy pill. It is the one full-colour surface on a page.
- **How:** `<CTABand size="xl">`.

## Scroll triggers

- Threshold: 10% of the element visible, with the trigger line 6% above the bottom of the screen.
- Once only. If a visitor leaves the page and comes back, revealed elements stay revealed.
- Sticky or fixed content must clear the fixed header; use `--txm-header-h`.
- In-page links land below the header (`scroll-padding-top` is already set).

## Brand in motion

- Moving colour is limited to the logo form, on deep navy or on Energy Orange-Red. The brand colours never blend in UI fills (BRANDING.md, "Gradient").
- Text on yellow or orange is navy, never white.
- One bright colour per component still applies when things move.

## Accessibility

| Pattern | With "reduce motion" on |
|---|---|
| Reveal, heading reveal, load-in | Content is visible immediately, no movement |
| Logo form | Still SVG, no WebGL, no drift |
| Scroll-linked type and layout | Shown still and complete |
| Agent flow | Does not play; every station at full strength; stations can still be opened |
| Rail | Still scrolls; buttons jump without animation |
| Hover lift and rolling labels | Off |
| Drawn line | Shown complete |
| Page transition | Instant page change |
| Scroll hint | Still |

Also:
- Keyboard focus is always visible, and focus order follows the reading order.
- Nothing flashes. The only thing that moves by itself for long is the agent flow, which can be paused and stops when it leaves the screen, plus slow background drift.
- Zoom and text selection are never disabled.

## Performance

- No animation library is installed. Reveals use `IntersectionObserver` plus CSS; the agent flow uses one timer and one `IntersectionObserver`; scroll-linked type and layout is pure CSS; the logo form is an inline SVG plus, on the home hero, one raw WebGL fragment shader.
- The WebGL logo form starts when the browser is idle, is code-split, caps the pixel ratio at 1.5, and pauses when the hero is off screen or the tab is hidden.
- The hero headline is real text and appears within the first second; the canvas starts after the page is interactive.
- Every observer, listener and animation loop is cleaned up when a page is hidden, because Next keeps previous pages mounted.
- Before adding a dependency (Motion, GSAP, three.js), show that the pattern cannot be built with what is here.

## Mobile

- Agent flow stations stack, joined by short connectors.
- Logo form sits behind the text at reduced opacity.
- The spotlight index and coverflow are still below 768px; the statement, step words and hours band still animate.
- Rails use native swipe with snap.
- Hover effects do not run on touch.

## Home page script

| # | Section | Motion |
|---|---|---|
| 1 | Hero | Display headline rises word by word; logo form (WebGL); tagline under a hairline rule; load-in; scroll hint |
| 2 | Client logos (when there are any) | Reveal |
| 3 | How it works: platforms and data, agents, people decide, teams | Agent flow, every step linking to its page |
| 4 | Five domains, one stack | Scroll-lit statement, then spotlight index |
| 5 | Define. Match. Deploy. | Step words |
| 6 | Six agents | Coverflow rail |
| 7 | Industries | Expanding panels |
| 8 | Hours and delivery models | Hours band; delivery models on one line |
| 9 | Work and trust | Rows staggered; frameworks |
| 10 | Closing call | Display-XL headline on orange with the logo form in Trust Blue |
| 11 | Marketplace teaser | Still |

## Roadmap for other pages

Not built yet; apply with the same components.

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
