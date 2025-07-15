# Admonitions Documentation

This blog now supports beautiful admonitions (callouts) that can be used to highlight important information, tips, warnings, and more.

## Quick Start

To use admonitions in your MDX posts, import the component and use it like this:

```mdx
---
title: "My Post"
---

import Admonition from "../../components/admonition.astro";

<Admonition type="tip" title="Pro Tip">
This is a helpful tip for readers!
</Admonition>
```

## Available Types

The following admonition types are available:

- `note` - For general notes and information (blue)
- `tip` - For helpful tips and suggestions (green)
- `info` - For informational content (cyan)
- `warning` - For warnings and cautions (yellow)
- `danger` - For critical warnings and errors (red)
- `success` - For positive outcomes and achievements (emerald)
- `example` - For code examples and demonstrations (purple)
- `quote` - For quotes and testimonials (gray)

## Props

The `Admonition` component accepts the following props:

### `type` (required)
- **Type:** `string`
- **Options:** `'note' | 'tip' | 'info' | 'warning' | 'danger' | 'success' | 'example' | 'quote'`
- **Default:** `'note'`

The type of admonition, which determines the color scheme and default icon.

### `title` (optional)
- **Type:** `string`
- **Default:** Auto-generated based on type (e.g., "Note", "Tip", etc.)

Custom title for the admonition.

### `icon` (optional)
- **Type:** `string`
- **Default:** Auto-generated based on type

Custom icon name (MDI icon). Overrides the default icon for the type.

### `collapsible` (optional)
- **Type:** `boolean`
- **Default:** `false`

Makes the admonition collapsible with a toggle button.

### `collapsed` (optional)
- **Type:** `boolean`
- **Default:** `false`

Whether the admonition should start collapsed (only works if `collapsible` is true).

## Examples

### Basic Usage

```mdx
<Admonition type="note">
This is a simple note with default styling.
</Admonition>

<Admonition type="warning">
This is a warning message.
</Admonition>
```

### Custom Titles

```mdx
<Admonition type="tip" title="Performance Tip">
Use lazy loading for images to improve page speed.
</Admonition>

<Admonition type="danger" title="Breaking Change">
This feature will be removed in v2.0.
</Admonition>
```

### Collapsible Admonitions

```mdx
<Admonition type="info" title="Click to Expand" collapsible>
This content can be hidden or shown by clicking the title.

You can include:
- Lists
- Code blocks
- Any other markdown content
</Admonition>

<Admonition type="example" title="Advanced Example" collapsible collapsed>
This starts collapsed and contains advanced information.
</Admonition>
```

### Custom Icons

```mdx
<Admonition type="tip" icon="mdi:rocket" title="Speed Boost">
Custom icons can make your admonitions more engaging.
</Admonition>
```

## Best Practices

1. **Use sparingly** - Don't overuse admonitions as they can become distracting
2. **Choose appropriate types** - Match the type to the content (warning for warnings, tip for tips, etc.)
3. **Clear titles** - Use descriptive titles that help readers understand the content
4. **Consistent styling** - Stick to the provided types for consistency across the site
5. **Mobile-friendly** - The admonitions are responsive and work well on mobile devices

## Accessibility

The admonitions are built with accessibility in mind:

- Proper ARIA attributes for screen readers
- Keyboard navigation support for collapsible admonitions
- Sufficient color contrast for readability
- Semantic HTML structure

## Dark Mode

All admonitions automatically support dark mode and will adapt their colors based on the user's theme preference.

## Migration from Old Syntax

If you were previously using the `:::type` syntax (which was commented out), you can now convert them to the component syntax:

```mdx
<!-- Old (commented out) -->
<!--
:::tip
{/* {title="My Tip"} */}
Content here
:::
-->

<!-- New -->
<Admonition type="tip" title="My Tip">
Content here
</Admonition>
```

## Technical Details

The admonitions are implemented as an Astro component that:
- Uses Tailwind CSS for styling
- Includes Material Design Icons (MDI) for icons
- Supports both light and dark themes
- Is fully responsive and mobile-friendly
- Includes JavaScript for collapsible functionality
