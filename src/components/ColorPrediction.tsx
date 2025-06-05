
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Zap, Star, Target } from "lucide-react";

const colors = [
  { name: "Red", value: "#ef4444", class: "bg-red-500" },
  { name: "Blue", value: "#3b82f6", class: "bg-blue-500" },
  { name: "Green", value: "#10b981", class: "bg-green-500" },
  { name: "Purple", value: "#8b5cf6", class: "bg-purple-500" },
  { name: "Orange", value: "#f97316", class: "bg-orange-500" },
  { name: "Pink", value: "#ec4899", class: "bg-pink-500" },
];

const ColorPrediction = () => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentColor, setCurrentColor] = useState<string>("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [round, setRound] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      handleTimeUp();
    }
  }, [timeLeft, isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(10);
    setCurrentColor(colors[Math.floor(Math.random() * colors.length)].name);
  };

  const handleTimeUp = () => {
    setIsPlaying(false);
    setStreak(0);
    toast({
      title: "Time's Up!",
      description: "You ran out of time. Try again!",
      variant: "destructive",
    });
    setRound(round + 1);
  };

  const handlePrediction = () => {
    if (!selectedColor) {
      toast({
        title: "Select a Color",
        description: "Please choose a color before predicting!",
        variant: "destructive",
      });
      return;
    }

    const nextColor = colors[Math.floor(Math.random() * colors.length)].name;
    const isCorrect = selectedColor === nextColor;
    
    if (isCorrect) {
      setScore(score + 10 + (streak * 2));
      setStreak(streak + 1);
      toast({
        title: "🎉 Correct!",
        description: `You predicted ${nextColor}! +${10 + (streak * 2)} points`,
      });
    } else {
      setStreak(0);
      toast({
        title: "❌ Wrong",
        description: `The color was ${nextColor}. Try again!`,
        variant: "destructive",
      });
    }

    setCurrentColor(nextColor);
    setSelectedColor("");
    setTimeLeft(10);
    setRound(round + 1);
  };

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-bold">{score}</span>
            </div>
            <p className="text-sm text-gray-300">Score</p>
          </CardContent>
        </Card>
        <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className="text-2xl font-bold">{streak}</span>
            </div>
            <p className="text-sm text-gray-300">Streak</p>
          </CardContent>
        </Card>
        <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-2xl font-bold">{round}</span>
            </div>
            <p className="text-sm text-gray-300">Round</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Game Area */}
      <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Color Prediction Challenge
          </CardTitle>
          <CardDescription className="text-gray-300">
            Predict the next color and build your streak!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isPlaying ? (
            <div className="text-center space-y-4">
              <Button 
                onClick={startGame}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 text-lg"
              >
                Start Game
              </Button>
            </div>
          ) : (
            <>
              {/* Timer */}
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-yellow-400">{timeLeft}s</div>
                <Progress value={(timeLeft / 10) * 100} className="w-full max-w-md mx-auto" />
              </div>

              {/* Current Color Display */}
              {currentColor && (
                <div className="text-center space-y-2">
                  <p className="text-lg text-gray-300">Current Color:</p>
                  <div className="flex items-center justify-center space-x-3">
                    <div 
                      className={`w-16 h-16 rounded-full border-4 border-white shadow-lg ${colors.find(c => c.name === currentColor)?.class}`}
                    />
                    <Badge variant="outline" className="text-lg px-4 py-2 bg-white/10 text-white border-white/20">
                      {currentColor}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Color Selection */}
              <div className="space-y-4">
                <p className="text-center text-lg text-gray-300">Predict the next color:</p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                        selectedColor === color.name 
                          ? "border-white shadow-lg scale-105" 
                          : "border-white/30 hover:border-white/60"
                      }`}
                    >
                      <div className={`w-full h-12 rounded ${color.class} mb-2`} />
                      <p className="text-sm font-medium text-white">{color.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Predict Button */}
              <div className="text-center">
                <Button 
                  onClick={handlePrediction}
                  disabled={!selectedColor}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-lg disabled:opacity-50"
                >
                  Make Prediction
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPrediction;
