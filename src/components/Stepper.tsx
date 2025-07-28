import React, { useState } from 'react';
import './Stepper.css';

export type StepState = 'default' | 'disabled' | 'hover' | 'done' | 'done-disabled';

export interface Step {
  id: string;
  label?: string;
  state: StepState;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  vertical?: boolean;
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  vertical = true,
  className = '',
}) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const getStepState = (stepIndex: number, step: Step): StepState => {
    // If explicitly set to done-disabled, respect that
    if (step.state === 'done-disabled') {
      return 'done-disabled';
    }
    
    // If step is completed and before current step
    if (stepIndex < currentStep) {
      return 'done';
    }
    
    // Current active step
    if (stepIndex === currentStep) {
      return 'default';
    }
    
    // Future steps - show hover state if being hovered
    if (stepIndex > currentStep) {
      if (hoveredStep === stepIndex) {
        return 'hover';
      }
      return 'disabled';
    }
    
    return step.state;
  };

  const handleStepClick = (stepIndex: number) => {
    const step = steps[stepIndex];
    // Only allow clicking on completed steps or current step
    if (stepIndex <= currentStep && step.state !== 'done-disabled') {
      onStepClick?.(stepIndex);
    }
  };

  const handleMouseEnter = (stepIndex: number) => {
    const step = steps[stepIndex];
    // Only show hover for future steps that aren't done-disabled
    if (stepIndex > currentStep && step.state !== 'done-disabled') {
      setHoveredStep(stepIndex);
    }
  };

  const handleMouseLeave = () => {
    setHoveredStep(null);
  };

  const renderStepIcon = (stepIndex: number, state: StepState) => {
    switch (state) {
      case 'done':
        return (
          <div className="step-icon step-icon--done">
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path
                d="M1 4.5L4.5 8L11 1.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case 'done-disabled':
        return (
          <div className="step-icon step-icon--done-disabled">
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path
                d="M1 4.5L4.5 8L11 1.5"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case 'default':
        return (
          <div className="step-icon step-icon--default">
            <div className="step-icon__inner" />
          </div>
        );
      case 'hover':
        return (
          <div className="step-icon step-icon--hover">
            <div className="step-icon__inner" />
          </div>
        );
      case 'disabled':
      default:
        return (
          <div className="step-icon step-icon--disabled">
            <div className="step-icon__inner" />
          </div>
        );
    }
  };

  const renderConnector = (stepIndex: number) => {
    if (stepIndex === steps.length - 1) return null;
    
    const isCompleted = stepIndex < currentStep;
    return (
      <div className={`step-connector ${isCompleted ? 'step-connector--completed' : 'step-connector--pending'}`} />
    );
  };

  return (
    <div className={`stepper ${vertical ? 'stepper--vertical' : 'stepper--horizontal'} ${className}`}>
      {steps.map((step, index) => {
        const state = getStepState(index, step);
        const isClickable = index <= currentStep && step.state !== 'done-disabled';
        
        return (
          <div key={step.id} className="stepper__step-container">
            <div
              className={`stepper__step ${isClickable ? 'stepper__step--clickable' : ''}`}
              onClick={() => handleStepClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {renderStepIcon(index, state)}
              {step.label && (
                <span className={`step-label step-label--${state}`}>
                  {step.label}
                </span>
              )}
            </div>
            {vertical && renderConnector(index)}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;