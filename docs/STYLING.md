# Styling Guide

Guide to styling components in SaaS Starter Web.

## Tailwind CSS 4

This project uses Tailwind CSS 4 with the following features:
- Utility-first CSS
- Custom design tokens
- Dark mode support
- Responsive design
- CSS variables for theming

## Design Tokens

### Colors

Defined in `app/globals.css`:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... more colors */
}
```

Use in Tailwind:
```tsx
<div className="bg-background text-foreground">
  <Button className="bg-primary text-primary-foreground">Click</Button>
</div>
```

### Spacing & Sizing

Follow Tailwind's spacing scale:
- `p-4` = 1rem (16px)
- `m-8` = 2rem (32px)
- `gap-2` = 0.5rem (8px)

### Typography

```tsx
<h1 className="text-4xl font-bold">Heading</h1>
<p className="text-base text-muted-foreground">Body text</p>
<span className="text-sm">Small text</span>
```

## Responsive Design

### Mobile-First Approach

Write styles for mobile, then override for desktop:

```tsx
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
  <div className="w-full md:w-1/2">Column 1</div>
  <div className="w-full md:w-1/2">Column 2</div>
</div>
```

### Breakpoints

- **Mobile**: Default (< 768px)
- **Desktop**: `md:` prefix (≥ 768px)

Example:
```tsx
<Button className="w-full md:w-auto">
  Responsive Button
</Button>
```

## Dark Mode

### Theme Provider

Dark mode is handled by `ThemeProvider`:

```tsx
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle Theme
    </Button>
  );
}
```

### Dark Mode Classes

Classes automatically switch based on theme:

```tsx
<div className="bg-white dark:bg-black">
  <p className="text-black dark:text-white">
    Adapts to theme
  </p>
</div>
```

## Component Styling

### Using cn() Utility

Merge class names with conditional logic:

```tsx
import { cn } from "@/lib/utils";

<Button
  className={cn(
    "base-classes",
    isActive && "active-classes",
    isDisabled && "disabled-classes"
  )}
>
  Button
</Button>
```

### shadcn/ui Variants

Components use `class-variance-authority`:

```tsx
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

## Layout Patterns

### Container

```tsx
<div className="container mx-auto px-4">
  {/* Centered content with max-width */}
</div>
```

### Card Layout

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Card>Content 1</Card>
  <Card>Content 2</Card>
  <Card>Content 3</Card>
</div>
```

### Sidebar Layout

```tsx
<div className="flex min-h-screen">
  <aside className="w-64 border-r">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

## Common Patterns

### Centered Content

```tsx
<div className="flex items-center justify-center min-h-screen">
  <div className="max-w-md w-full">Centered content</div>
</div>
```

### Stack

```tsx
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Flex Row with Gap

```tsx
<div className="flex items-center gap-4">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</div>
```

## Best Practices

1. **Use Tailwind utilities**: Avoid custom CSS
2. **Mobile-first**: Start with mobile styles
3. **Use design tokens**: Reference color variables
4. **Consistent spacing**: Use spacing scale
5. **Dark mode support**: Test both themes
6. **Responsive testing**: Check all breakpoints
7. **Accessibility**: Use proper contrast ratios

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)
- [Color Palette Generator](https://www.tints.dev)
