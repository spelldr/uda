# Documentation Review Checklist

Use this checklist when reviewing pull requests to ensure all contributions meet UDA standards.

## Routing & Content Type

- [ ] Page title clearly states user intent
- [ ] Page is routed to correct section per routing matrix
- [ ] Page type (`task`, `concept`, `reference`, etc.) matches routing matrix
- [ ] Page answers exactly ONE question (not multiple)
- [ ] No content mixing: page is pure Task OR Concept OR Reference (not blended)

## Metadata Completeness

- [ ] YAML frontmatter present at top of file
- [ ] `title` field is present and unique in directory
- [ ] `description` is a single sentence, max 160 chars
- [ ] `tags` field has 2-5 tags from controlled vocabulary
- [ ] `owner` field is valid GitHub handle or team
- [ ] `status` is one of: `current`, `deprecated`, `draft`, `review`
- [ ] `last_verified` is in YYYY-MM-DD format
- [ ] `review_cycle` is one of: `monthly`, `quarterly`, `annual`
- [ ] `type` matches the page's routing (task, concept, reference, etc.)

## Content Quality

- [ ] Title is clear and actionable (no "and", "overview", "general")
- [ ] Description accurately summarizes the page
- [ ] Writing is concise (typical page: 3-5 minutes to read)
- [ ] No narrative, history, or "we used to..." language
- [ ] No miscellaneous sections or catch-all content
- [ ] All claims are verifiable against current system state
- [ ] Code examples (if any) are tested and current

## Linking & Navigation

- [ ] Links follow routing matrix rules (check "Allowed Links →" column)
- [ ] No Task-to-Task links; use Concepts as bridge
- [ ] No circular links (A → B → A)
- [ ] All links point to existing pages (no broken links)
- [ ] Cross-linking bridges different sections appropriately

## Structure & Formatting

- [ ] Uses appropriate template for page type
- [ ] Headings follow hierarchy (no skipped levels like # then ###)
- [ ] Code blocks are properly formatted with language identifier
- [ ] Lists are consistently formatted (bullets or numbers as appropriate)
- [ ] No walls of text; content is scannable
- [ ] Images have alt text (accessibility)
- [ ] Tables are properly formatted and readable

## Accessibility

- [ ] Titles don't use jargon without definition
- [ ] Technical terms are defined or linked to glossary
- [ ] Content is clear to the target audience level
- [ ] Code examples include explanations
- [ ] Instructions are step-numbered when procedural
- [ ] Warnings and alerts use clear formatting

## Duplication & Single Source of Truth

- [ ] Content is not duplicated elsewhere in documentation
- [ ] If similar content exists, cross-links are used instead
- [ ] One authoritative source is identified for each fact
- [ ] Deprecated pages link to replacement resource

## File Naming & Organization

- [ ] File name matches directory routing (Task, Concept, Reference, etc.)
- [ ] File name includes page type prefix (e.g., "Task - ", "Concept - ")
- [ ] File naming is consistent with existing files
- [ ] No spaces or special characters in file names (except hyphens)

## Special Cases

### For Task Pages
- [ ] Steps are numbered and sequential
- [ ] Prerequisites are listed upfront
- [ ] Estimated time to complete is provided
- [ ] Links to reference and concepts, not other tasks
- [ ] Troubleshooting section links to Troubleshooting pages

### For Concept Pages
- [ ] Explains "what" and "why", not "how"
- [ ] No step-by-step instructions
- [ ] Links to related concepts and relevant tasks
- [ ] Avoids narrative or historical context

### For Reference Pages
- [ ] Information is structured (tables, lists, or fields)
- [ ] Each field/entry is concisely documented
- [ ] No procedural instructions
- [ ] Links to concepts that explain the reference data

### For Troubleshooting Pages
- [ ] Problem is clearly stated in title
- [ ] Diagnosis steps are provided
- [ ] Links to task pages for resolution steps
- [ ] Multiple solutions are covered if applicable

### For Release Notes
- [ ] Version number and date are clear
- [ ] Breaking changes are highlighted
- [ ] Migration steps are provided for breaking changes
- [ ] Links to relevant ADRs or concepts

### For ADRs
- [ ] Decision is clearly stated
- [ ] Context (why the decision was needed) is explained
- [ ] Decision (what was chosen) is described
- [ ] Consequences (trade-offs) are documented
- [ ] Alternatives considered are listed

## Maintainer-Only Decisions

### Routine Changes (1 maintainer approval)
- Content updates
- Clarifications or corrections
- Bug fixes
- Minor template improvements

### Structural Changes (2 maintainer approvals)
- Routing changes
- Metadata schema updates
- New content types
- New sections in folder structure
- Starter Kit modifications

### Governance Changes (Unanimous maintainer approval)
- Changes to this checklist
- Role definitions
- Release cadence modifications
- Decision-making rules

## CI/Lint Checks

Ensure the PR passes automated checks:

- [ ] Markdown lint (`.markdownlint.yml`)
- [ ] Spell check (`.cspell.json`)
- [ ] Link validation (no broken internal/external links)
- [ ] YAML frontmatter validation
- [ ] Metadata schema compliance
- [ ] File naming conventions

## Sign-Off

- [ ] Reviewer confirms: "This page follows UDA standards"
- [ ] Maintainer approves merge
- [ ] Page is added to routing index (if applicable)

---

## Quick Rejection Reasons

Automatically reject if:

- [ ] Missing YAML frontmatter
- [ ] No `title`, `description`, or `owner`
- [ ] Content is blended (Task + Concept, etc.)
- [ ] Routing violates matrix
- [ ] Broken internal links
- [ ] Metadata schema violation
- [ ] Draft or review status pages included in release
