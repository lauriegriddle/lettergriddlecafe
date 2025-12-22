"use client";
import React, { useState, useEffect } from 'react';

export default function JukeboxGame() {
  // Puzzle Data
  const puzzles = [
    {
      category: "Compound Chaos",
      words: ["LIGHT", "HOUSE", "WORK", "OUT"],
      hints: ["The opposite of dark", "A place where people live", "What you do at a job", "The opposite of in"]
    },
    {
      category: "Animal Kingdom",
      words: ["CAT", "FISH", "TANK", "TOP"],
      hints: ["A furry feline pet", "Creature with gills and fins", "A large container or military vehicle", "The highest point"]
    },
    {
      category: "Weather Report",
      words: ["SUN", "FLOWER", "POWER", "HOUSE"],
      hints: ["The star at the center of our solar system", "The colorful part of a plant", "Strength or energy", "A place where people live"]
    },
    {
      category: "Color Wheel",
      words: ["BLUE", "BERRY", "PIE", "CHART"],
      hints: ["The color of the sky", "A small round fruit", "A baked dessert with filling", "A visual diagram of data"]
    },
    {
      category: "Time Warp",
      words: ["DAY", "DREAM", "CATCHER", "MITT"],
      hints: ["24 hours", "What happens when you sleep", "Someone who catches things", "A glove for baseball"]
    },
    {
      category: "Sweet Treats",
      words: ["FROZEN", "YOGURT", "SHOP", "TALK"],
      hints: ["Turned to ice", "A cultured dairy product", "A store", "To speak with someone"]
    },
    {
      category: "Action Heroes",
      words: ["DIE", "HARD", "ROCK", "BOTTOM"],
      hints: ["To cease living", "Not soft", "A stone or music genre", "The lowest part"]
    }
  ];

  // Game state
  const [currentView, setCurrentView] = useState('menu');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(-1);
  const [guesses, setGuesses] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [completedWords, setCompletedWords] = useState([false, false, false, false]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [hintsRevealed, setHintsRevealed] = useState([false, false, false, false]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Stats state
  const [stats, setStats] = useState({
    totalPlays: 0,
    tracksCompleted: 0,
    lastPlayed: null
  });
  const [completedPuzzles, setCompletedPuzzles] = useState([]);

  // Load stats from localStorage on mount
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem('jukeboxStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
      const savedCompleted = localStorage.getItem('jukeboxCompleted');
      if (savedCompleted) {
        setCompletedPuzzles(JSON.parse(savedCompleted));
      }
    } catch (e) {
      console.error('Error loading stats:', e);
    }
  }, []);

  // Save stats to localStorage
  const saveStats = (newStats) => {
    try {
      localStorage.setItem('jukeboxStats', JSON.stringify(newStats));
    } catch (e) {
      console.error('Error saving stats:', e);
    }
  };

  const saveCompletedPuzzles = (completed) => {
    try {
      localStorage.setItem('jukeboxCompleted', JSON.stringify(completed));
    } catch (e) {
      console.error('Error saving completed puzzles:', e);
    }
  };

  // Get current puzzle
  const currentPuzzle = currentPuzzleIndex >= 0 ? puzzles[currentPuzzleIndex] : null;

  // Start a puzzle
  const startPuzzle = (index) => {
    const puzzle = puzzles[index];
    setCurrentPuzzleIndex(index);

    // Initialize guesses with first letter revealed
    const newGuesses = puzzle.words.map((word) => {
      const arr = Array(word.length).fill('');
      arr[0] = word[0];
      return arr;
    });
    setGuesses(newGuesses);

    // Get all letters except first letters
    const letters = [];
    puzzle.words.forEach((word) => {
      for (let i = 1; i < word.length; i++) {
        letters.push(word[i]);
      }
    });
    letters.sort();
    setAvailableLetters(letters);

    setCompletedWords([false, false, false, false]);
    setHintsRevealed([false, false, false, false]);
    setCurrentWordIndex(0);
    setCurrentView('game');

    // Track play
    const newStats = {
      ...stats,
      totalPlays: stats.totalPlays + 1,
      lastPlayed: new Date().toISOString()
    };
    setStats(newStats);
    saveStats(newStats);
  };

  // Handle keyboard input
  useEffect(() => {
    if (currentView !== 'game') return;

    const handleKeyPress = (e) => {
      if (completedWords[currentWordIndex]) return;

      const key = e.key.toUpperCase();

      if (key === 'BACKSPACE') {
        e.preventDefault();
        const newGuesses = [...guesses];
        const newAvailable = [...availableLetters];
        for (let i = newGuesses[currentWordIndex].length - 1; i >= 1; i--) {
          if (newGuesses[currentWordIndex][i] !== '') {
            const letter = newGuesses[currentWordIndex][i];
            newGuesses[currentWordIndex][i] = '';
            newAvailable.push(letter);
            newAvailable.sort();
            setGuesses(newGuesses);
            setAvailableLetters(newAvailable);
            break;
          }
        }
      } else if (key === 'ENTER') {
        e.preventDefault();
        checkWord();
      } else if (/^[A-Z]$/.test(key)) {
        const letterIdx = availableLetters.indexOf(key);
        if (letterIdx !== -1) {
          for (let i = 1; i < guesses[currentWordIndex].length; i++) {
            if (guesses[currentWordIndex][i] === '') {
              const newGuesses = [...guesses];
              newGuesses[currentWordIndex][i] = key;
              const newAvailable = [...availableLetters];
              newAvailable.splice(letterIdx, 1);
              setGuesses(newGuesses);
              setAvailableLetters(newAvailable);
              break;
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentView, currentWordIndex, guesses, availableLetters, completedWords]);

  // Check if current word is correct
  const checkWord = () => {
    const guess = guesses[currentWordIndex];
    if (guess.some(l => l === '')) return;

    const guessedWord = guess.join('');
    if (guessedWord === currentPuzzle.words[currentWordIndex]) {
      const newCompleted = [...completedWords];
      newCompleted[currentWordIndex] = true;
      setCompletedWords(newCompleted);

      if (newCompleted.every(c => c)) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);

        const newStats = { ...stats, tracksCompleted: stats.tracksCompleted + 1 };
        setStats(newStats);
        saveStats(newStats);

        if (!completedPuzzles.includes(currentPuzzleIndex)) {
          const newCompletedPuzzles = [...completedPuzzles, currentPuzzleIndex];
          setCompletedPuzzles(newCompletedPuzzles);
          saveCompletedPuzzles(newCompletedPuzzles);
        }
      } else {
        for (let i = 0; i < 4; i++) {
          const nextIdx = (currentWordIndex + 1 + i) % 4;
          if (!newCompleted[nextIdx]) {
            setCurrentWordIndex(nextIdx);
            break;
          }
        }
      }
    } else {
      const newAvailable = [...availableLetters];
      const newGuesses = [...guesses];
      for (let i = 1; i < newGuesses[currentWordIndex].length; i++) {
        if (newGuesses[currentWordIndex][i] !== '') {
          newAvailable.push(newGuesses[currentWordIndex][i]);
        }
        newGuesses[currentWordIndex][i] = '';
      }
      newAvailable.sort();
      setGuesses(newGuesses);
      setAvailableLetters(newAvailable);
    }
  };

  const confirmReset = () => {
    const resetStats = { totalPlays: 0, tracksCompleted: 0, lastPlayed: null };
    setStats(resetStats);
    setCompletedPuzzles([]);
    saveStats(resetStats);
    saveCompletedPuzzles([]);
    setShowResetModal(false);
    setShowStatsModal(false);
  };

  const confettiEmojis = ['🎵', '🎶', '💿', '⭐', '✨', '🎸', '🎤', '🎹'];
  const allComplete = completedWords.every(c => c);
  const progressPct = puzzles.length > 0 ? Math.round((completedPuzzles.length / puzzles.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 p-4 relative overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-amber-500 rounded-full opacity-15 blur-3xl animate-pulse"></div>
      </div>

      <div className="fixed top-20 left-10 text-4xl opacity-20 animate-bounce">🎵</div>
      <div className="fixed top-40 right-16 text-3xl opacity-15 animate-bounce">🎶</div>
      <div className="fixed bottom-32 left-20 text-3xl opacity-15 animate-bounce">♪</div>
      <div className="fixed bottom-20 right-10 text-4xl opacity-20 animate-bounce">♫</div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="absolute text-3xl animate-ping" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}>
              {confettiEmojis[i % confettiEmojis.length]}
            </div>
          ))}
        </div>
      )}

      {currentView === 'menu' && (
        <div className="max-w-lg mx-auto relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold tracking-wide text-amber-200">Letter Griddle</h1>
            <h2 className="text-5xl font-black tracking-wider mt-1 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">JUKEBOX</h2>
          </div>

          <div className="flex justify-center mb-4">
            <button onClick={() => setShowStatsModal(true)} className="bg-slate-800/70 hover:bg-slate-700/70 border border-amber-500/30 text-amber-200 px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all">
              <span>📊</span><span>Your Stats</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="text-center mb-4">
              <span className="text-2xl inline-block">💿</span>
              <span className="text-amber-200 font-bold tracking-wide ml-2">SELECT A TRACK</span>
            </div>

            {puzzles.map((puzzle, i) => {
              const isCompleted = completedPuzzles.includes(i);
              return (
                <div key={i} onClick={() => startPuzzle(i)} className="bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 hover:border-pink-500/50 rounded-xl p-4 cursor-pointer transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isCompleted ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400 group-hover:bg-pink-500 group-hover:text-white'}`}>
                      {isCompleted ? '✓' : i + 1}
                    </span>
                    <div>
                      <div className="text-white font-medium">{puzzle.category}</div>
                      <div className="text-xs text-slate-500">{isCompleted ? 'Completed • Play again?' : '4 words'}</div>
                    </div>
                  </div>
                  <div className={`transition-opacity ${isCompleted ? 'text-green-400 group-hover:text-pink-400' : 'text-pink-400 opacity-0 group-hover:opacity-100'}`}>
                    {isCompleted ? '🔄' : '▶'}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-amber-500/20">
              <span className="text-amber-400 font-bold">{completedPuzzles.length}</span>
              <span className="text-slate-400 text-sm">/ {puzzles.length} tracks completed</span>
            </div>
          </div>

          <div className="text-center mt-8 text-xs text-slate-500">
            <p>Part of <span className="text-amber-400">The Letter Griddle Cafe</span> ☕</p>
            <p className="mt-1"><a href="/" className="text-slate-600 hover:text-amber-400 transition-colors">← Back to Cafe</a></p>
          </div>
        </div>
      )}

      {currentView === 'game' && currentPuzzle && (
        <div className="max-w-lg mx-auto relative z-10">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold tracking-wide text-amber-200">Letter Griddle</h1>
            <h2 className="text-4xl font-black tracking-wider mt-1 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">JUKEBOX</h2>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCurrentView('menu')} className="text-slate-400 hover:text-white text-sm">← Back</button>
            <div className="inline-flex items-center gap-2 bg-slate-800 px-4 py-1.5 rounded-full border border-amber-500/30">
              <span className="text-lg">💿</span>
              <span className="text-amber-200 font-bold text-sm">{currentPuzzle.category}</span>
            </div>
            <div className="w-12"></div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur opacity-30"></div>
            <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-5 border border-amber-500/20">

              <div className="bg-slate-900/50 rounded-xl p-3 mb-4 border border-purple-500/20">
                <p className="text-center text-sm text-purple-200">🎵 Each word connects to the next 🎵</p>
                <p className="text-center text-xs text-slate-400 mt-1">Type letters • ENTER to check • BACKSPACE to delete</p>
              </div>

              <div className="space-y-2 mb-5">
                {currentPuzzle.words.map((word, wordIdx) => {
                  const isActive = currentWordIndex === wordIdx && !completedWords[wordIdx];
                  const isComplete = completedWords[wordIdx];

                  return (
                    <React.Fragment key={wordIdx}>
                      {wordIdx > 0 && (
                        <div className="flex justify-center -my-1">
                          <div className={`text-lg ${completedWords[wordIdx - 1] && completedWords[wordIdx] ? 'text-green-400' : 'text-purple-500/50'}`}>⟡</div>
                        </div>
                      )}

                      <div onClick={() => !completedWords[wordIdx] && setCurrentWordIndex(wordIdx)} className={`rounded-xl p-3 cursor-pointer transition-all ${isActive ? 'bg-purple-900/40 border-2 border-pink-500/50' : isComplete ? 'bg-green-900/30 border border-green-500/30' : 'bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/30'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isComplete ? 'bg-green-500 text-white' : isActive ? 'bg-pink-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                              {isComplete ? '✓' : wordIdx + 1}
                            </span>
                            <span className="text-xs text-slate-500">Track {wordIdx + 1}</span>
                          </div>
                          {!isComplete && (
                            <button onClick={(e) => { e.stopPropagation(); const newHints = [...hintsRevealed]; newHints[wordIdx] = !newHints[wordIdx]; setHintsRevealed(newHints); }} className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2 py-1 rounded-full border border-amber-500/30">
                              Hint
                            </button>
                          )}
                        </div>

                        {hintsRevealed[wordIdx] && !isComplete && (
                          <div className="bg-slate-900/70 rounded-lg p-2 mb-2 border border-amber-500/20 text-xs text-amber-200/80">{currentPuzzle.hints[wordIdx]}</div>
                        )}

                        <div className="flex gap-2 justify-center flex-wrap">
                          {guesses[wordIdx]?.map((letter, letterIdx) => (
                            <div key={letterIdx} className={`w-9 h-11 flex items-center justify-center text-lg font-bold rounded-lg border-2 transition-all ${isComplete ? 'bg-green-700 border-green-400 text-white' : letterIdx === 0 ? 'bg-cyan-700 border-cyan-400 text-white' : letter ? 'bg-pink-700 border-pink-400 text-white' : isActive ? 'bg-slate-800 border-pink-500/50 border-dashed' : 'bg-slate-800/50 border-slate-700'}`}>
                              {letter}
                            </div>
                          ))}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="bg-slate-900 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xl">🎹</span>
                  <span className="text-sm font-bold text-amber-200 tracking-wider uppercase">Available Letters</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  {availableLetters.length > 0 ? availableLetters.map((letter, i) => (
                    <div key={i} className="w-8 h-9 rounded-lg flex items-center justify-center text-base font-bold bg-gradient-to-b from-amber-400 to-amber-600 border-2 border-amber-300 text-slate-900 shadow-md">{letter}</div>
                  )) : <p className="text-amber-200 text-sm">✨ All letters used!</p>}
                </div>
                <p className="text-center text-xs text-slate-500">Type on your keyboard to play</p>
              </div>
            </div>
          </div>

          {allComplete && (
            <div className="mt-5 bg-slate-900 border border-green-500/50 rounded-2xl p-5 text-center">
              <p className="text-2xl font-bold text-green-400 mb-2">🎉 Track Complete! 🎉</p>
              <p className="text-sm text-green-300 mb-4">You chained all the words!</p>
              <div className="bg-slate-800/50 rounded-xl p-3 mb-4 text-sm text-amber-200">{currentPuzzle.words.join(' → ')}</div>
              <div className="flex gap-3 justify-center">
                <button onClick={() => startPuzzle(currentPuzzleIndex)} className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded-full font-bold text-sm">🔄 Play Again</button>
                <button onClick={() => setCurrentView('menu')} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-5 py-2 rounded-full font-bold text-sm">🎵 More Tracks</button>
              </div>
            </div>
          )}

          <div className="text-center mt-6 text-xs text-slate-500">
            <p>Part of <span className="text-amber-400">The Letter Griddle Cafe</span> ☕</p>
          </div>
        </div>
      )}

      {showStatsModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowStatsModal(false)}>
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-6 max-w-sm w-full border border-amber-500/30 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowStatsModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl">✕</button>
            <div className="text-center mb-6">
              <span className="text-4xl">📊</span>
              <h3 className="text-2xl font-bold text-amber-200 mt-2">Your Stats</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-900/50 rounded-xl p-4 text-center border border-pink-500/30">
                <div className="text-3xl font-bold text-pink-400">{stats.tracksCompleted}</div>
                <div className="text-xs text-slate-400 mt-1">Tracks Completed</div>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 text-center border border-cyan-500/30">
                <div className="text-3xl font-bold text-cyan-400">{stats.totalPlays}</div>
                <div className="text-xs text-slate-400 mt-1">Total Plays</div>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 text-center border border-amber-500/30">
                <div className="text-3xl font-bold text-amber-400">{completedPuzzles.length}/{puzzles.length}</div>
                <div className="text-xs text-slate-400 mt-1">Unique Tracks</div>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 text-center border border-green-500/30">
                <div className="text-3xl font-bold text-green-400">{progressPct}%</div>
                <div className="text-xs text-slate-400 mt-1">Playlist Progress</div>
              </div>
            </div>
            <div className="mb-6">
              <div className="text-xs text-slate-400 mb-1 text-center">Playlist Progress</div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all" style={{width: `${progressPct}%`}}></div>
              </div>
            </div>
            {completedPuzzles.length === puzzles.length && <div className="text-center text-green-400 font-bold mb-6">🎉 All tracks completed! 🎉</div>}
            <div className="border-t border-slate-700 pt-4 mt-4">
              <button onClick={() => setShowResetModal(true)} className="w-full bg-slate-800 hover:bg-red-900/50 border border-slate-600 hover:border-red-500/50 text-slate-400 hover:text-red-400 px-4 py-2 rounded-full text-sm transition-all">🔄 Reset All Progress</button>
              <p className="text-xs text-slate-600 text-center mt-2">Start fresh from the beginning</p>
            </div>
          </div>
        </div>
      )}

      {showResetModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowResetModal(false)}>
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-6 max-w-sm w-full border border-red-500/30 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-white mb-2">Reset All Progress?</h3>
            <p className="text-slate-400 text-sm mb-6">This will clear all your stats and completed tracks. This cannot be undone!</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowResetModal(false)} className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all">Cancel</button>
              <button onClick={confirmReset} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all">Reset Everything</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}