---
name: frontend-design
description: Designs distinctive web interfaces. Use when building new UI or changing an existing page's visual direction.
license: Complete terms in LICENSE.txt
---

# Frontend Design

Build a visual identity grounded in the subject, audience, and page's purpose. The user's brief and
the site's existing design language take precedence over novelty. State material assumptions when
the brief leaves the direction open.

## Design criteria

- Use real content and subject-specific details rather than a generic landing-page template.
- Make palette, typography, spacing, and hierarchy coherent. In this repository, use the shared
  StyleX tokens and styling contract in `docs/stylex.md` rather than inventing a separate token layer.
- Let structure convey information: numbering should represent an actual sequence, and dividers or
  labels should clarify the content rather than decorate it.
- Give the page a clear focal point. Motion and ornament should support it, with reduced-motion
  behavior, visible keyboard focus, and responsive layouts preserved.
- Match complexity to the brief: restraint depends on precise spacing and type, not empty content.

## Interface copy

Name actions by their effect ("Save changes"), and keep vocabulary consistent across controls and
feedback ("Publish" → "Published"). Write in the user's terms rather than implementation jargon.
Errors explain the failure and recovery; empty states point to a useful next action. Match the tone
to the site and avoid filler or sales copy where a label would do.
