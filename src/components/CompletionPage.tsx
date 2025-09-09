import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TechBackground from '@/components/TechBackground';
import { Trophy, Star, Home, RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const CompletionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const finalScore = location.state?.finalScore || 0;
  const maxScore = 50;
  const percentage = (finalScore / maxScore) * 100;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect Score! Tech Master! 🏆";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Great Job! 🚀";
    return "Good Effort! Keep Learning! 💪";
  };

  const getPerformanceColor = () => {
    if (percentage === 100) return "neon-green";
    if (percentage >= 80) return "neon-cyan";
    if (percentage >= 60) return "neon-purple";
    return "neon-blue";
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <TechBackground />
      
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="h-4 w-4 text-neon-cyan opacity-70" />
            </div>
          ))}
        </div>
      )}
      
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Celebration Header */}
        <div className="mb-12">
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple opacity-20 animate-ping"></div>
            </div>
            <Trophy className={`h-24 w-24 mx-auto text-${getPerformanceColor()} drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]`} />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="neon-text">You Did It!</span>
          </h1>
          <p className="text-2xl md:text-3xl font-poppins font-light text-foreground/90 mb-4">
            {getPerformanceMessage()}
          </p>
        </div>

        {/* Score Display */}
        <div className="mb-12 bg-card/20 backdrop-blur-sm border border-card-border/30 rounded-xl p-8 hover:border-neon-cyan/30 transition-all duration-300">
          <h2 className="text-2xl font-orbitron font-bold mb-6 neon-text-purple">Final Score</h2>
          
          <div className="relative mb-8">
            <div className="text-6xl md:text-8xl font-orbitron font-black mb-4">
              <span className={`text-${getPerformanceColor()} drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]`}>
                {finalScore}
              </span>
              <span className="text-foreground/40">/{maxScore}</span>
            </div>
            
            {/* Circular Progress */}
            <div className="mx-auto w-32 h-32 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(var(--card-border))"
                  strokeWidth="8"
                  fill="none"
                  opacity="0.3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={`hsl(var(--${getPerformanceColor().replace('neon-', 'neon-')}))`}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                  className="transition-all duration-2000 ease-out"
                  style={{
                    filter: `drop-shadow(0 0 10px hsl(var(--${getPerformanceColor().replace('neon-', 'neon-')})))`
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-orbitron font-bold text-${getPerformanceColor()}`}>
                  {Math.round(percentage)}%
                </span>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-orbitron font-bold text-neon-green mb-1">3</div>
              <div className="text-sm text-foreground/70">Questions</div>
            </div>
            <div>
              <div className="text-2xl font-orbitron font-bold text-neon-cyan mb-1">
                {finalScore / 10}
              </div>
              <div className="text-sm text-foreground/70">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-orbitron font-bold text-neon-purple mb-1">100%</div>
              <div className="text-sm text-foreground/70">Effort</div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        {percentage === 100 && (
          <div className="mb-8 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Star className="h-6 w-6 text-yellow-400" />
              <span className="text-yellow-400 font-orbitron font-bold">PERFECT SCORE ACHIEVEMENT</span>
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
            <p className="text-foreground/80">You answered all questions correctly! Outstanding!</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="neonPurple" 
            size="lg"
            onClick={() => navigate('/quiz')}
            className="min-w-[200px]"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Play Again
          </Button>
          
          <Button 
            variant="neonGhost" 
            size="lg"
            onClick={() => navigate('/')}
            className="min-w-[200px]"
          >
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Button>
        </div>

        {/* Motivational Message */}
        <div className="mt-12 bg-card/10 backdrop-blur-sm border border-card-border/20 rounded-xl p-6">
          <p className="text-lg text-foreground/70 leading-relaxed">
            {percentage === 100 
              ? "Perfect! You've mastered these tech fundamentals. Ready for more challenges?"
              : percentage >= 80
              ? "Great work! You've got a solid foundation in tech knowledge."
              : percentage >= 60
              ? "Good progress! Keep learning and you'll master these concepts."
              : "Every expert was once a beginner. Keep practicing and you'll improve!"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletionPage;