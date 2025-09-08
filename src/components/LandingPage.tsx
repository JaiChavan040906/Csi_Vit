import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TechBackground from '@/components/TechBackground';
import { Play, Sparkles } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <TechBackground />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* CSI VIT Logo */}
        <div className="mb-8 animate-fade-in">
          <img 
            src="/lovable-uploads/1719f7dc-70d8-4604-ad72-6ba30ad56ba6.png" 
            alt="CSI VIT Logo" 
            className="mx-auto h-32 w-auto mb-6 drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          />
        </div>

        {/* Welcome Message */}
        <div className="mb-12 space-y-6">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4">
            <span className="neon-text">Welcome</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-poppins font-light text-foreground/90 mb-6">
            First-Year Students to{' '}
            <span className="neon-text-purple font-semibold">CSI VIT!</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Ready to test your tech knowledge? Dive into our gamified quiz experience 
            and discover what you know about the world of programming!
          </p>
        </div>

        {/* Get Started Button */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            variant="neon" 
            size="lg"
            onClick={() => navigate('/instructions')}
            className="relative overflow-hidden group px-8 py-4 text-lg min-w-[200px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Play className="mr-2 h-5 w-5" />
            Get Started
          </Button>
          
          <div className="flex items-center space-x-2 text-neon-cyan/60">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-poppins">Gamified Experience</span>
          </div>
        </div>

        {/* Stats Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="bg-card/10 backdrop-blur-sm border border-card-border/20 rounded-xl p-6 hover:border-neon-cyan/30 transition-all duration-300">
            <div className="text-3xl font-orbitron font-bold neon-text mb-2">3</div>
            <div className="text-sm text-foreground/70">Tech Questions</div>
          </div>
          <div className="bg-card/10 backdrop-blur-sm border border-card-border/20 rounded-xl p-6 hover:border-neon-purple/30 transition-all duration-300">
            <div className="text-3xl font-orbitron font-bold neon-text-purple mb-2">30</div>
            <div className="text-sm text-foreground/70">Max Score</div>
          </div>
          <div className="bg-card/10 backdrop-blur-sm border border-card-border/20 rounded-xl p-6 hover:border-neon-green/30 transition-all duration-300">
            <div className="text-3xl font-orbitron font-bold text-neon-green mb-2">∞</div>
            <div className="text-sm text-foreground/70">Learning</div>
          </div>
        </div>
      </div>

      {/* Floating Action Hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2 text-neon-cyan/50">
          <div className="w-6 h-10 border-2 border-neon-cyan/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-neon-cyan/50 rounded-full mt-2 animate-ping"></div>
          </div>
          <span className="text-xs font-poppins">Scroll to explore</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;