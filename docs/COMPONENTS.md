# Component Guide

Guide to using and creating components in SaaS Starter Web.

## Component Library

### shadcn/ui Components (43+)

Located in `components/ui/`, these are pre-built, accessible components:

- **Forms**: Button, Input, Textarea, Select, Checkbox, Radio, Label
- **Data Display**: Table, Card, Badge, Avatar, Skeleton
- **Feedback**: Alert, Toast (Sonner), Dialog, Sheet, Tooltip
- **Navigation**: NavigationMenu, Tabs, Breadcrumb
- **Layout**: Separator, Sidebar, Scroll Area
- **Overlays**: Popover, DropdownMenu, AlertDialog
- **Interactive**: Command, Multi-select, Toggle, Progress

### Usage Example

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## Custom Components

### Dialogs

Use `DialogProvider` to open dialogs programmatically:

```typescript
import { useDialog } from "@/components/providers/dialog-provider";
import { NewTeamDialogContent } from "@/components/dialogs/new-team-dialog";

export function MyComponent() {
  const { openDialog } = useDialog();

  const handleCreateTeam = async () => {
    const result = await openDialog(
      <NewTeamDialogContent />,
      { size: 'sm' }
    );
    console.log('Team created:', result);
  };

  return <Button onClick={handleCreateTeam}>New Team</Button>;
}
```

### Creating a New Dialog

1. Create file in `components/dialogs/`
2. Use `IDialogBaseProps` interface:

```typescript
import { IDialogBaseProps } from "@/components/providers/dialog-provider";

interface MyDialogProps extends Partial<IDialogBaseProps<string>> {
  customProp: string;
}

export function MyDialogContent({ onClose, onDismiss, customProp }: MyDialogProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>My Dialog</DialogTitle>
      </DialogHeader>
      <DialogBody>
        {/* Content */}
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => onClose?.("result")}>Save</Button>
        <Button variant="outline" onClick={onDismiss}>Cancel</Button>
      </DialogFooter>
    </>
  );
}
```

## Provider Components

### TeamProvider

Manages user, team, and project state:

```typescript
import { useTeam } from "@/components/providers/team-provider";

export function MyComponent() {
  const { user, selectedTeam, selectedProject, setSelectedTeam } = useTeam();

  if (user.loading) return <div>Loading...</div>;
  if (!user.data) return <div>Not authenticated</div>;

  return (
    <div>
      <p>User: {user.data.displayName}</p>
      <p>Team: {selectedTeam?.displayName}</p>
      <p>Project: {selectedProject?.displayName}</p>
    </div>
  );
}
```

### DialogProvider

Centralized dialog management:

```typescript
const { openDialog, closeDialog, isOpen } = useDialog();

// Open dialog and await result
const result = await openDialog(<MyDialog />, { size: 'lg' });

// Close current dialog
closeDialog();

// Check if any dialog is open
if (isOpen) { /* ... */ }
```

## Component Patterns

### Loading States

```typescript
export function MyComponent() {
  const { data, loading } = useMyQuery();

  if (loading) {
    return <Skeleton className="h-32 w-full" />;
  }

  return <div>{data.content}</div>;
}
```

### Error Handling

```typescript
export function MyComponent() {
  const { data, error } = useMyQuery();

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return <div>{data.content}</div>;
}
```

### Forms with react-hook-form

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register("name")} />
      {form.formState.errors.name && (
        <span>{form.formState.errors.name.message}</span>
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Best Practices

1. **Use existing UI components**: Check `components/ui/` first
2. **Keep components small**: Single responsibility principle
3. **Export named exports**: Easier to refactor
4. **Type all props**: Use TypeScript interfaces
5. **Handle loading/error**: Always show feedback
6. **Responsive design**: Use mobile-first approach
7. **Accessibility**: Use semantic HTML and ARIA labels

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [React Hook Form Documentation](https://react-hook-form.com)
