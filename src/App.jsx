import { useState } from 'react'
import FormStep from './components/Form/FormStep'
import PreviewSection from './components/Preview/PreviewSection'
import Header from './components/common/Header'

export default function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [portfolioData, setPortfolioData] = useState({
    personal: {
      fullName: '',
      title: '',
      bio: '',
      email: '',
      phone: '',
      location: '',
      profileImage: null
    },
    skills: [],
    projects: [],
    social: {
      github: '',
      linkedin: '',
      twitter: '',
      portfolio: ''
    }
  })

  const handleUpdateData = (section, data) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="animate-fade-in">
            <FormStep
              step={currentStep}
              portfolioData={portfolioData}
              onUpdateData={handleUpdateData}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
            />
          </div>

          {/* Live Preview Section */}
          <div className="hidden lg:block animate-fade-in">
            <div className="sticky top-4">
              <PreviewSection portfolioData={portfolioData} />
            </div>
          </div>
        </div>

        {/* Mobile Preview */}
        <div className="lg:hidden mt-12 animate-fade-in">
          <PreviewSection portfolioData={portfolioData} />
        </div>
      </div>
    </div>
  )
}
