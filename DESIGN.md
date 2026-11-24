# DESIGN.md: Theekshana Harischandra portfolio

## Brief
- Subject: Theekshana (Wasath) Harischandra, Senior Software Engineer / Tech Lead. Python, Java, AI, document automation.
- Audience: recruiters and freelance clients (Upwork, LinkedIn).
- Job of the site: be understood in 10 seconds, then prove it with six case studies. Get hired / booked.
- Source of truth: `Portfolio Website Plan.pdf` (all copy, projects, skills, education come from it).
- Stack: Next.js App Router + TypeScript, GSAP + Lenis. Reason: multiple page types (home, case studies, 404), contact form, static generation. No WebGL: the concept lives in type, highlight and diagrams.
- Confidentiality: never name DOK clients; "a leading insurance company in Sri Lanka"; no real documents.
- Rule from the plan: never guess numbers. Every `[X]` item is dropped from the public site and listed in the final message.

## Concept cards (three territories, one pick)

| | Idea | Anchor | Signature | Orig / Fit / Feas / Portab |
|---|---|---|---|---|
| A. Material (documents) | The page is a scan that gets recognised: noisy and skewed at the top, clean structured text as you scroll | OCR | scan to text resolve | 3 / 4 / 3 / 3 |
| B. Process (how his product answers) | The site answers "what does he build?" the way DocuMind answers: plain language, every claim footnoted to a source page, sources are the case studies | DocuMind cites the exact source page on every answer | highlighted claims light up in turn, chips open the source | 5 / 5 / 5 / 1 |
| C. Place (Sinhala) | Latin and Sinhala set side by side as a bilingual archive index | Sinhala OCR benchmark | script morph | 4 / 3 / 2 / 2 |

Pick B. Steal from C: the Sinhala name as a small recognised-text line in the hero and footer.

```
Idea:        The site is the answer to "what does he build?", written the way his DocuMind answers: grounded, with every claim cited to a source page.
Metaphor:    A retrieval answer with citations. Projects are the retrieved source documents.
Signature:   The Sources section. A sticky source sheet (the project's diagram on paper) swaps as you move through the six rows; the matching claim is highlighted. Hero claims are cited by [n] chips that cycle at rest.
Emotion:     Calm, exact, trustworthy. Someone who has read the documents.
Motion verb: highlight. A marker sweeps left to right, then settles. Page transitions are a marker swipe.
Screenshot:  The hero answer with one claim in full yellow highlight and its citation popover open on a paper sheet.
```

Anchor swap test: "Who builds document AI and cites sources" does not fit a designer or a photographer. Portability 1.

Concept survives to: footer ("Ask a follow-up."), case page (steps highlight the diagram node), 404 ("0 sources retrieved").

## Palette
| Role | Hex | Use |
|---|---|---|
| ground | `#ECEEF1` | scanner-glass grey, page background |
| paper | `#FBFBF9` | source sheets |
| ink | `#0B0C10` | text, dark sections |
| muted | `#565B66` | secondary text (AA on ground) |
| line | `rgb(11 12 16 / .16)` | hairlines |
| marker | `#FFE14A` | the highlight, the only accent |
| curtain | marker | page transitions |

Why not the avoided defaults: not cream + terracotta; marker yellow is the literal object of the concept (highlighter on paper), used for highlight and nothing else, not as an acid identity on black.
Dark sections (Sources, Contact) carry their own ground/ink via `data-tone="dark"`. Skills is a full marker field.

## Type
- Reference pass (ebuka.marketing, allerstudio.com): the name, titles, numerals, marquee and answer are set in DM Serif Display (400, tracking -0.022em to -0.03em, leading 0.86 to 1.08). Body and UI use Geist. Data labels (citation chips, source page labels, query line) use Geist Mono.
- Colour: near-black #121212 and off-white #f2f4f5 with one acid-lime accent #d5fe00, used as the highlighter marker, never as text on a light ground. The portrait is black and white; the scan lens reveals natural colour.
- Image: the portrait (me_new.png) fills the right of the hero, bleeds off the top and edge, fades at the left and bottom; the serif name overlaps it and the surname sits on a lime plate.
- Script: Noto Sans Sinhala for the Sinhala name (script coverage).
- Fluid scale from tokens.css: mega (name), xl (answer, section titles), l, m, body 17px, s 14, xs 12.

## Grid & rhythm
12 columns, gutter fluid 16 to 40px. Alignment rule: everything snaps to column 1 (left edge) or column 7 (the "answer column"), long text in 6 columns. Section rhythm: loud (hero) / quiet (about) / list (experience) / dark stage (sources) / loud field (skills) / diagram (research) / table (education) / dark finale (contact).

## Shape and motion language
- Radius 0 for paper and buttons (documents are rectangles), 2px only for citation chips.
- Eases: engine `expo.out` for entrances, `expo.inOut` for curtains. Marker sweeps 0.6 to 0.9 s. Stagger 20 to 80 ms.
- Primary targets (CTAs, nav, project rows, chips): marker sweep fills behind the text from the left. One treatment, reused. Utility links (footer, social): colour and underline only.
- Idle: hero citations cycle (every 2.6 s, paused off screen and under reduced motion), diagrams carry a packet along the path on the GSAP clock.
- Reduced motion: no Lenis, no loader theatrics, no cycle; highlights show as a static lower band under each claim.

## Composition plan
```
HERO (ground)               ABOUT (ground + white sheet)
Q  who builds ...?          | big statement |  [sheet, 1.2deg   ]
I build ▒AI document▒ [1]   | in 6 cols     |  [ about text w/  ]
  systems [2]: ...          | badges        |  [ highlighted    ]
THEEKSHANA     title        |               |  [ phrases        ]
HARISCHANDRA   badges/CTAs

EXPERIENCE (ground)         SOURCES (ink)
role-year | DOK ... bullets | [sticky sheet] | 1 DocuMind ...
sticky    | Virtusa ...     | diagram swaps  | 2 PDF pipeline ...
                            |                | ... 6

SKILLS (marker field)       RESEARCH (ground)
big group names / skills    thesis title | graph->GNN->LSTM diagram
inline running text

EDUCATION (ground)          CONTACT (ink)
table rows                  Ask a follow-up. | form | links | giant name
```
Case page: hero with title + Source chip / problem + role split / sticky diagram with steps / stack + challenges two lists / results as big numbers / next source.

## Genericness test
A generic model would give: dark hero, name huge centered, gradient, cards for projects, tech logos grid. Changed: the hero is a query and a cited answer, projects are numbered sources with a sticky paper sheet, skills are a yellow marker field with no logos or bars, 404 is "0 sources retrieved".

## Assumptions and placeholders (mirrored in final message)
- Contact email, LinkedIn, GitHub, Upwork URLs, and the domain are placeholders in `src/data/site.ts`.
- `/resume.pdf` is generated from the plan text; replace with the real CV.
- Virtusa bullets, certifications and every `[X]` metric from the plan are omitted until real numbers exist.
- Thesis summary is a neutral description of the title (no results claimed). Replace with the real abstract.
- Sinhala name text is set from the English name; confirm the spelling.
- Diagrams are drawn from the "how it works" steps in the plan, not the Upwork diagrams (not provided).
