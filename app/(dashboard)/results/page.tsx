"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ResultData = {
  score: number;
  correct: number;
  total: number;
  topicScores: Record<string, number>;
  recommendations: string[];
};

export default function ResultsPage() {
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const docRef = doc(db, "results", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data() as ResultData);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading results...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center space-y-4">
        <p>No results found.</p>
        <Button onClick={() => router.push("/dashboard/assessment")}>
          Take Assessment
        </Button>
      </div>
    );
  }

  const { score, correct, total, topicScores, recommendations } = data;

  const weakAreas = Object.entries(topicScores).filter(
    ([_, value]) => value < 50
  );
  
  const timeSpent = Math.round(Math.random() * 20 + 10); // Mock time

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Your Results</h1>
        <p className="text-muted-foreground">
          Performance analysis and recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-muted/50 text-center space-y-2">
          <div className="flex items-center justify-center">
            <div className="relative w-20 h-20">
              <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeDasharray={`${(score / 100) * 565.48} 565.48`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5b7aff" />
                    <stop offset="100%" stopColor="#00d4ff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-foreground">{score}%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-muted/50 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Correct Answers</p>
          <p className="text-3xl font-bold text-foreground">{correct}/{total}</p>
        </div>
        <div className="p-4 rounded-lg bg-muted/50 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Time Spent</p>
          <p className="text-3xl font-bold text-foreground">{timeSpent} min</p>
        </div>
      </div>
      
      {/* Topic Breakdown */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Topic Breakdown</h2>

        <div className="space-y-4">
          {Object.entries(topicScores).map(([topic, value]) => (
            <div key={topic}>
              <div className="flex justify-between text-sm mb-1">
                <span>{topic}</span>
                <span>{value}%</span>
              </div>
              <Progress value={value} />
            </div>
          ))}
        </div>
      </Card>

      {/* Weak Areas */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Weak Areas</h2>

        {weakAreas.length === 0 ? (
          <p className="text-green-400">
            No weak areas 🎉 Great job!
          </p>
        ) : (
          <ul className="list-disc pl-5 space-y-2 text-red-400">
            {weakAreas.map(([topic]) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* Recommendations */}
      <div className="items-center justify-between flex flex-col gap-4 md:flex">
        <p className="text-muted-foreground">
          {recommendations.length === 0
            ? "No recommendations needed"
            : `${recommendations.length} recommendation(s) available`}
        </p>

        <Button onClick={() => router.push("/recommendations")}>
          View Recommendations
        </Button>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={() => router.push("/assessment")}>
          Retake Assessment
        </Button>
      </div>
    </div>
  );
}