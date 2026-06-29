import React from 'react'
import StepIndicator from '../common/StepIndicator'
import Button from '../common/Button'
import PersonalInfoForm from './PersonalInfoForm'
import SkillsForm from './SkillsForm'
import ProjectsForm from './ProjectsForm'
import ExportForm from './ExportForm'

// Main form component that manages all steps
export default function FormStep({
  step,
  portfolioData,
  onUpdateData,
  onNextStep,
  onPrevStep
}) {
  const renderFormContent = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfoForm
            data={portfolioData.personal}
            onUpdate={(data) => onUpdateData('personal', data)}
          />
        )
      case 2:
        return (
          <SkillsForm
            data={portfolioData.skills}
            onUpdate={(data) => onUpdateData('skills', data)}
          />
        )
      case 3:
        return (
          <ProjectsForm
            data={portfolioData.projects}
            onUpdate={(data) => onUpdateData('projects', data)}
          />
        )
      case 4:
        return (
          <ExportForm
            portfolioData={portfolioData}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="card animate-slide-in">
      <StepIndicator currentStep={step} />
      
      {/* Form Content */}
      <div className="mt-8">
        {renderFormContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex gap-4">
        <Button
          onClick={onPrevStep}
          variant="secondary"
          disabled={step === 1}
          fullWidth
        >
          ← Back
        </Button>
        {step < 4 && (
          <Button
            onClick={onNextStep}
            variant="primary"
            fullWidth
          >
            Next →
          </Button>
        )}
      </div>
    </div>
  )
}
