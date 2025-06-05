
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Brain, CheckCircle, XCircle, Award } from "lucide-react";

const quizQuestions = [
  {
    id: 1,
    question: "What are the primary colors?",
    options: ["Red, Blue, Yellow", "Red, Green, Blue", "Blue, Yellow, Purple", "Red, Orange, Yellow"],
    correct: 0,
    explanation: "The primary colors are Red, Blue, and Yellow - they cannot be created by mixing other colors."
  },
  {
    id: 2,
    question: "Which color has the longest wavelength?",
    options: ["Blue", "Green", "Red", "Purple"],
    correct: 2,
    explanation: "Red light has the longest wavelength in the visible spectrum, around 700 nanometers."
  },
  {
    id: 3,
    question: "What do you get when you mix red and blue?",
    options: ["Green", "Purple", "Orange", "Yellow"],
    correct: 1,
    explanation: "Mixing red and blue creates purple, a secondary color."
  },
  {
    id: 4,
    question: "Which color is considered the hottest?",
    options: ["Red", "Orange", "Blue", "Yellow"],
    correct: 2,
    explanation: "Blue is associated with the hottest temperatures in flames and stars."
  },
  {
    id: 5,
    question: "What is the complementary color of red?",
    options: ["Blue", "Yellow", "Green", "Purple"],
    correct: 2,
    explanation: "Green is the complementary color of red - they are opposite on the color wheel."
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Select an Answer",
        description: "Please choose an option before submitting!",
        variant: "destructive",
      });
      return;
    }

    setAnswered(true);
    setShowExplanation(true);

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 20);
      toast({
        title: "🎉 Correct!",
        description: "+20 points earned!",
      });
    } else {
      toast({
        title: "❌ Incorrect",
        description: "Better luck next time!",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      toast({
        title: "Quiz Completed!",
        description: `Final Score: ${score + (selectedAnswer === quizQuestions[currentQuestion].correct ? 20 : 0)}/${quizQuestions.length * 20}`,
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion) / quizQuestions.length) * 100;

  if (quizCompleted) {
    const finalScore = score;
    const percentage = (finalScore / (quizQuestions.length * 20)) * 100;
    
    return (
      <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Quiz Completed!
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            Congratulations on finishing the color knowledge quiz!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-4">
            <div className="text-6xl font-bold text-yellow-400">{finalScore}</div>
            <p className="text-xl text-gray-300">out of {quizQuestions.length * 20} points</p>
            <div className="text-2xl font-semibold">
              {percentage >= 80 ? "🏆 Excellent!" : 
               percentage >= 60 ? "🎉 Good Job!" : 
               percentage >= 40 ? "👍 Not Bad!" : "📚 Keep Learning!"}
            </div>
          </div>
          
          <Button 
            onClick={resetQuiz}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg"
          >
            Take Quiz Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Progress */}
      <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm text-gray-300">{currentQuestion + 1} of {quizQuestions.length}</span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Score */}
      <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Brain className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold">{score}</span>
            <span className="text-gray-300">points</span>
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Question {currentQuestion + 1}
          </CardTitle>
          <CardDescription className="text-lg text-white font-medium">
            {question.question}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:scale-[1.02]";
              
              if (answered) {
                if (index === question.correct) {
                  buttonClass += " border-green-500 bg-green-500/20 text-green-300";
                } else if (index === selectedAnswer && index !== question.correct) {
                  buttonClass += " border-red-500 bg-red-500/20 text-red-300";
                } else {
                  buttonClass += " border-gray-600 bg-gray-800/50 text-gray-400";
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += " border-blue-500 bg-blue-500/20 text-blue-300";
                } else {
                  buttonClass += " border-white/30 hover:border-white/60 text-white";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={answered}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {answered && index === question.correct && <CheckCircle className="w-5 h-5" />}
                    {answered && index === selectedAnswer && index !== question.correct && <XCircle className="w-5 h-5" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 font-medium mb-1">Explanation:</p>
              <p className="text-gray-300">{question.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center pt-4">
            {!answered ? (
              <Button 
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg disabled:opacity-50"
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-lg"
              >
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
