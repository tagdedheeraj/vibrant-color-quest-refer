
import { Home, Gamepad2, Brain, Gift, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomBar = ({ activeTab, onTabChange }: BottomBarProps) => {
  const navItems = [
    {
      id: "predict",
      label: "Home",
      icon: Home,
      color: "text-pink-500"
    },
    {
      id: "predict",
      label: "Predict",
      icon: Gamepad2,
      color: "text-purple-500"
    },
    {
      id: "quiz",
      label: "Quiz",
      icon: Brain,
      color: "text-blue-500"
    },
    {
      id: "refer",
      label: "Refer",
      icon: Gift,
      color: "text-green-500"
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/20 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-white/20 transform scale-105" 
                  : "hover:bg-white/10"
              )}
            >
              <Icon 
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? item.color : "text-white/70"
                )} 
              />
              <span 
                className={cn(
                  "text-xs font-medium transition-colors",
                  isActive ? "text-white" : "text-white/70"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomBar;
