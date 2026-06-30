import React, { useState } from 'react'
import Button from '../common/Button'
import InputField from '../common/InputField'

// Step 3: Projects Form
export default function ProjectsForm({ data, onUpdate }) {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    link: '',
    image: null
  })
  const [errors, setErrors] = useState({})

  const addProject = () => {
    // Validation
    const newErrors = {}
    if (!newProject.title.trim()) newErrors.title = 'Project title is required'
    if (!newProject.description.trim()) newErrors.description = 'Project description is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (data.length >= 10) {
      setErrors({ add: 'Maximum 10 projects allowed' })
      return
    }

    onUpdate([
      ...data,
      {
        ...newProject,
        id: Date.now(),
        technologies: newProject.technologies.split(',').map(t => t.trim()).filter(t => t)
      }
    ])

    // Reset form
    setNewProject({
      title: '',
      description: '',
      technologies: '',
      link: '',
      image: null
    })
    setErrors({})
  }

  const removeProject = (id) => {
    onUpdate(data.filter(project => project.id !== id))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProject(prev => ({
          ...prev,
          image: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Projects</h2>
        <p className="text-gray-600">Showcase your best work ({data.length}/10)</p>
      </div>

      {/* Add New Project */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Project</h3>

        {/* Project Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
          <div className="flex items-center gap-4">
            {newProject.image ? (
              <img src={newProject.image} alt="Project" className="w-20 h-20 rounded object-cover" />
            ) : (
              <div className="w-20 h-20 rounded bg-gray-300 flex items-center justify-center text-gray-500">
                🖼️
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <InputField
          label="Project Title"
          placeholder="e.g., E-commerce Platform"
          value={newProject.title}
          onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
          error={errors.title}
          maxLength={100}
        />

        <InputField
          label="Description"
          type="textarea"
          placeholder="Describe what the project does and your role..."
          value={newProject.description}
          onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
          error={errors.description}
          rows={4}
          maxLength={500}
        />

        <InputField
          label="Technologies Used"
          placeholder="React, Node.js, MongoDB (comma-separated)"
          value={newProject.technologies}
          onChange={(e) => setNewProject(prev => ({ ...prev, technologies: e.target.value }))}
          maxLength={200}
        />

        <InputField
          label="Project Link (Optional)"
          type="url"
          placeholder="https://example.com"
          value={newProject.link}
          onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
        />

        <Button onClick={addProject} fullWidth className="mt-4">
          Add Project
        </Button>
        {errors.add && <p className="text-red-500 text-sm mt-2">{errors.add}</p>}
      </div>

      {/* Projects List */}
      {data.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Projects</h3>
          <div className="space-y-4">
            {data.map((project) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex gap-4">
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-20 h-20 rounded object-cover" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{project.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-2 block">
                        View Project →
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => removeProject(project.id)}
                    className="btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.length === 0 && (
        <div className="p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
          <p className="text-gray-500">No projects added yet. Add your first project to showcase your work! 🚀</p>
        </div>
      )}
    </div>
  )
}
