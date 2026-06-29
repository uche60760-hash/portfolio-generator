import React, { useState } from 'react'
import InputField from '../common/InputField'

// Step 1: Personal Information Form
export default function PersonalInfoForm({ data, onUpdate }) {
  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    onUpdate({
      ...data,
      [field]: value
    })
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleChange('profileImage', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Let's start with your basic details</p>
      </div>

      {/* Profile Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Profile Picture</label>
        <div className="flex items-center gap-4">
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-lg object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-3xl">📷</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Full Name */}
      <InputField
        label="Full Name"
        placeholder="John Doe"
        value={data.fullName}
        onChange={(e) => handleChange('fullName', e.target.value)}
        required
        maxLength={50}
        error={errors.fullName}
      />

      {/* Professional Title */}
      <InputField
        label="Professional Title"
        placeholder="Full Stack Developer"
        value={data.title}
        onChange={(e) => handleChange('title', e.target.value)}
        required
        maxLength={100}
        error={errors.title}
      />

      {/* Bio */}
      <InputField
        label="Short Bio"
        type="textarea"
        placeholder="Write a brief introduction about yourself..."
        value={data.bio}
        onChange={(e) => handleChange('bio', e.target.value)}
        rows={4}
        maxLength={500}
        error={errors.bio}
      />

      {/* Email */}
      <InputField
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        value={data.email}
        onChange={(e) => handleChange('email', e.target.value)}
        required
        error={errors.email}
      />

      {/* Phone */}
      <InputField
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 000-0000"
        value={data.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        error={errors.phone}
      />

      {/* Location */}
      <InputField
        label="Location"
        placeholder="San Francisco, CA"
        value={data.location}
        onChange={(e) => handleChange('location', e.target.value)}
        maxLength={100}
        error={errors.location}
      />
    </div>
  )
}
