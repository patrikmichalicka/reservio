# Stepper Component

A flexible and customizable React stepper component with multiple states and variants.

## Features

- **5 Different States**: Default, Disabled, Hover, Done, and Done-Disabled
- **Vertical and Horizontal Layouts**: Supports both orientations
- **Interactive**: Clickable steps with hover effects
- **Customizable**: Easy to style and extend
- **TypeScript Support**: Fully typed for better development experience
- **Responsive**: Works well on different screen sizes

## States

### 1. Default (Active Step)
- Blue circle with white inner dot
- Blue ring around the circle
- Represents the current active step

### 2. Disabled (Future Steps)
- Gray circle with darker gray inner dot
- Represents steps that haven't been reached yet

### 3. Hover (Future Steps on Hover)
- Light blue background with blue border
- Blue inner dot
- Shows when hovering over future steps

### 4. Done (Completed Steps)
- Blue circle with white checkmark
- Represents successfully completed steps

### 5. Done-Disabled (Completed but Disabled)
- Gray circle with gray checkmark
- Represents completed steps that are no longer accessible

## Usage

```tsx
import Stepper, { Step } from './components/Stepper';

const steps: Step[] = [
  { id: 'step-1', label: 'Personal Info', state: 'default' },
  { id: 'step-2', label: 'Address', state: 'disabled' },
  { id: 'step-3', label: 'Payment', state: 'disabled' },
  { id: 'step-4', label: 'Confirmation', state: 'disabled' },
];

function MyComponent() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      onStepClick={handleStepClick}
      vertical={true}
    />
  );
}
```

## Props

### StepperProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `steps` | `Step[]` | ✅ | - | Array of step objects |
| `currentStep` | `number` | ✅ | - | Index of the current active step |
| `onStepClick` | `(stepIndex: number) => void` | ❌ | - | Callback when a step is clicked |
| `vertical` | `boolean` | ❌ | `true` | Layout orientation |
| `className` | `string` | ❌ | `''` | Additional CSS classes |

### Step Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the step |
| `label` | `string` | ❌ | Optional text label for the step |
| `state` | `StepState` | ✅ | Current state of the step |

### StepState Type

```typescript
type StepState = 'default' | 'disabled' | 'hover' | 'done' | 'done-disabled';
```

## Advanced Usage

### Custom Step States

You can explicitly set step states to override the automatic state calculation:

```tsx
const steps: Step[] = [
  { id: 'step-1', label: 'Completed', state: 'done' },
  { id: 'step-2', label: 'Current', state: 'default' },
  { id: 'step-3', label: 'Future', state: 'disabled' },
  { id: 'step-4', label: 'Blocked', state: 'done-disabled' },
];
```

### Horizontal Layout

```tsx
<Stepper
  steps={steps}
  currentStep={currentStep}
  vertical={false}
/>
```

### Without Labels

```tsx
const steps: Step[] = [
  { id: 'step-1', state: 'done' },
  { id: 'step-2', state: 'default' },
  { id: 'step-3', state: 'disabled' },
];
```

## Styling

The component uses CSS classes that can be customized:

- `.stepper` - Main container
- `.stepper--vertical` / `.stepper--horizontal` - Layout variants
- `.step-icon` - Step circle/icon
- `.step-icon--default` / `.step-icon--disabled` / etc. - State variants
- `.step-label` - Step text label
- `.step-connector` - Lines between steps

## Behavior

1. **Automatic State Management**: The component automatically determines step states based on the `currentStep` prop
2. **Click Handling**: Only completed steps and the current step are clickable by default
3. **Hover Effects**: Future steps show hover state when moused over
4. **Accessibility**: Proper cursor states and interactive feedback

## Examples

Check the demo in `App.tsx` for comprehensive examples showing all states and usage patterns.