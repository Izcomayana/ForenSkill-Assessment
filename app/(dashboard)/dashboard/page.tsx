'use client';

import { auth, db } from '@/lib/firebase';
import { collection, getDocs, doc, } from 'firebase/firestore';
import { BarChart3, BookOpen, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function DashboardPage() {
const [stats, setStats] = useState({
  attempts: 0,
  avgScore: 0,
  bestScore: 0,
  weakestTopic: '—',
});

const statSummary = [
  {
    label: 'Assessments Completed',
    value: stats.attempts,
    icon: BookOpen,
  },
  {
    label: 'Average Score',
    value: `${stats.avgScore}%`,
    icon: Trophy,
  },
  {
    label: 'Best Score',
    value: `${stats.bestScore}%`,
    icon: Zap,
  },
  {
    label: 'Weakest Area',
    value: stats.weakestTopic,
    icon: BarChart3,
  },
];


  useEffect(() => {
  const fetchStats = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const snapshot = await getDocs(
      collection(db, "users", user.uid, "results")
    );

const results = snapshot.docs.map(doc => doc.data());

const totalAttempts = results.length;

const avgScore =
  results.length > 0
    ? results.reduce((acc, r) => acc + (r.score || 0), 0) / results.length
    : 0;

// ✅ Best score
const bestScore =
  results.length > 0
    ? Math.max(...results.map(r => r.score || 0))
    : 0;

// ✅ Weakest topic
const topicTotals: Record<string, number[]> = {};

results.forEach((r) => {
  if (!r.topicScores) return;

  Object.entries(r.topicScores).forEach(([topic, score]) => {
    if (!topicTotals[topic]) topicTotals[topic] = [];
    topicTotals[topic].push(score as number);
  });
});

let weakestTopic = '—';

if (Object.keys(topicTotals).length > 0) {
  const avgTopics = Object.entries(topicTotals).map(([topic, scores]) => {
    const avg =
      scores.reduce((a, b) => a + b, 0) / scores.length;
    return { topic, avg };
  });

  weakestTopic = avgTopics.sort((a, b) => a.avg - b.avg)[0].topic;
}

setStats({
  attempts: totalAttempts,
  avgScore: Math.round(avgScore),
  bestScore,
  weakestTopic,
});
  };

  fetchStats();
}, []);

  return (
    <div className="min-h-screen bg-background space-y-8">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-secondary/20 to-accent/20 border border-secondary/40 rounded-xl p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent">Welcome Back</h1>
        <p className="text-muted-foreground mt-2 font-medium">
          Continue your forensics skill development journey
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statSummary.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 rounded-xl border border-secondary/40 bg-gradient-to-br from-card to-background backdrop-blur-sm hover:border-secondary/70 hover:shadow-xl hover:shadow-secondary/20 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold mt-2 tracking-tight bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-secondary/30 to-accent/30 group-hover:from-secondary/50 group-hover:to-accent/50 transition-all duration-300">
                  <Icon className="text-secondary group-hover:text-accent transition-colors duration-300" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-xl border border-secondary/40 bg-gradient-to-br from-card to-background backdrop-blur-sm">
          <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent mb-4">
            Recent Assessments
          </h2>
          <div className="space-y-3">
            {[
              { name: 'Memory Forensics Basics', score: '92%', date: '2 days ago' },
              { name: 'File System Analysis', score: '85%', date: '5 days ago' },
              { name: 'Network Forensics', score: '78%', date: '1 week ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 border border-secondary/20 group cursor-pointer">
                <div>
                  <p className="text-foreground font-medium group-hover:text-secondary transition-colors duration-300">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <p className="text-sm font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">{item.score}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl border border-secondary/40 bg-gradient-to-br from-card to-background backdrop-blur-sm">
          <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/assessment"
              className="block w-full px-4 py-3 bg-gradient-to-r from-secondary to-accent text-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 text-center border border-secondary/50 hover:border-secondary/80 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative">Start Assessment</span>
            </Link>

            <Link
              href="/results"
              className="block w-full px-4 py-3 bg-gradient-to-r from-secondary to-accent text-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 text-center border border-secondary/50 hover:border-secondary/80 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative">View Results</span>
            </Link>

            <Link
              href="/recommendations"
              className="block w-full px-4 py-3 bg-gradient-to-r from-secondary to-accent text-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 text-center border border-secondary/50 hover:border-secondary/80 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative">Recommendations</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}