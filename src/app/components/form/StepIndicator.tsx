'use client';

import React from 'react';

interface Step {
  id: number;
  title: string;
  label: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick
}) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step) => {
          const isCurrentStep = step.id === currentStep;
          const isCompleted = completedSteps.includes(step.id);
          const canClick = isCompleted || step.id === currentStep;

          return (
            <li key={step.title} className="md:flex-1">
              <button
                type="button"
                onClick={() => canClick && onStepClick(step.id)}
                className={`
                  group flex flex-col w-full 
                  ${canClick ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                `}
                disabled={!canClick}
              >
                <span className="flex items-start text-sm font-medium">
                  <span className={`
                    flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full
                    ${isCurrentStep ? 'bg-blue-600 text-white' : 
                      isCompleted ? 'bg-green-600 text-white' : 
                      'border-2 border-gray-300 text-gray-500'}
                  `}>
                    {isCompleted ? (
                      <svg 
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span>{step.label}</span>
                    )}
                  </span>
                  <span className="ml-4 mt-0.5 flex flex-col">
                    <span className={`
                      text-sm font-medium
                      ${isCurrentStep ? 'text-blue-600' : 
                        isCompleted ? 'text-gray-900' : 'text-gray-500'}
                    `}>
                      {step.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step.description}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default StepIndicator;
