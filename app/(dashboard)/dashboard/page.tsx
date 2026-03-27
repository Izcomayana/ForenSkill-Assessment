'use client';

import { BarChart3, BookOpen, Trophy, Zap } from 'lucide-react';

const stats = [
  {
    label: 'Assessments Completed',
    value: '8',
    icon: BookOpen,
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    label: 'Average Score',
    value: '87%',
    icon: Trophy,
    color: 'from-green-500/20 to-green-600/20',
  },
  {
    label: 'Assessments Available',
    value: '24',
    icon: Zap,
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    label: 'Total Hours Spent',
    value: '42.5h',
    icon: BarChart3,
    color: 'from-orange-500/20 to-orange-600/20',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Welcome Back</h1>
        <p className="text-muted-foreground mt-2">
          Continue your forensics skill development journey
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="text-primary" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Recent Assessments
          </h2>
          <div className="space-y-3">
            {[
              { name: 'Memory Forensics Basics', score: '92%', date: '2 days ago' },
              { name: 'File System Analysis', score: '85%', date: '5 days ago' },
              { name: 'Network Forensics', score: '78%', date: '1 week ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-foreground font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <p className="text-sm font-bold text-primary">{item.score}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Start Assessment
            </button>
            <button className="w-full px-4 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors">
              View Results
            </button>
            <button className="w-full px-4 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




// export default function DashboardPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Dashboard</h1>
//       <p className="text-slate-400 mt-2">
//         Welcome to ForenSkill 👋
//       </p>
//     </div>
//   );
// }