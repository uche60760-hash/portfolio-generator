import React from 'react'

// Step indicator component
export default function StepIndicator({ currentStep, totalSteps = 4 }) {
  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Skills' },
    { number: 3, title: 'Projects' },
    { number: 4, title: 'Export' }
  ]

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step.number <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.number <= currentStep ? '✓' : step.number}
              </div>
              <p className={`text-xs mt-2 text-center ${
                step.number <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-600'
              }`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 mb-6 ${
                  step.number < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
