import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TechBackground from '@/components/TechBackground';
import { Progress } from '@/components/ui/progress';
import { Brain, Trophy, Home, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  answer: string;
  hint?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
    hint: "It's the standard markup language for creating web pages"
  },
  {
    id: 2,
    question: "What is the extension for JavaScript files?",
    answer: ".js",
    hint: "Think about the file ending when you save JavaScript code"
  },
  {
    id: 3,
    question: "Which tag is used to link CSS in HTML?",
    answer: "link",
    hint: "It's used in the <head> section to connect external stylesheets"
  }
];

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userAnswer.trim()) return;

    const normalizedAnswer = userAnswer.trim().toLowerCase();
    const correctAnswer = currentQuestion.answer.toLowerCase();
    
    if (normalizedAnswer === correctAnswer) {
      // Correct answer
      setShowFeedback('correct');
      setScore(prev => prev + 10);
      setAttempts(0);
      
      setTimeout(() => {
        if (isLastQuestion) {
          navigate('/completion', { state: { finalScore: score + 10 } });
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
          setUserAnswer('');
          setShowFeedback(null);
        }
      }, 1500);
    } else {
      // Incorrect answer
      setShowFeedback('incorrect');
      setAttempts(prev => prev + 1);
      setIsShaking(true);
      
      setTimeout(() => {
        setIsShaking(false);
        setShowFeedback(null);
      }, 2000);
    }
  };

  const motivationalMessages = [
    "Great Job! 🚀",
    "Nice Work, Keep Going! ⭐",
    "Excellent! You're on fire! 🔥",
    "Outstanding! Tech Master! 💻",
    "Perfect! Keep the momentum! ⚡"
  ];

  const getRandomMotivationalMessage = () => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <TechBackground />
      
      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="neonGhost" 
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-card/20 backdrop-blur-sm border border-card-border/30 rounded-lg px-4 py-2">
                <Trophy className="h-5 w-5 text-neon-green" />
                <span className="font-orbitron font-bold text-neon-green score-pulse">
                  {score}
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-orbitron font-black mb-4">
            <span className="neon-text">Tech</span>{' '}
            <span className="neon-text-purple">Challenge</span>
          </h1>
          
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Brain className="h-6 w-6 text-neon-cyan" />
            <span className="text-lg text-foreground/70">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-foreground/60 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-card/20 rounded-full h-3 border border-card-border/30">
              <div 
                className="progress-neon h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card/20 backdrop-blur-sm border border-card-border/30 rounded-xl p-8 mb-8 hover:border-neon-cyan/30 transition-all duration-300">
          <h2 className="text-xl md:text-2xl font-poppins font-semibold mb-6 text-center leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Answer Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className={`w-full text-lg p-4 bg-input border-2 border-input-border text-foreground rounded-lg transition-all duration-300 focus:border-neon-cyan focus:shadow-glow-cyan ${
                  isShaking ? 'input-shake border-error' : ''
                } ${showFeedback === 'correct' ? 'input-success' : ''}`}
                disabled={showFeedback === 'correct'}
              />
              
              {showFeedback === 'correct' && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-neon-green" />
              )}
              
              {showFeedback === 'incorrect' && (
                <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-error" />
              )}
            </div>

            <Button 
              type="submit" 
              variant="neon" 
              size="lg"
              className="w-full text-lg py-4"
              disabled={!userAnswer.trim() || showFeedback === 'correct'}
            >
              {showFeedback === 'correct' ? 'Correct!' : 'Submit Answer'}
            </Button>
          </form>

          {/* Feedback Messages */}
          {showFeedback === 'incorrect' && (
            <div className="mt-6 text-center">
              <div className="bg-error/10 border border-error/30 rounded-lg p-4">
                <p className="text-error font-semibold mb-2">Try Again!</p>
                <p className="text-foreground/70 text-sm">
                  {attempts >= 2 && currentQuestion.hint && (
                    <>💡 Hint: {currentQuestion.hint}</>
                  )}
                </p>
              </div>
            </div>
          )}

          {showFeedback === 'correct' && (
            <div className="mt-6 text-center">
              <div className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-4">
                <p className="text-neon-green font-bold text-lg mb-2">
                  {getRandomMotivationalMessage()}
                </p>
                <p className="text-foreground/70">+10 points earned!</p>
              </div>
            </div>
          )}
        </div>

        {/* Question Navigation */}
        <div className="flex justify-center space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index < currentQuestionIndex 
                  ? 'bg-neon-green shadow-glow-green' 
                  : index === currentQuestionIndex 
                  ? 'bg-neon-cyan shadow-glow-cyan animate-pulse' 
                  : 'bg-card-border/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;