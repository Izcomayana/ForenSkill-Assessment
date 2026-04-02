"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Card } from "@/components/ui/card";
import { SpinnerCustom } from "@/components/ui/spinner";

type Recommendation = {
  topic: string;
  level: string;
  message: string;
  modules: string[];
};

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const docRef = doc(db, "results", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRecommendations(data.recommendations || []);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <SpinnerCustom />
    </div>
  );
}

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Your Learning Recommendations</h1>
        <p className="text-muted-foreground">
          Personalized suggestions based on your performance
        </p>
      </div>

      {/* No recommendations */}
      {recommendations.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-emerald-400 font-medium">
            🎉 Great job! You have no weak areas.
          </p>
          <p className="text-muted-foreground mt-2">
            Keep practicing to maintain your performance.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <Card key={index} className="p-6 space-y-4">

              {/* Topic + Level */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{rec.topic}</h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    rec.level === "Beginner"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {rec.level}
                </span>
              </div>

              {/* Message */}
              <p className="text-muted-foreground">
                {rec.message}
              </p>

              {/* Modules */}
              <div>
                <h3 className="font-medium mb-2">Recommended Modules:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {rec.modules.map((module, idx) => (
                    <li key={idx} className="text-sm">
                      {module}
                    </li>
                  ))}
                </ul>
              </div>

            </Card>
          ))}
        </div>
      )}
    </div>
  );
}