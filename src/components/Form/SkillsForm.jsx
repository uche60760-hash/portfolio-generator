import React, { useState } from 'react'
import InputField from '../common/InputField'
import Button from '../common/Button'

// Step 2: Skills Form
export default function SkillsForm({ data, onUpdate }) {
  const [newSkill, setNewSkill] = useState('')

  const handleAddSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onUpdate([...data, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (index) => {
    onUpdate(data.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const categories = {
    'Frontend': ['React', 'Vue', 'Angular', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
    'Backend': ['Node.js', 'Python', 'Java', 'C#', 'Ruby', 'PHP', 'Go', 'Rust'],
    'Databases': ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis', 'DynamoDB'],
    'Tools': ['Git', 'Docker', 'AWS', 'GitHub', 'VS Code', 'Figma', 'Jira']
  }

  const addQuickSkill = (skill) => {
    if (!data.includes(skill)) {
      onUpdate([...data, skill])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Skills</h2>
        <p className="text-gray-600">Add the skills that define your expertise</p>
      </div>

      {/* Add Skill Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g., React, Python, UI Design..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input-field flex-1"
        />
        <Button
          onClick={handleAddSkill}
          variant="primary"
          disabled={!newSkill.trim()}
        >
          Add
        </Button>
      </div>

      {/* Quick Add Categories */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Quick add popular skills:</p>
        <div className="space-y-3">
          {Object.entries(categories).map(([category, skills]) => (
            <div key={category}>
              <p className="text-xs font-semibold text-gray-600 mb-2">{category}</p>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => addQuickSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      data.includes(skill)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Skills */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">
          Your skills ({data.length})
        </p>
        {data.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                <span className="text-sm font-medium">{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="text-blue-600 hover:text-blue-800 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">No skills added yet</p>
        )}
      </div>

      {/* Progress */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Add at least 5-10 relevant skills to make your portfolio stand out!
        </p>
      </div>
    </div>
  )
}
