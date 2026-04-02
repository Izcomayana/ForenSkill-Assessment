'use client';

import { useEffect, useState } from 'react';
import { questions } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function AssessmentPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const selectedAnswer = answers[currentQuestion.id];
  const isAnswered = selectedAnswer !== undefined;

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid);
    }
  });

  return () => unsubscribe();
}, []);

  const calculateTopicScores = () => {
    const topicStats: Record<string, { correct: number; total: number }> = {};

    questions.forEach((q) => {
      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { correct: 0, total: 0 };
      }

      topicStats[q.topic].total++;

      if (answers[q.id] === q.correctAnswer) {
        topicStats[q.topic].correct++;
      }
    });

    const result: Record<string, number> = {};

    Object.keys(topicStats).forEach((topic) => {
      const { correct, total } = topicStats[topic];
      result[topic] = Math.round((correct / total) * 100);
    });

    return result;
  };

  const generateRecommendations = (topicScores: Record<string, number>) => {
  const recommendations: {
    topic: string;
    level: string;
    message: string;
    modules: string[];
  }[] = [];

  const moduleMap: Record<string, string[]> = {
    "Digital Evidence": [
      "Introduction to Digital Evidence",
      "Types of Digital Evidence",
      "Evidence Integrity and Hashing",
    ],
    "Chain of Custody": [
      "Evidence Handling and Documentation",
      "Maintaining Chain of Custody Records",
      "Legal Importance of Chain of Custody",
    ],
    "Forensic Tools": [
      "Introduction to Autopsy",
      "Using FTK Imager",
      "Disk Imaging and Analysis",
    ],
    "Legal Issues": [
      "Legal and Ethical Requirements in Digital Investigations",
      "Admissibility of Digital Evidence",
      "Privacy and Cyber Laws",
    ],
  };

  Object.entries(topicScores).forEach(([topic, score]) => {
    if (score < 50) {
      recommendations.push({
        topic,
        level: "Beginner",
        message: `You need significant improvement in ${topic}.`,
        modules: moduleMap[topic],
      });
    } else if (score < 70) {
      recommendations.push({
        topic,
        level: "Intermediate",
        message: `You have basic understanding of ${topic}, but improvement is needed.`,
        modules: moduleMap[topic].slice(0, 2),
      });
    }
  });

  return recommendations;
};
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const { correct, total } = calculateScore();
      const percentage = Math.round((correct / total) * 100);

      const topicScores = calculateTopicScores();
      const recommendations = generateRecommendations(topicScores);

      // 🔥 Save to Firebase
      if (userId) {
        await setDoc(doc(db, "results", userId), {
          score: percentage,
          correct,
          total,
          topicScores,
          recommendations,
          createdAt: new Date(),
        });
      }

      // Show modal instead of results
      setShowModal(true);

    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  const handleSelect = (optionIndex: number) => {
    if (!isSubmitted) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: optionIndex,
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    return { correct: correctCount, total: questions.length };
  };

  return (
    <>
      <div className="min-h-screen bg-background p-4 md:p-8 overflow-x-hidden">
        <div className="max-w-3xl mx-auto w-full">
          {/* Header Section */}
          <div className="space-y-6 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Digital Forensics Assessment
              </h1>
              <p className="text-muted-foreground text-sm ">
                Test your knowledge of forensic principles and practices
              </p>
            </div>

            {/* Progress Info */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-2">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <div className="text-sm font-medium text-primary ml-4 whitespace-nowrap">
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>

          {/* Question Card */}
          <Card className="border-border bg-card mb-8">
            <div className="p-6 md:p-8 space-y-8">
              {/* Question Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-tight flex-1">
                    {currentQuestion.question}
                  </h2>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  Select the best answer
                </p>
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctAnswer;
                  let className =
                    'relative flex items-start gap-4 p-4 rounded-lg text-left break-words border-2 cursor-pointer transition-all duration-200 hover:border-primary/50 hover:bg-secondary/50';

                  if (isSelected && !isSubmitted) {
                    className +=
                      ' border-primary bg-primary/10 ring-2 ring-primary/30';
                  } else if (isSubmitted && isSelected) {
                    if (isCorrect) {
                      className +=
                        ' border-emerald-400 bg-emerald-400/10 ring-2 ring-emerald-400/30';
                    } else {
                      className +=
                        ' border-red-400 bg-red-400/10 ring-2 ring-red-400/30';
                    }
                  } else if (isSubmitted && isCorrect) {
                    className +=
                      ' border-emerald-400 bg-emerald-400/10 ring-2 ring-emerald-400/30';
                  } else {
                    className += ' border-border bg-secondary';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      disabled={isSubmitted}
                      className={className}
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mt-0.5">
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-current" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-foreground font-medium">{option}</p>
                        {isSubmitted && isSelected && !isCorrect && (
                          <p className="text-xs text-red-400 mt-1">
                            This is incorrect
                          </p>
                        )}
                        {isSubmitted && isCorrect && (
                          <p className="text-xs text-emerald-400 mt-1">
                            {isSelected ? 'Your answer - Correct!' : 'The correct answer'}
                          </p>
                        )}
                      </div>
                      {isSubmitted && (
                        <div className="flex-shrink-0">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-red-400" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Navigation Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Button
              variant="outline"
              size="lg"
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex gap-2 overflow-x-auto max-w-full">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${idx === currentQuestionIndex
                    ? 'bg-primary w-8'
                    : answers[questions[idx].id] !== undefined
                      ? 'bg-primary/50'
                      : 'bg-border'
                    }`}
                  title={`Question ${idx + 1}`}
                />
              ))}
            </div>

            {currentQuestionIndex === questions.length - 1 ? (
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
                className="gap-2"
              >
                Submit Assessment
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={nextQuestion}
                className="gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Answering Status */}
          {!isSubmitted && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {Object.keys(answers).length} of {questions.length} questions answered
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md text-center space-y-4">

            <h2 className="text-xl font-semibold text-foreground">
              Assessment Submitted 🎉
            </h2>

            <p className="text-muted-foreground">
              Your results have been saved successfully.
              You can view them on the results page.
            </p>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setAnswers({});
                  setShowModal(false);
                }}
              >
                Retake
              </Button>

              <Button
                className="flex-1"
                onClick={() => {
                  router.push("/results");
                }}
              >
                View Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </>

  );
}
