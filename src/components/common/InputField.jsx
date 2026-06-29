import React from 'react'

// Reusable input field component
export default function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  maxLength,
  rows,
  error
}) {
  const isTextarea = type === 'textarea'

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows || 4}
          className={`input-field ${error ? 'border-red-500' : ''}`}
          maxLength={maxLength}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`input-field ${error ? 'border-red-500' : ''}`}
          maxLength={maxLength}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {maxLength && (
        <p className="text-xs text-gray-500 mt-1">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  )
}
