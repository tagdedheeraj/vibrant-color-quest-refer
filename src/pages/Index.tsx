
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Gift, Brain, Trophy, Coins } from "lucide-react";
import ColorPrediction from "@/components/ColorPrediction";
import Quiz from "@/components/Quiz";
import ReferAndEarn from "@/components/ReferAndEarn";
import BottomBar from "@/components/BottomBar";

const Index = () => {
  const [activeTab, setActiveTab] = useState("predict");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pb-20">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">ColorPlay</h1>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-1">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="font-semibold">1,250</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4 text-orange-400" />
                <span className="font-semibold">Level 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Ultimate Color Challenge
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Predict colors, earn rewards, and test your knowledge in the most exciting color game!
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-black/30 backdrop-blur-sm border border-white/10">
            <TabsTrigger 
              value="predict" 
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Predict
            </TabsTrigger>
            <TabsTrigger 
              value="quiz"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              <Brain className="w-4 h-4 mr-2" />
              Quiz
            </TabsTrigger>
            <TabsTrigger 
              value="refer"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              <Gift className="w-4 h-4 mr-2" />
              Refer & Earn
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="predict" className="space-y-6">
              <ColorPrediction />
            </TabsContent>

            <TabsContent value="quiz" className="space-y-6">
              <Quiz />
            </TabsContent>

            <TabsContent value="refer" className="space-y-6">
              <ReferAndEarn />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
