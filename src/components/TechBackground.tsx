import { useEffect } from 'react';

const TechBackground = () => {
  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const particlesContainer = document.querySelector('.particles');
      if (!particlesContainer) return;

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        
        // Random neon colors
        const colors = [
          'hsl(180 100% 50%)', // cyan
          'hsl(270 100% 70%)', // purple
          'hsl(120 100% 50%)', // green
          'hsl(240 100% 60%)', // blue
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 6px ${randomColor}`;
        
        particlesContainer.appendChild(particle);
      }
    };

    const timer = setTimeout(createParticles, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="tech-bg">
      <div className="circuit-pattern"></div>
      <div className="particles"></div>
      
      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-neon-cyan/20 rounded-lg animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 border border-neon-purple/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-neon-green/20 rotate-45 animate-bounce" style={{ animationDuration: '3s' }}></div>
      </div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-neon-cyan rounded-full opacity-20 animate-ping"></div>
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-neon-purple rounded-full opacity-30 animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-neon-green rounded-full opacity-25 animate-ping" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default TechBackground;