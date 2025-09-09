import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TechBackground from '@/components/TechBackground';
import { Brain, Trophy, Home, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  answer: string;
  hint?: string;
  audioSrc?: string;
  imageSrc?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: `I am a hub of games and good times.
Next to the court where shuttlecocks soar,
and just beyond the doors of VSIT, I wait.
Inside, virtual heroes come to life on the PS5,
while miniature battles unfold on a checkered board,
and paddles send a small white ball flying.`,
    answer: "DEN",
    hint: "Think of a fun indoor spot near VSIT with games and PS5."
  },
  {
    id: 2,
    question: `I am a heaven for a quick bite and a fresh start.
I sit by Gate 2, a popular stop.
Here, you can rest in my seating area,
with the FE department and the canteen just a short walk away.
What am I?`,
    answer: "NESCAFE",
    hint: "A coffee and snack corner at Gate 2."
  },
  {
    id: 3,
    question: `The words I speak are from another time,
A backward whisper, a scrambled rhyme.
To find the truth, you must rewind the clock,
Unwind the sound, from ending to the start.`,
    answer: "Unlocking the future with CSI, where logic meets innovation and amazing events",
    hint: "Reverse the audio to hear the actual words.",
    audioSrc: "/audio.mp3" // placeholder path
  },
  {
    id: 4,
    question: `The Ghost in the Frame (Riddle)
At first glance, it looks like a totally normal picture, maybe a random scenery, or just some filler image. Nothing suspicious to the eye, then comes clue from riddle:

I’m just a face you scroll and pass,  
Yet shadows hide within the glass.  
Peek beneath my frame of art,  
Metadata will play its part.
For decoding : https://stylesuxx.github.io/steganography/`,
    answer: "ghost_in_metadata",
    hint: "Check metadata hidden inside the image.",
    imageSrc: "/image.png" // placeholder path
  },
  {
    id: 5,
    question: `43 75 72 69 6F 73 69 74 79 20 75 6E 6C 6F 63 6B 73 20 74 68 65 20 68 69 64 64 65 6E 20 74 72 75 74 68

"Not all secrets are in 0s and 1s. Some are hidden in base 16. Listen to the whispers of hex and reveal the truth!"`,
    answer: "flag{Curiosity unlocks the hidden truth}",
    hint: "Convert the hex string to text."
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
      setShowFeedback('incorrect');
      setAttempts(prev => prev + 1);
      setIsShaking(true);
      
      setTimeout(() => {
        setIsShaking(false);
        setShowFeedback(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <TechBackground />
      
      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Question Card */}
        <div className="bg-card/20 backdrop-blur-sm border border-card-border/30 rounded-xl p-8 mb-8 hover:border-neon-cyan/30 transition-all duration-300">
          <h2 className="text-xl md:text-2xl font-poppins font-semibold mb-6 text-center leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Audio placeholder for Q3 */}
          {currentQuestion.audioSrc && (
            <div className="mb-6 flex justify-center">
              <audio controls className="w-full">
                <source src={currentQuestion.audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Image placeholder for Q4 */}
          {currentQuestion.imageSrc && (
            <div className="mb-6 flex justify-center">
              <img 
                src="image.png" 
                alt="Question related clue" 
                className="rounded-lg border border-card-border/30 max-h-64 object-contain"
              />
            </div>
          )}

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
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
