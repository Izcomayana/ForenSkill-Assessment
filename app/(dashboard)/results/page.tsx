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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Your Results</h1>
        <p className="text-muted-foreground">
          Performance analysis and recommendations
        </p>
      </div>

      {/* Score Card */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Overall Score</h2>

        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">
            {correct} / {total} correct
          </p>
          <p className="text-2xl font-bold text-primary">
            {score}%
          </p>
        </div>

        <Progress value={score} className="h-3" />
      </Card>

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
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Recommendations</h2>

        {recommendations.length === 0 ? (
          <p className="text-emerald-400">
            You're doing great! No recommendations needed.
          </p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={() => router.push("/assessment")}>
          Retake Assessment
        </Button>
      </div>
    </div>
  );
}