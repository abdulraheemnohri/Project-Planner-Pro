import { useState } from 'react'
import { Plus } from 'lucide-react'

const Projects = () => {
  const [projects] = useState([
    { id: 1, name: 'MyApp v2.0', key: 'MAP', status: 'active', progress: 72 },
    { id: 2, name: 'API Migration', key: 'API', status: 'planned', progress: 0 },
    { id: 3, name: 'UI Redesign', key: 'UIR', status: 'in_progress', progress: 45 },
  ])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your projects</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="glass p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.key}</p>
              </div>
              <span className="text-xs px-2 py-1 bg-muted rounded-full">
                {project.status}
              </span>
            </div>
            <div className="mt-4">
              <div className="text-sm text-muted-foreground mb-1">Progress</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: project.progress + '%' }} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {project.progress}% complete
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects