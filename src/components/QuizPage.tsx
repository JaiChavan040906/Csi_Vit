import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TechBackground from '@/components/TechBackground';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

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
    answer: "19.0207663, 72.8707628",
    hint: "Give the GPS coordinates"
  },
  {
    id: 2,
    question: `I am the heart of an institution,
A starting point for a life's pursuit.
I'm not a room,  but a place to build skills,your core department where knowledge takes root.
Where am I?`,
    answer: "19.0214852, 72.8717522",
    hint: "Give the GPS coordinate."
  },
  {
    id: 3,
    question: `I speak without a voice, a language of clicks and beeps.
My words are a sequence of long and short, a secret the night keeps.
I can signal for help, or tell of a friend,
And my silence is broken by a light at the end.

What am I?`,
    answer: "Unlocking the future with CSI where logic meets innovation and amazing events",
    hint: "Morse code audio, convert it to text",
    audioSrc: "/audio.wav"
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
    imageSrc: "/image.png"
  },
  {
    id: 5,
    question: `I shift but never move my feet,
I hide a message, bitter or sweet.
A letter's place is not its own,
Another's spot is where it's shown.
With a key that's born of a classic pair,
I'll show you secrets I hold in the air.

What am I?
QGW SJSBHG HSOA WG QFONM`,
    answer: "csi events team is crazy",
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
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
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
      setShowHint(false);

      setTimeout(() => {
        if (isLastQuestion) {
          navigate('/completion', { state: { finalScore: score + 10 } });
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
          setUserAnswer('');
          setShowFeedback(null);
          setShowHint(false);
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
                src={currentQuestion.imageSrc}
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

          {/* Hint Button */}
          {currentQuestion.hint && (
            <div className="mt-6 text-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 mx-auto"
              >
                <Lightbulb className="h-4 w-4" /> {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
              {showHint && (
                <p className="mt-4 text-sm text-muted-foreground italic">
                  💡 {currentQuestion.hint}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
