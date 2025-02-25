'use client';

import React from 'react';

export interface Step {
  id: number;
  title: string;
  label?: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep - 1;
        const isCurrentStep = index === currentStep - 1;
        const isUpcoming = index > currentStep - 1;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${isCompleted ? 'bg-black text-white' : ''}
                  ${isCurrentStep ? 'bg-yellow-400 text-black' : ''}
                  ${isUpcoming ? 'bg-gray-200 text-gray-500' : ''}
                  transition-all duration-200
                `}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCurrentStep ? 'text-black' :
                  isCompleted ? 'text-gray-700' : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  index < currentStep - 1 ? 'bg-black' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
