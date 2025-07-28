import React, { useState } from 'react';
import Stepper, { Step } from './components/Stepper';
import './App.css';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Example steps matching the screenshot design
  const steps: Step[] = [
    { id: 'step-1', label: 'Personal Info', state: 'default' },
    { id: 'step-2', label: 'Address', state: 'disabled' },
    { id: 'step-3', label: 'Payment', state: 'disabled' },
    { id: 'step-4', label: 'Confirmation', state: 'disabled' },
    { id: 'step-5', label: 'Complete', state: 'disabled' },
  ];

  // Example showing all states as in the screenshot
  const allStatesSteps: Step[] = [
    { id: 'default', state: 'default' },
    { id: 'disabled', state: 'disabled' },
    { id: 'hover', state: 'disabled' }, // Will show hover on mouse over
    { id: 'done', state: 'done' },
    { id: 'done-disabled', state: 'done-disabled' },
  ];

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Stepper Component Demo</h1>
        
        <div className="demo-section">
          <h2>Interactive Stepper</h2>
          <p>Current step: {currentStep + 1}</p>
          
          <div className="stepper-container">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
              vertical={true}
            />
          </div>
          
          <div className="controls">
            <button onClick={prevStep} disabled={currentStep === 0}>
              Previous
            </button>
            <button onClick={nextStep} disabled={currentStep === steps.length - 1}>
              Next
            </button>
          </div>
        </div>

        <div className="demo-section">
          <h2>All States Demo</h2>
          <p>Shows all possible states as in the screenshot:</p>
          <ul>
            <li><strong>Default</strong> - Active step (blue with ring)</li>
            <li><strong>Disabled</strong> - Future steps (gray)</li>
            <li><strong>Hover</strong> - Hover over future steps (light blue)</li>
            <li><strong>Done</strong> - Completed steps (blue with checkmark)</li>
            <li><strong>Done Disabled</strong> - Completed but disabled (gray with checkmark)</li>
          </ul>
          
          <div className="stepper-container">
            <Stepper
              steps={allStatesSteps}
              currentStep={0}
              vertical={true}
            />
          </div>
        </div>

        <div className="demo-section">
          <h2>Horizontal Layout</h2>
          <div className="stepper-container">
            <Stepper
              steps={steps.slice(0, 4)}
              currentStep={1}
              onStepClick={handleStepClick}
              vertical={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;