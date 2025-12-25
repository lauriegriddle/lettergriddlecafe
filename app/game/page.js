'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';

// =============================================================================
// PUZZLE DATA - Add more puzzles here for daily rotation
// Puzzles rotate at 7 AM EST daily
// =============================================================================

const PUZZLES = [
  {
    id: 'puzzle-1',
    subtitle: 'Prepare the Cafe',
    letters: ['S', 'K', 'A', 'N', 'E', 'C', 'P'],
    keyLetters: ['P', 'A'],
    totalWordCount: 64,
    words: {
      4: [
        'APES', 'APSE', 'ASPS',
        'CAPE', 'CAPS',
        'NAPE', 'NAPS', 'NEAP',
        'PACE', 'PACK', 'PANE', 'PANS', 'PAPA', 'PASS', 'PEAK', 'PEAS',
        'SNAP', 'SPAN', 'SPAS'
      ],
      5: [
        'APACE', 'APSES', 'ASPEN',
        'CAPES',
        'KAPPA',
        'NAPES', 'NEAPS',
        'PACES', 'PACKS', 'PAEAN', 'PANES', 'PAPAS', 'PASSE', 'PEAKS', 'PEACE', 'PECAN',
        'SNAPS', 'SPACE', 'SPAKE', 'SPANK', 'SPANS', 'SPEAK'
      ],
      6: [
        'CANAPE',
        'ESCAPE',
        'KAPPAS',
        'PAEANS', 'PASSES', 'PECANS',
        'SPACES', 'SPANKS', 'SPEAKS'
      ],
      7: ['CANAPES', 'ESCAPES', 'KNEECAP', 'PANACEA', 'PANCAKE'],
      8: ['KEEPSAKE', 'KNEECAPS', 'KNAPSACK', 'PANACEAS', 'PANCAKES', 'SEASCAPE'],
      9: ['KEEPSAKES', 'KNAPSACKS', 'SEASCAPES']
    }
  }
  // Add more puzzles here for rotation
];

// =============================================================================
// PUZZLE ROTATION - Get today's puzzle based on 7 AM EST
// =============================================================================

function getTodaysPuzzle() {
  const ANCHOR_DATE = new Date('2024-12-24T07:00:00-05:00');
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const hour = estTime.getHours();
  const puzzleDate = new Date(estTime);
  
  if (hour < 7) {
    puzzleDate.setDate(puzzleDate.getDate() - 1);
  }
  puzzleDate.setHours(7, 0, 0, 0);
  
  const daysSinceAnchor = Math.floor((puzzleDate - ANCHOR_DATE) / (1000 * 60 * 60 * 24));
  const puzzleIndex = Math.max(0, daysSinceAnchor) % PUZZLES.length;
  
  return PUZZLES[puzzleIndex];
}

function getTimeUntilNextPuzzle() {
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const nextPuzzle = new Date(estTime);
  nextPuzzle.setHours(7, 0, 0, 0);
  
  if (estTime.getHours() >= 7) {
    nextPuzzle.setDate(nextPuzzle.getDate() + 1);
  }
  
  const diff = nextPuzzle - estTime;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

// =============================================================================
// GAME CONSTANTS
// =============================================================================

const REWARDS = {
  4: { icon: '🎵', name: 'Music Notes' },
  5: { icon: '☕', name: 'Coffee Cups' },
  6: { icon: '🍯', name: 'Honey Pots' },
  7: { icon: '🧈', name: 'Butter Pats' },
  8: { icon: '🥞', name: 'Pancake Stacks' },
  9: { icon: '👑', name: 'Crown Jewels' }
};

const ACHIEVEMENTS = [
  { threshold: 100, title: 'Cafe Legend', icon: '👑', color: '#FFD700' },
  { threshold: 80, title: 'Cafe Aficionado', icon: '⭐', color: '#FFA500' },
  { threshold: 60, title: 'Cafe Connoisseur', icon: '🎩', color: '#CD853F' },
  { threshold: 40, title: 'Cafe Enthusiast', icon: '☕', color: '#8B4513' },
  { threshold: 20, title: 'Cafe Regular', icon: '🍵', color: '#A0522D' },
  { threshold: 0, title: 'Cafe Newbie', icon: '🌱', color: '#6B8E23' }
];

const ENCOURAGEMENTS = [
  "The griddle's heating up!",
  "Something smells delicious! 🥞",
  "You're on a roll! 🧈",
  "The cafe's coming alive! ✨",
  "Keep that momentum going! 🍯",
  "The morning rush awaits! 🌅",
  "You're a natural! 👨‍🍳",
  "The regulars would be proud!",
  "Flip it like you mean it! 🥞",
  "Pure breakfast magic! ✨"
];

const JUKEBOX_TRACKS = [
  { id: 1, name: 'Cafe Newbie', icon: '🌱', src: '/audio/Cafe Newbie.mp3' },
  { id: 2, name: 'Cafe Regular', icon: '🍵', src: '/audio/Cafe Regular.mp3' },
  { id: 3, name: 'Cafe Enthusiast', icon: '☕', src: '/audio/Cafe Enthusiast.mp3' },
  { id: 4, name: 'Cafe Connoisseur', icon: '🎩', src: '/audio/Cafe Connoisseur.mp3' },
  { id: 5, name: 'Cafe Aficionado', icon: '⭐', src: '/audio/Cafe Aficionado.mp3' },
  { id: 6, name: 'Cafe Legend', icon: '👑', src: '/audio/Cafe Legend.mp3' }
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function LetterGriddleCafeGame() {
  const [puzzleData] = useState(() => getTodaysPuzzle());
  const [timeUntilNext, setTimeUntilNext] = useState('');
  
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState(new Set());
  const [availableLetters, setAvailableLetters] = useState([...puzzleData.letters]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [highlightLength, setHighlightLength] = useState(null);
  const [wordsExpanded, setWordsExpanded] = useState(true);
  
  const [showJukebox, setShowJukebox] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [levelUpNotification, setLevelUpNotification] = useState(null);
  
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [previousAchievement, setPreviousAchievement] = useState(null);

  const totalWords = Object.values(puzzleData.words).flat().length;
  const foundCount = foundWords.size;
  const percentage = Math.round((foundCount / totalWords) * 100);
  const currentYear = new Date().getFullYear();

  const hasKeyLetters = (word) => {
    return puzzleData.keyLetters.every(letter => word.includes(letter));
  };

  const getCurrentAchievement = useCallback(() => {
    return ACHIEVEMENTS.find(a => percentage >= a.threshold) || ACHIEVEMENTS[ACHIEVEMENTS.length - 1];
  }, [percentage]);

  const getFoundByLength = (length) => {
    const wordsInCategory = puzzleData.words[length] || [];
    return wordsInCategory.filter(w => foundWords.has(w)).length;
  };

  const getTotalByLength = (length) => {
    return (puzzleData.words[length] || []).length;
  };

  const getWordLength = (word) => {
    if (word.length >= 9) return 9;
    if (word.length >= 8) return 8;
    return word.length;
  };

  // Update countdown timer
  useEffect(() => {
    const updateTimer = () => setTimeUntilNext(getTimeUntilNextPuzzle());
    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  // Load saved progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`letterGriddleCafeGame_${puzzleData.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.foundWords && Array.isArray(parsed.foundWords)) {
          setFoundWords(new Set(parsed.foundWords));
          const savedPercentage = Math.round((parsed.foundWords.length / totalWords) * 100);
          const savedAchievement = ACHIEVEMENTS.find(a => savedPercentage >= a.threshold);
          setPreviousAchievement(savedAchievement);
        }
        if (parsed.gameStarted) setGameStarted(true);
      }
      const jukeboxSaved = localStorage.getItem('letterGriddleCafeJukebox');
      if (jukeboxSaved) {
        const jukeboxParsed = JSON.parse(jukeboxSaved);
        if (jukeboxParsed.volume) setVolume(jukeboxParsed.volume);
        if (jukeboxParsed.currentTrack) setCurrentTrack(jukeboxParsed.currentTrack);
      }
    } catch (e) {
      console.error('Could not load saved progress', e);
    }
    setIsLoaded(true);
  }, [puzzleData.id, totalWords]);

  // Save progress
  useEffect(() => {
    if (isLoaded && foundWords.size > 0) {
      try {
        localStorage.setItem(`letterGriddleCafeGame_${puzzleData.id}`, JSON.stringify({
          foundWords: Array.from(foundWords),
          gameStarted: gameStarted,
          lastPlayed: new Date().toISOString()
        }));
      } catch (e) {
        console.error('Could not save progress', e);
      }
    }
  }, [foundWords, gameStarted, isLoaded, puzzleData.id]);

  // Save jukebox preferences
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('letterGriddleCafeJukebox', JSON.stringify({ volume, currentTrack }));
      } catch (e) {
        console.error('Could not save jukebox preferences', e);
      }
    }
  }, [volume, currentTrack, isLoaded]);

  // Load audio source when currentTrack changes (including on initial load from localStorage)
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      const track = JUKEBOX_TRACKS.find(t => t.name === currentTrack);
      if (track && audioRef.current.src !== window.location.origin + track.src) {
        audioRef.current.src = track.src;
        audioRef.current.load();
      }
    }
  }, [currentTrack]);

  // Audio handling - volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Audio handling - play/pause state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && currentTrack) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Level up detection
  useEffect(() => {
    if (isLoaded && previousAchievement) {
      const currentAch = getCurrentAchievement();
      if (currentAch.threshold > previousAchievement.threshold) {
        setLevelUpNotification(currentAch);
        setPreviousAchievement(currentAch);
        setTimeout(() => setLevelUpNotification(null), 4000);
      }
    } else if (isLoaded && !previousAchievement && foundWords.size > 0) {
      setPreviousAchievement(getCurrentAchievement());
    }
  }, [percentage, isLoaded, previousAchievement, getCurrentAchievement, foundWords.size]);

  const shuffleLetters = () => {
    setAvailableLetters(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  const addLetter = useCallback((letter) => {
    const upperLetter = letter.toUpperCase();
    if (puzzleData.letters.includes(upperLetter)) {
      setCurrentWord(prev => prev + upperLetter);
      setMessage('');
    }
  }, [puzzleData.letters]);

  const removeLetter = useCallback(() => {
    setCurrentWord(prev => prev.slice(0, -1));
    setMessage('');
  }, []);

  const clearWord = useCallback(() => {
    setCurrentWord('');
    setMessage('');
  }, []);

  const submitWord = useCallback(() => {
    if (currentWord.length < 4) {
      setMessage('Words must be at least 4 letters');
      setMessageType('error');
      setCurrentWord('');
      return;
    }

    if (!hasKeyLetters(currentWord)) {
      setMessage(`Must contain both ${puzzleData.keyLetters.join(' and ')}!`);
      setMessageType('error');
      setCurrentWord('');
      return;
    }

    if (foundWords.has(currentWord)) {
      setMessage('Already found!');
      setMessageType('error');
      setCurrentWord('');
      return;
    }

    const allWords = Object.values(puzzleData.words).flat();
    if (allWords.includes(currentWord)) {
      const newFoundWords = new Set(foundWords);
      newFoundWords.add(currentWord);
      setFoundWords(newFoundWords);
      
      const wordLength = currentWord.length >= 9 ? 9 : (currentWord.length >= 8 ? 8 : currentWord.length);
      const reward = REWARDS[wordLength];
      setMessage(`${reward.icon} +1 ${reward.name}!`);
      setMessageType('success');
      
      if (currentWord.length >= 9) {
        setTimeout(() => {
          setMessage('👑 INCREDIBLE! You found a 9-letter word!');
          setMessageType('encouragement');
        }, 1500);
      } else if (currentWord.length >= 8) {
        setTimeout(() => {
          setMessage('🥞 Amazing! 8-letter word found!');
          setMessageType('encouragement');
        }, 1500);
      } else if ((newFoundWords.size) % 5 === 0 && newFoundWords.size < totalWords) {
        setTimeout(() => {
          const encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
          setMessage(encouragement);
          setMessageType('encouragement');
        }, 1500);
      }
      
      if (newFoundWords.size === totalWords) {
        setTimeout(() => {
          setShowConfetti(true);
          setShowComplete(true);
        }, 1000);
      }
    } else {
      setMessage('Not in word list');
      setMessageType('error');
    }
    
    setCurrentWord('');
  }, [currentWord, foundWords, totalWords, puzzleData]);

  // Keyboard support
  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      
      if (e.key === 'Enter') {
        e.preventDefault();
        submitWord();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        removeLetter();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        clearWord();
      } else if (puzzleData.letters.includes(key)) {
        e.preventDefault();
        addLetter(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, addLetter, removeLetter, clearWord, submitWord, puzzleData.letters]);

  const togglePlayPause = () => {
    if (!currentTrack) {
      // No track selected - select first track and play
      const firstTrack = JUKEBOX_TRACKS[0];
      setCurrentTrack(firstTrack.name);
      if (audioRef.current) {
        audioRef.current.src = firstTrack.src;
        audioRef.current.load();
        audioRef.current.oncanplaythrough = () => {
          audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        };
      }
      setIsPlaying(true);
    } else if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const selectTrack = (trackName) => {
    const track = JUKEBOX_TRACKS.find(t => t.name === trackName);
    if (!track) return;
    
    if (currentTrack === trackName) {
      // Same track - toggle play/pause
      setIsPlaying(!isPlaying);
    } else {
      // Different track - switch and play
      setCurrentTrack(trackName);
      setIsPlaying(true);
      
      // Force reload and play the audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = track.src;
        audioRef.current.load();
        audioRef.current.oncanplaythrough = () => {
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
          }
        };
      }
    }
  };

  const currentHasP = currentWord.includes('P');
  const currentHasA = currentWord.includes('A');

  // =========================================================================
  // WELCOME SCREEN
  // =========================================================================
  if (!gameStarted) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #F5DEB3 0%, #DEB887 15%, #D2691E 40%, #CD853F 65%, #8B4513 100%)',
        fontFamily: "'Playfair Display', Georgia, serif"
      }}>
        <audio ref={audioRef} loop />
        
        <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'}}>
          <div style={{
            backgroundColor: 'rgba(255, 253, 245, 0.97)',
            border: '3px solid #8B4513',
            boxShadow: '0 20px 60px rgba(139, 69, 19, 0.4)',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '420px',
            width: '100%'
          }}>
            {/* Back to Cafe link */}
            <a href="/" style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#8B7355', textDecoration: 'none', marginBottom: '16px'}}>
              ← Back to Cafe
            </a>

            <div style={{textAlign: 'center', marginBottom: '16px'}}>
              <div style={{fontSize: '48px'}}>☕</div>
            </div>

            <h1 style={{fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#5D4E37'}}>
              Letter Griddle Cafe
            </h1>
            <p style={{textAlign: 'center', marginBottom: '24px', fontSize: '14px', padding: '8px 16px', borderRadius: '8px', color: '#5D4E37', backgroundColor: 'rgba(210, 105, 30, 0.15)'}}>
              {puzzleData.subtitle}
            </p>

            <button
              onClick={() => setGameStarted(true)}
              style={{
                background: 'linear-gradient(135deg, #DEB887 0%, #D2691E 50%, #8B4513 100%)',
                color: '#FFF8DC',
                border: '2px solid #5D4E37',
                borderRadius: '9999px',
                padding: '16px 24px',
                fontWeight: 'bold',
                fontSize: '18px',
                cursor: 'pointer',
                width: '100%',
                transition: 'transform 0.2s',
                marginBottom: '24px'
              }}
            >
              {foundWords.size > 0 ? 'Continue Playing' : "Cafe's Doors Are Open"}
            </button>

            {/* How to Play */}
            <div style={{padding: '20px', borderRadius: '16px', backgroundColor: 'rgba(210, 105, 30, 0.12)', border: '2px solid #CD853F', marginBottom: '16px'}}>
              <h2 style={{fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#5D4E37'}}>
                ☕ How to Play
              </h2>
              <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#5D4E37'}}>
                <li style={{marginBottom: '8px'}}>☕ Build words using the 7 letters (reuse allowed!)</li>
                <li style={{marginBottom: '8px'}}>⭐ <strong>Every word must contain BOTH {puzzleData.keyLetters.join(' and ')}</strong></li>
                <li style={{marginBottom: '8px'}}>☕ Words must be at least 4 letters</li>
                <li style={{marginBottom: '8px'}}>☕ Click letters or type on keyboard</li>
                <li style={{marginBottom: '8px'}}>☕ Press Enter to submit, Backspace to delete</li>
                <li>☕ Collect rewards: 🎵 ☕ 🍯 🧈 🥞 👑</li>
              </ul>
            </div>

            {/* Key Letters */}
            <div style={{padding: '16px', borderRadius: '16px', textAlign: 'center', background: 'linear-gradient(135deg, #5D4E37, #3D3229)', border: '2px solid #8B7355', marginBottom: '16px'}}>
              <p style={{fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: '#DEB887'}}>
                Key Letters Required
              </p>
              <div style={{display: 'flex', justifyContent: 'center', gap: '16px'}}>
                {puzzleData.keyLetters.map(letter => (
                  <span key={letter} style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(145deg, #FFD700, #FFA500)',
                    border: '3px solid #DAA520',
                    color: '#5D4E37'
                  }}>
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievement Levels */}
            <div style={{padding: '20px', borderRadius: '16px', backgroundColor: 'rgba(210, 105, 30, 0.12)', border: '2px solid #CD853F'}}>
              <h2 style={{fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#5D4E37'}}>
                🏆 Achievement Levels
              </h2>
              <div style={{fontSize: '14px'}}>
                {ACHIEVEMENTS.map(ach => (
                  <div key={ach.title} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', borderRadius: '8px', marginBottom: '4px', backgroundColor: percentage >= ach.threshold ? 'rgba(139, 69, 19, 0.2)' : 'transparent'}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#5D4E37'}}>
                      <span>{ach.icon}</span>
                      <span style={{fontWeight: percentage >= ach.threshold ? '600' : '400'}}>{ach.title}</span>
                    </span>
                    <span style={{color: '#8B7355'}}>{ach.threshold}%+</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timer */}
            <div style={{marginTop: '24px', textAlign: 'center', padding: '12px', borderRadius: '9999px', backgroundColor: 'rgba(210, 105, 30, 0.2)', color: '#5D4E37'}}>
              <span style={{fontSize: '14px', fontWeight: '500'}}>
                Next puzzle in: {timeUntilNext}
              </span>
            </div>
            
            {foundWords.size > 0 && (
              <div style={{marginTop: '12px', textAlign: 'center', fontSize: '12px', color: '#8B7355'}}>
                ✨ Your progress is saved ({foundWords.size} words found)
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer style={{textAlign: 'center', padding: '16px', fontSize: '12px', color: '#FFF8DC'}}>
          <p>Part of <a href="/" style={{color: '#FFF8DC', textDecoration: 'underline'}}>The Letter Griddle Cafe</a></p>
          <p style={{marginTop: '4px'}}>
            <a href="/privacy" style={{color: '#FFF8DC', textDecoration: 'underline'}}>Privacy</a>
            {' • '}
            <a href="/terms" style={{color: '#FFF8DC', textDecoration: 'underline'}}>Terms</a>
          </p>
          <p style={{marginTop: '4px'}}>© {currentYear} Letter Griddle Cafe</p>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // MAIN GAME SCREEN
  // =========================================================================
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #F5DEB3 0%, #DEB887 15%, #D2691E 40%, #CD853F 65%, #8B4513 100%)',
      fontFamily: "'Playfair Display', Georgia, serif"
    }}>
      <audio ref={audioRef} loop />
      
      {/* Level Up Notification */}
      {levelUpNotification && (
        <div style={{position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 50, animation: 'bounce 0.5s ease infinite'}}>
          <div style={{padding: '16px 24px', borderRadius: '16px', textAlign: 'center', backgroundColor: '#FFFDF5', border: '3px solid #FFD700', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'}}>
            <div style={{fontSize: '32px', marginBottom: '4px'}}>{levelUpNotification.icon}</div>
            <div style={{fontWeight: 'bold', fontSize: '18px', color: '#5D4E37'}}>Level Up!</div>
            <div style={{fontWeight: '600', color: levelUpNotification.color}}>{levelUpNotification.title}</div>
          </div>
        </div>
      )}

      {/* Confetti */}
      {showConfetti && (
        <div style={{position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50}}>
          {Array.from({ length: 60 }).map((_, i) => {
            const emojis = ['🥞', '☕', '🍯', '🧈', '👑', '⭐', '🎵'];
            return (
              <div key={i} style={{
                position: 'absolute',
                fontSize: '24px',
                left: `${Math.random() * 100}%`,
                top: '-50px',
                animation: `confettiFall ${3 + Math.random() * 2}s ease-in ${Math.random() * 2}s forwards`
              }}>
                {emojis[i % emojis.length]}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes confettiFall {
          to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>

      {/* Header */}
      <header style={{padding: '16px', background: 'linear-gradient(180deg, rgba(61, 50, 41, 0.95) 0%, rgba(61, 50, 41, 0.85) 60%, transparent 100%)'}}>
        <div style={{maxWidth: '640px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          {/* Left buttons */}
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <button
              onClick={() => setGameStarted(false)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(222, 184, 135, 0.3)',
                border: '2px solid rgba(222, 184, 135, 0.5)',
                color: '#FFF8DC',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}
              title="How to Play"
            >
              ?
            </button>
          </div>
          
          {/* Center title */}
          <div style={{textAlign: 'center', flex: 1, padding: '0 8px'}}>
            <h1 style={{fontSize: '20px', fontWeight: 'bold', color: '#FFF8DC'}}>Letter Griddle Cafe</h1>
            <p style={{fontSize: '12px', padding: '4px 12px', borderRadius: '9999px', display: 'inline-block', marginTop: '4px', color: '#FFF8DC', backgroundColor: 'rgba(139, 69, 19, 0.5)'}}>
              Every word needs {puzzleData.keyLetters.join(' + ')}
            </p>
          </div>
          
          {/* Right buttons */}
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <button
              onClick={() => setShowAchievements(true)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(222, 184, 135, 0.3)',
                border: '2px solid rgba(222, 184, 135, 0.5)',
                color: '#FFF8DC',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}
              title="Achievements"
            >
              🏆
            </button>
            <button
              onClick={() => setShowJukebox(true)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px',
                fontWeight: '600',
                background: isPlaying 
                  ? 'linear-gradient(135deg, #D2691E, #8B4513)' 
                  : 'linear-gradient(135deg, #5D4E37, #3D3229)',
                color: '#F5DEB3',
                border: '2px solid #CD853F',
                cursor: 'pointer',
                boxShadow: isPlaying ? '0 0 15px rgba(210, 105, 30, 0.5)' : 'none'
              }}
            >
              🎵 Jukebox
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main style={{flex: 1, maxWidth: '640px', margin: '0 auto', padding: '0 16px 24px', width: '100%'}}>
        
        {/* Progress Card */}
        <div style={{
          backgroundColor: 'rgba(255, 253, 245, 0.95)',
          border: '2px solid #8B4513',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '12px'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
            <button onClick={() => setShowAchievements(true)} style={{display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer'}}>
              <span style={{fontSize: '20px'}}>{getCurrentAchievement().icon}</span>
              <span style={{fontWeight: '600', fontSize: '14px', color: '#5D4E37'}}>{getCurrentAchievement().title}</span>
            </button>
            <div style={{textAlign: 'right'}}>
              <span style={{fontSize: '20px', fontWeight: 'bold', color: '#8B4513'}}>{foundCount}</span>
              <span style={{fontSize: '14px', color: '#8B7355'}}> / {totalWords}</span>
              <span style={{fontSize: '12px', marginLeft: '8px', padding: '2px 8px', borderRadius: '9999px', backgroundColor: 'rgba(139, 69, 19, 0.2)', color: '#5D4E37'}}>
                {percentage}%
              </span>
            </div>
          </div>
          
          <div style={{height: '12px', borderRadius: '9999px', overflow: 'hidden', backgroundColor: '#F5DEB3'}}>
            <div style={{height: '100%', borderRadius: '9999px', transition: 'width 0.5s', width: `${percentage}%`, background: 'linear-gradient(90deg, #DEB887, #D2691E, #8B4513)'}} />
          </div>
        </div>

        {/* Reward Grid */}
        <div style={{
          backgroundColor: 'rgba(255, 253, 245, 0.95)',
          border: '2px solid #8B4513',
          borderRadius: '16px',
          padding: '12px',
          marginBottom: '12px'
        }}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', textAlign: 'center'}}>
            {[4, 5, 6, 7, 8, 9].map(length => (
              <button
                key={length}
                onClick={() => setHighlightLength(prev => prev === length ? null : length)}
                style={{
                  padding: '6px',
                  borderRadius: '12px',
                  border: highlightLength === length ? '2px solid #8B4513' : '2px solid transparent',
                  cursor: 'pointer',
                  backgroundColor: getFoundByLength(length) === getTotalByLength(length) && getTotalByLength(length) > 0
                    ? 'rgba(139, 69, 19, 0.25)'
                    : highlightLength === length
                    ? 'rgba(210, 105, 30, 0.3)'
                    : 'rgba(210, 105, 30, 0.12)'
                }}
              >
                <div style={{fontSize: '16px', marginBottom: '2px'}}>{REWARDS[length].icon}</div>
                <div style={{fontSize: '12px', fontWeight: '500', color: '#5D4E37'}}>{length === 9 ? '9+' : length}</div>
                <div style={{fontSize: '12px', fontWeight: 'bold', color: '#8B4513'}}>{getFoundByLength(length)}/{getTotalByLength(length)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Found Words */}
        {foundWords.size > 0 && (
          <div style={{
            backgroundColor: 'rgba(255, 253, 245, 0.95)',
            border: '2px solid #8B4513',
            borderRadius: '16px',
            marginBottom: '12px',
            overflow: 'hidden'
          }}>
            <button 
              onClick={() => setWordsExpanded(!wordsExpanded)}
              style={{width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(210, 105, 30, 0.1)', border: 'none', cursor: 'pointer'}}
            >
              <span style={{fontWeight: '600', fontSize: '14px', color: '#5D4E37'}}>Words Found ({foundWords.size})</span>
              <span style={{color: '#5D4E37'}}>{wordsExpanded ? '▲' : '▼'}</span>
            </button>
            
            {wordsExpanded && (
              <div style={{padding: '12px'}}>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
                  {Array.from(foundWords).sort().map(word => {
                    const wordLen = getWordLength(word);
                    const isHighlighted = highlightLength === null || highlightLength === wordLen;
                    return (
                      <span key={word} style={{
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: '600',
                        opacity: isHighlighted ? 1 : 0.3,
                        backgroundColor: isHighlighted ? '#F5DEB3' : '#FFF8DC',
                        color: '#3D3229',
                        border: highlightLength === wordLen ? '2px solid #8B4513' : '1px solid #CD853F'
                      }}>
                        {word}
                      </span>
                    );
                  })}
                </div>
                {highlightLength && (
                  <p style={{fontSize: '12px', textAlign: 'center', marginTop: '8px', color: '#5D4E37'}}>
                    Showing {highlightLength}-letter words • <button onClick={() => setHighlightLength(null)} style={{textDecoration: 'underline', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', color: '#5D4E37'}}>Show all</button>
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Current Word Display */}
        <div style={{
          backgroundColor: 'rgba(255, 253, 245, 0.95)',
          border: '2px solid #8B4513',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '12px'
        }}>
          <div style={{display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '12px'}}>
            <div style={{
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s',
              transform: currentHasP ? 'scale(1.1)' : 'scale(1)',
              opacity: currentHasP ? 1 : 0.5,
              backgroundColor: currentHasP ? '#90EE90' : '#F5DEB3',
              color: currentHasP ? '#228B22' : '#8B7355'
            }}>
              <span>P</span>
              {currentHasP && <span>✓</span>}
            </div>
            <div style={{
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s',
              transform: currentHasA ? 'scale(1.1)' : 'scale(1)',
              opacity: currentHasA ? 1 : 0.5,
              backgroundColor: currentHasA ? '#90EE90' : '#F5DEB3',
              color: currentHasA ? '#228B22' : '#8B7355'
            }}>
              <span>A</span>
              {currentHasA && <span>✓</span>}
            </div>
          </div>

          <div style={{
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            marginBottom: '12px',
            padding: '12px',
            backgroundColor: '#FFFDF5',
            border: '2px dashed #CD853F'
          }}>
            <span style={{fontSize: '28px', fontWeight: 'bold', letterSpacing: '4px', color: currentWord ? '#5D4E37' : '#CD853F'}}>
              {currentWord || 'type or click...'}
            </span>
          </div>
          
          <div style={{height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {message && (
              <div style={{
                textAlign: 'center',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '14px',
                backgroundColor: messageType === 'success' ? '#dcfce7' : messageType === 'encouragement' ? '#fef3c7' : '#fee2e2',
                color: messageType === 'success' ? '#166534' : messageType === 'encouragement' ? '#92400e' : '#991b1b'
              }}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Letter Griddle */}
        <div style={{
          backgroundColor: '#5D4E37',
          border: '3px solid #3D3229',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px'}}>
            <span style={{fontSize: '20px'}}>🍳</span>
            <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#F5DEB3'}}>Letter Griddle</h3>
            <span style={{fontSize: '20px'}}>🍳</span>
          </div>
          
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '20px'}}>
            {availableLetters.map((letter, idx) => {
              const isKeyLetter = puzzleData.keyLetters.includes(letter);
              return (
                <button
                  key={idx}
                  onClick={() => addLetter(letter)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isKeyLetter 
                      ? 'linear-gradient(145deg, #FFD700, #FFA500)'
                      : 'linear-gradient(145deg, #FFF8DC, #F5DEB3)',
                    border: isKeyLetter 
                      ? '4px solid #DAA520'
                      : '4px solid #D2691E',
                    color: '#5D4E37'
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
          
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', paddingTop: '16px', borderTop: '2px solid #8B7355'}}>
            <button onClick={clearWord} style={{backgroundColor: '#8B7355', color: '#F5DEB3', borderRadius: '9999px', padding: '8px 16px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', border: 'none'}}>Clear</button>
            <button onClick={removeLetter} style={{backgroundColor: '#8B7355', color: '#F5DEB3', borderRadius: '9999px', padding: '8px 16px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', border: 'none'}}>← Delete</button>
            <button onClick={shuffleLetters} style={{backgroundColor: '#8B7355', color: '#F5DEB3', borderRadius: '9999px', padding: '8px 16px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', border: 'none'}}>🔀 Shuffle</button>
            <button onClick={submitWord} style={{background: 'linear-gradient(135deg, #DEB887, #D2691E)', color: '#FFF8DC', border: '2px solid #CD853F', borderRadius: '9999px', padding: '8px 24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer'}}>Enter</button>
          </div>
        </div>

        <div style={{marginTop: '16px', textAlign: 'center', padding: '8px', borderRadius: '9999px', backgroundColor: 'rgba(255, 253, 245, 0.3)', color: '#FFF8DC'}}>
          <span style={{fontSize: '14px'}}>☕ Open 24 hours • Progress saves automatically</span>
        </div>
      </main>

      {/* Achievements Modal */}
      {showAchievements && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px'}} onClick={() => setShowAchievements(false)}>
          <div style={{backgroundColor: '#FFFDF5', border: '3px solid #8B4513', borderRadius: '24px', padding: '24px', maxWidth: '380px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative'}} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowAchievements(false)} style={{position: 'absolute', top: '16px', right: '16px', padding: '4px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: '#8B7355', fontSize: '20px'}}>✕</button>
            
            <div style={{textAlign: 'center', marginBottom: '16px'}}>
              <div style={{fontSize: '40px', marginBottom: '8px'}}>🏆</div>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#5D4E37'}}>Achievement Levels</h2>
              <p style={{fontSize: '14px', marginTop: '4px', color: '#8B7355'}}>You're at {percentage}% - {getCurrentAchievement().title}</p>
            </div>
            
            <div>
              {ACHIEVEMENTS.map(ach => {
                const isAchieved = percentage >= ach.threshold;
                const isCurrent = getCurrentAchievement().title === ach.title;
                return (
                  <div key={ach.title} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', marginBottom: '8px', border: isCurrent ? '2px solid #D2691E' : '2px solid transparent', backgroundColor: isAchieved ? 'rgba(139, 69, 19, 0.2)' : 'rgba(210, 105, 30, 0.08)', opacity: isAchieved ? 1 : 0.6}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <span style={{fontSize: '24px'}}>{ach.icon}</span>
                      <span style={{fontWeight: isAchieved ? '600' : '400', color: '#5D4E37'}}>{ach.title}</span>
                    </span>
                    <span style={{fontSize: '14px', fontWeight: '500', color: isAchieved ? ach.color : '#8B7355'}}>{ach.threshold}%</span>
                  </div>
                );
              })}
            </div>
            
            <div style={{marginTop: '16px', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(210, 105, 30, 0.15)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: '#5D4E37'}}>
                <span>Progress</span>
                <span style={{fontWeight: 'bold'}}>{foundCount} / {totalWords} words</span>
              </div>
              <div style={{height: '8px', borderRadius: '9999px', overflow: 'hidden', backgroundColor: '#F5DEB3'}}>
                <div style={{height: '100%', borderRadius: '9999px', width: `${percentage}%`, background: 'linear-gradient(90deg, #DEB887, #D2691E, #8B4513)'}} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jukebox Modal */}
      {showJukebox && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px'}} onClick={() => setShowJukebox(false)}>
          <div style={{backgroundColor: '#FFFDF5', border: '3px solid #8B4513', borderRadius: '24px', padding: '20px', maxWidth: '340px', width: '100%', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.5)'}} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowJukebox(false)} style={{position: 'absolute', top: '12px', right: '12px', padding: '4px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: '#8B7355', fontSize: '18px'}}>✕</button>
            
            <div style={{textAlign: 'center', marginBottom: '12px'}}>
              <div style={{fontSize: '28px', marginBottom: '4px'}}>🎵</div>
              <h2 style={{fontSize: '20px', fontWeight: 'bold', color: '#5D4E37'}}>Jukebox</h2>
            </div>
            
            <div style={{borderRadius: '12px', padding: '12px', marginBottom: '12px', background: 'linear-gradient(135deg, #5D4E37, #3D3229)', color: '#F5DEB3'}}>
              <p style={{fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8}}>Now Playing</p>
              <p style={{fontWeight: '600', fontSize: '16px'}}>{currentTrack || 'Select a track'}</p>
              
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '8px'}}>
                <button onClick={togglePlayPause} style={{width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #D2691E, #8B4513)', border: '2px solid #CD853F', cursor: 'pointer', fontSize: '16px', color: '#FFF8DC'}}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>
              
              <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px'}}>
                <span style={{fontSize: '14px'}}>🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  style={{flex: 1, height: '6px', borderRadius: '9999px', cursor: 'pointer', accentColor: '#D2691E'}}
                />
              </div>
            </div>
            
            <p style={{fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', color: '#8B7355'}}>Playlist</p>
            <div>
              {JUKEBOX_TRACKS.map(track => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(track.name)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: currentTrack === track.name ? '#F5DEB3' : 'rgba(210, 105, 30, 0.15)',
                    color: '#5D4E37',
                    border: currentTrack === track.name ? '2px solid #8B4513' : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <span style={{fontSize: '16px'}}>{track.icon}</span>
                  <span style={{fontWeight: '500', flex: 1}}>{track.name}</span>
                  {currentTrack === track.name && isPlaying && <span style={{fontSize: '10px', color: '#8B4513'}}>♪</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {showComplete && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40, padding: '16px'}} onClick={() => setShowComplete(false)}>
          <div style={{backgroundColor: '#FFFDF5', border: '4px solid #8B4513', borderRadius: '24px', padding: '32px', maxWidth: '400px', width: '100%', textAlign: 'center'}} onClick={e => e.stopPropagation()}>
            <div style={{fontSize: '64px', marginBottom: '16px'}}>👑</div>
            <h2 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#5D4E37'}}>Cafe Legend!</h2>
            <p style={{fontSize: '18px', marginBottom: '8px', color: '#8B7355'}}>You found all {totalWords} words!</p>
            <p style={{fontSize: '14px', marginBottom: '16px', fontStyle: 'italic', color: '#8B4513'}}>Your legend will be told at the Letter Griddle Cafe for generations.</p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '28px', marginBottom: '16px'}}>
              🎵 ☕ 🍯 🧈 🥞 👑
            </div>
            <p style={{fontWeight: '500', color: '#5D4E37'}}>The morning rush is ready to begin!</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{textAlign: 'center', padding: '16px', fontSize: '12px', color: '#FFF8DC'}}>
        <p>Part of <a href="/" style={{color: '#FFF8DC', textDecoration: 'underline'}}>The Letter Griddle Cafe</a></p>
        <p style={{marginTop: '4px'}}>
          <a href="/privacy" style={{color: '#FFF8DC', textDecoration: 'underline'}}>Privacy</a>
          {' • '}
          <a href="/terms" style={{color: '#FFF8DC', textDecoration: 'underline'}}>Terms</a>
        </p>
        <p style={{marginTop: '4px'}}>© {currentYear} Letter Griddle Cafe</p>
      </footer>
    </div>
  );
}