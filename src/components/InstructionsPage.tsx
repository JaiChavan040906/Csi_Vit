import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TechBackground from '@/components/TechBackground';
import { Lightbulb, Target, Trophy, ArrowRight, CheckCircle } from 'lucide-react';

const InstructionsPage = () => {
  const navigate = useNavigate();

  const instructions = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Text-Answer Based",
      description: "Type your answers directly into the input field. No multiple choice here!",
      color: "neon-cyan"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Try Until Success",
      description: "Wrong answers show 'Try Again!' Keep trying until you get it right!",
      color: "neon-purple"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Progress Tracking",
      description: "Your score increases by +10 for each correct answer. Watch the progress bar fill!",
      color: "neon-green"
    }
  ];

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <TechBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="neon-text">Game</span>{' '}
            <span className="neon-text-purple">Instructions</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Master these simple rules and dominate the tech quiz challenge!
          </p>
        </div>

        {/* Instructions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {instructions.map((instruction, index) => (
            <div 
              key={index} 
              className="bg-card/20 backdrop-blur-sm border border-card-border/30 rounded-xl p-8 hover:border-neon-cyan/50 transition-all duration-300 transform hover:scale-105 group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${instruction.color}/10 border-2 border-${instruction.color}/30 mb-6 group-hover:border-${instruction.color}/60 transition-all duration-300`}>
                <div className={`text-${instruction.color}`}>
                  {instruction.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-orbitron font-bold mb-4 text-foreground">
                {instruction.title}
              </h3>
              
              <p className="text-foreground/70 leading-relaxed">
                {instruction.description}
              </p>
            </div>
          ))}
        </div>

        {/* Game Flow */}
        <div className="mb-12 bg-card/10 backdrop-blur-sm border border-card-border/20 rounded-xl p-8">
          <h2 className="text-2xl font-orbitron font-bold mb-6 neon-text">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-neon-cyan text-background flex items-center justify-center font-bold">1</div>
              <span className="text-foreground/80">Read Question</span>
            </div>
            <ArrowRight className="h-5 w-5 text-neon-cyan/50 rotate-90 md:rotate-0" />
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-neon-purple text-background flex items-center justify-center font-bold">2</div>
              <span className="text-foreground/80">Type Answer</span>
            </div>
            <ArrowRight className="h-5 w-5 text-neon-cyan/50 rotate-90 md:rotate-0" />
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-neon-green text-background flex items-center justify-center font-bold">3</div>
              <span className="text-foreground/80">Get +10 Points</span>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mb-12 text-left max-w-2xl mx-auto">
          <h3 className="text-xl font-orbitron font-bold mb-4 text-center neon-text-purple">Pro Tips</h3>
          <div className="space-y-3">
            {[
              "Case doesn't matter - 'HTML' and 'html' are both correct",
              "Watch for exact spelling - every character counts",
              "Take your time - there's no time limit",
              "Learn from mistakes - each wrong answer is a learning opportunity"
            ].map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-neon-green mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Game Button */}
        <div className="flex justify-center">
          <Button 
            variant="neonPurple" 
            size="lg"
            onClick={() => navigate('/quiz')}
            className="relative overflow-hidden group px-10 py-4 text-xl min-w-[250px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Trophy className="mr-3 h-6 w-6" />
            Start Game
          </Button>
        </div>

        {/* Back to Home */}
        <div className="mt-8">
          <Button 
            variant="neonGhost" 
            size="default"
            onClick={() => navigate('/')}
            className="text-sm"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;