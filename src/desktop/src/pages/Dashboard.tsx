import { useQuery } from '@tanstack/react-query'

const Dashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/api/dashboard/stats')
      return response.json()
    },
  })

  const widgets = [
    { label: 'Total Projects', value: stats?.totalProjects || 0 },
    { label: 'Active Sprints', value: stats?.activeSprints || 0 },
    { label: 'Open Issues', value: stats?.openIssues || 0 },
    { label: 'Team Members', value: stats?.teamMembers || 0 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here is your project overview.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {widgets.map((widget, index) => (
          <div key={index} className="glass p-6 rounded-xl">
            <h3 className="text-sm font-medium">{widget.label}</h3>
            <div className="text-2xl font-bold mt-2">{widget.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard