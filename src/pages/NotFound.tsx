import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import TechBackground from "@/components/TechBackground";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <TechBackground />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Error Icon */}
        <div className="mb-8">
          <AlertTriangle className="h-24 w-24 mx-auto text-neon-purple drop-shadow-[0_0_20px_rgba(147,51,234,0.6)] mb-6" />
        </div>

        {/* Error Message */}
        <div className="mb-12 space-y-6">
          <h1 className="text-6xl md:text-8xl font-orbitron font-black mb-4">
            <span className="neon-text">404</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-poppins font-light text-foreground/90 mb-6">
            Page Not Found
          </h2>
          <p className="text-lg text-foreground/70 max-w-lg mx-auto leading-relaxed">
            Oops! The page you're looking for seems to have vanished into cyberspace. 
            Let's get you back to the main mission.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="neon" 
            size="lg"
            onClick={() => window.location.href = '/'}
            className="min-w-[200px]"
          >
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Button>
          
          <Button 
            variant="neonGhost" 
            size="lg"
            onClick={() => window.history.back()}
            className="min-w-[200px]"
          >
            Go Back
          </Button>
        </div>

        {/* Route Info for Debugging */}
        <div className="mt-12 bg-card/10 backdrop-blur-sm border border-card-border/20 rounded-xl p-6">
          <p className="text-sm text-foreground/50 font-mono">
            Attempted Route: <span className="text-neon-cyan">{location.pathname}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
