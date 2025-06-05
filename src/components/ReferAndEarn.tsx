
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Share2, Copy, Gift, Users, Coins, Trophy, Star } from "lucide-react";

const ReferAndEarn = () => {
  const [referralCode] = useState("COLOR2024XYZ");
  const [friendCode, setFriendCode] = useState("");
  const [referralStats] = useState({
    totalRefers: 12,
    totalEarned: 2400,
    pendingRewards: 150,
    level: "Gold Referrer"
  });

  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleShareCode = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join ColorPlay!',
        text: `Join me on ColorPlay and use my referral code: ${referralCode} to get bonus rewards!`,
        url: window.location.origin
      });
    } else {
      handleCopyCode();
    }
  };

  const handleRedeemFriendCode = () => {
    if (!friendCode.trim()) {
      toast({
        title: "Enter Code",
        description: "Please enter a friend's referral code",
        variant: "destructive",
      });
      return;
    }

    // Simulate code redemption
    toast({
      title: "🎉 Code Redeemed!",
      description: "You've earned 100 bonus coins!",
    });
    setFriendCode("");
  };

  const rewardTiers = [
    { friends: 1, reward: 100, icon: "🎁", title: "First Friend" },
    { friends: 5, reward: 500, icon: "🏆", title: "Social Starter" },
    { friends: 10, reward: 1000, icon: "⭐", title: "Network Builder" },
    { friends: 25, reward: 2500, icon: "👑", title: "Influence Master" },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{referralStats.totalRefers}</div>
            <p className="text-sm text-gray-300">Total Referrals</p>
          </CardContent>
        </Card>
        <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
          <CardContent className="p-4 text-center">
            <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{referralStats.totalEarned}</div>
            <p className="text-sm text-gray-300">Total Earned</p>
          </CardContent>
        </Card>
        <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
          <CardContent className="p-4 text-center">
            <Gift className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{referralStats.pendingRewards}</div>
            <p className="text-sm text-gray-300">Pending Rewards</p>
          </CardContent>
        </Card>
        <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-lg font-bold">{referralStats.level}</div>
            <p className="text-sm text-gray-300">Status</p>
          </CardContent>
        </Card>
      </div>

      {/* Your Referral Code */}
      <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Your Referral Code
          </CardTitle>
          <CardDescription className="text-gray-300">
            Share this code with friends and earn rewards when they join!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-6">
              <div className="text-3xl font-bold tracking-wider text-green-400">
                {referralCode}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleCopyCode}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white flex items-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Code</span>
            </Button>
            <Button 
              onClick={handleShareCode}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Code</span>
            </Button>
          </div>

          <div className="text-center text-sm text-gray-400">
            Earn 200 coins for each friend who joins with your code!
          </div>
        </CardContent>
      </Card>

      {/* Redeem Friend's Code */}
      <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Have a Friend's Code?
          </CardTitle>
          <CardDescription className="text-gray-300">
            Enter a friend's referral code to get bonus rewards!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Enter friend's code"
              value={friendCode}
              onChange={(e) => setFriendCode(e.target.value.toUpperCase())}
              className="bg-black/20 border-white/20 text-white placeholder-gray-400"
            />
            <Button 
              onClick={handleRedeemFriendCode}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Redeem
            </Button>
          </div>
          <p className="text-sm text-gray-400">
            Get 100 bonus coins when you redeem a valid code!
          </p>
        </CardContent>
      </Card>

      {/* Reward Tiers */}
      <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Referral Milestones
          </CardTitle>
          <CardDescription className="text-gray-300">
            Unlock amazing rewards as you refer more friends!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewardTiers.map((tier, index) => {
              const isUnlocked = referralStats.totalRefers >= tier.friends;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                    isUnlocked 
                      ? "border-green-500 bg-green-500/10" 
                      : "border-gray-600 bg-gray-800/20"
                  }`}
                >
                  <div className="text-3xl mb-2">{tier.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{tier.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">{tier.friends} Friends</p>
                  <div className="flex items-center justify-center space-x-1">
                    <Coins className="w-4 h-4 text-yellow-400" />
                    <span className="font-bold text-yellow-400">{tier.reward}</span>
                  </div>
                  {isUnlocked && (
                    <Badge className="mt-2 bg-green-500 text-white">Unlocked!</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-xl">How Refer & Earn Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-bold">Share Your Code</h3>
              <p className="text-sm text-gray-300">Send your unique referral code to friends via social media or messaging apps.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-bold">Friends Join</h3>
              <p className="text-sm text-gray-300">Your friends sign up using your code and start playing ColorPlay.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-bold">Earn Rewards</h3>
              <p className="text-sm text-gray-300">Both you and your friend receive bonus coins and unlock special rewards!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferAndEarn;
