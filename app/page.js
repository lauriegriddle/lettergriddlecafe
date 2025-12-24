'use client';

import React, { useState, useEffect } from 'react';

// Story/Vignette data - easily expandable for future stories
const stories = [
  {
    id: 'trivia-night',
    title: 'Trivia Night',
    subtitle: 'The King of Terriers',
    date: 'December 2025',
    content: [
      'Jukebox, as it\'s affectionately referred to by the Sunday night trivia crew, plays the final notes of its ambient instrumental. Silence signals the end of the night when the cafe needs Laurel\'s attention.',
      '"Sizzle-drip-sizzle…" the coffee pot reminds Laurel to turn it off and of Sarah deferring her second cup of coffee to Mrs. Lindsay, who needed a bit of a jolt to answer that last trivia question.',
      '"This final question is for all the dog lovers out there," Laurel teased her crowd of trivia enthusiasts knowing the group shares a love of animals.',
      '"What dog breed is the king of the terriers?" Laurel asked.',
      '"They are all kings!" Mr. and Mrs. Lindsay chimed in unison.',
      '"It\'s not...Chihuahua?!" Jennie responded, as she gently covered Isaac\'s ears.',
      '"Dogs, kings? Let\'s talk about cats!" Josie whispered to her mother.',
      'Holding back laughter as the group revealed their opinions rather than answer the question, Laurel read, "The king of terriers is the Airedale."',
      '"Ugh!" Josephine reacted, patting Josie\'s hand.',
      '"Oh, I might have heard that on an episode of Animal Planet," Taylor B. admitted.',
      '"Who\'s to say who\'s a king?" Jennie demanded, then whispered something inaudible into Isaac\'s ears as she offered him a tasty morsel from her plate.',
      '"So many dogs, so much cuteness and love!" Mr. Lindsay gushed, attempting to soothe himself, Jennie, and her furry companion.',
      'Mrs. Lindsay concurred with her husband\'s adoration and Laurel\'s answer but promised to do her own research.',
      'The other players were having their sidebar conversations that lasted anywhere from "a sip of coffee to I need another cinnamon bun."'
    ],
    closing: 'Friends, return next Sunday at 7pm for another serving.'
  },
  {
    id: 'coffee-coffee-coffee',
    title: 'Coffee, Coffee, Coffee',
    subtitle: 'Nourishing Friends',
    date: 'December 2025',
    content: [
      '"Mrs. Lindsay, I know you like your coffee with one-third cream and two sugar packets, like I do. Have this one," Sarah offered, "I haven\'t sipped from it yet."',
      '"Sarah, you know me so well!" Mrs. Lindsay gladly accepted amid the buzz in the room about terriers, cinnamon buns, and the current temperature of their coffee.',
      '"Coffee, coffee, coffee," Laurel muses as she prepares the machine for the next day.',
      'Coffee is a major ingredient of the Letter Griddle Cafe\'s recipe for magic, but an even more important ingredient is just being around others.',
      'Just close enough that you can feel like you are part of something bigger than yourself yet far enough apart that your personal space is your own.',
      'The Letter Griddle Cafe menu is a permission slip to slow down, surrender, and stop trying to fix the world.',
      'Laurel looks at the plaque hanging on the wall over the cafe door. The embroidered stitching in various shades of pancake- and coffee-colored threads reveals the Letter Griddle mission statement.',
      'Nourishing friends of Griddle Falls, one meal at a time.',
      'Morning will be here along with hungry regulars Chuck and Gladys Barnes, Mrs. Winslow, and the rest of the morning regulars, affectionately known as "The A.M. Cafe Crew."',
      'Turning out the lights, leaving the cafe to head for home, Laurel pauses, "Thanks for another fun trivia night. See you sooner than later, LG."'
    ],
    closing: 'Friends, we will meet you back here sooner than later.'
  },
  {
    id: 'add-one-jukebox',
    title: 'Add One Jukebox',
    subtitle: '🎵 Opening Sunday at 7 PM',
    date: 'December 2025',
    locked: true,
    content: [
      'Walking to her SUV, Laurel notices Mr. and Mrs. Lindsay, Jennie, and Isaac in a post-trivia huddle.',
      '"I only gave him a small bit of my frosted cinnamon roll," Laurel overhears Jennie, as she tenderly gazes at Isaac.',
      '"Isaac\'s just like this one," Mrs. Lindsay reveals as she gestures in Mr. Lindsay\'s direction.',
      '"Who\'s a good boy? Who\'s got a sweet tooth?" Mr. Lindsay lovingly asks as he scratches Isaac\'s ear.',
      '"Are those trivia questions for next week?" Laurel playfully muses as she joins the group.',
      '"If it is, that second question will have more than one right answer," Mrs. Lindsay professes. "I\'ve done my own research."',
      '"Oh, Laurel, you know those cinnamon buns are what we look forward to the most!" Jennie proclaims, then reconsiders, "Well, of course, after the cinnamon buns, the lovely crew of characters…"',
      'Mr. Lindsay continues his love fest with the chihuahua, "Cute, little fluffy doggies are characters."',
      '"Coffee, coffee, and more coffee!" Recently caffeinated, Mrs. Lindsay enthusiastically adds to the growing list of Letter Griddle Cafe charms.',
      '"Crew, you remember two Sunday evenings ago when we didn\'t have Juke—," Laurel begins.',
      '"Jukebox!" The group responds in trivia style.',
      '"Jukebox was on the fritz…" Laurel restarts.',
      '"…And Taylor B had just seen a documentary about the evolution of the jukebox," Mrs. Lindsay adds as Laurel pauses.',
      '"Taylor B figured out how to replace the tracks to bring our dear Jukebox into the modern age," Laurel reminds the group.',
      '"We didn\'t dance," Mr. Lindsay says as he comforts Isaac. "I mean, Mrs. Lindsay and I didn\'t dance for two weeks."',
      '"Laurel, did you just hear us?" Jennie asks rhetorically. "Here\'s a recipe for the Letter Griddle Cafe!"',
      '"Cinnamon buns, lightly frosted," Mr. Lindsay notes.',
      '"Fun friends who like to talk and share what they know," Jennie offers, nodding in the direction of her dog-loving companions.',
      '"Coffee and a second cup of coffee!" Mrs. Lindsay robustly interjects.',
      '"Jukebox!" The group erupts.',
      'Each pauses to absorb this shared moment of discovery.',
      'Mr. Lindsay quietly offers, "All of these ingredients create a special place in Griddle Falls, where sharing time, treats, and music with friends, where ——"',
      '"…people, coffee, cinnamon buns, terriers, one jukebox, and gentle chaos, are the recipe that makes the morning breakfast rush, trivia night, and everything in between magical," Laurel recites as an idea for another creation takes shape.',
      '"Where one treat leads to another, one friend helps another, one song on Jukebox leads to another," Jennie ponders as Isaac perks up.',
      '"Crew, you\'ve provided inspiration for my next creation," Laurel shares with renewed energy. "Just add one Jukebox!"'
    ],
    closing: 'Return next Sunday at 7pm to see what Laurel and the crew have cooked up.',
    closingLink: '/jukebox',
    closingLinkText: 'Play Letter Griddle Jukebox now →'
  }
];

// Puzzle data - expandable for future puzzles
const puzzles = {
  'trivia-night': {
    id: 'sunday-night',
    title: 'Sunday Night',
    category: 'Cafe Life',
    words: ['CAFE', 'TRIVIA', 'COFFEE', 'JUKEBOX', 'PANCAKES'],
    hints: ['Where friends gather', 'Sunday night game', 'Hot morning brew', 'Plays ambient tunes', 'Griddle favorites'],
    revealed: [
      { pos: 1, letter: 'A' },
      { pos: 2, letter: 'I' },
      { pos: 0, letter: 'C' },
      { pos: 4, letter: 'B' },
      { pos: 3, letter: 'C' }
    ],
    didYouKnow: 'The tradition of cafe culture dates back to the 1600s when coffeehouses became gathering places for conversation, news, and community. They were called "penny universities" because for the price of a coffee, you could engage in stimulating conversation and learn from others.'
  },
  'coffee-coffee-coffee': {
    id: 'cafe',
    title: 'Cafe',
    category: 'Cafe Life',
    words: ['MENU', 'SHARE', 'FRIEND', 'NOURISH', 'INTERACT'],
    hints: ['List of offerings', 'Give to others', 'Companion', 'Feed and nurture', 'Engage with others'],
    revealed: [
      { pos: 0, letter: 'M' },
      { pos: 2, letter: 'A' },
      { pos: 0, letter: 'F' },
      { pos: 4, letter: 'I' },
      { pos: 6, letter: 'C' }
    ],
    didYouKnow: 'The word "cafe" comes from the French café, meaning "coffee," which itself derives from the Italian caffè, ultimately tracing back through Ottoman Turkish kahve to the Arabic qahwa, which originally referred to a type of wine but was transferred to coffee due to its stimulating effect.'
  },
  'add-one-jukebox': {
    id: 'jukebox',
    title: 'Jukebox',
    category: 'Jukebox',
    words: ['TUNE', 'BLUES', 'VARIETY', 'COUNTRY', 'RECORDED'],
    hints: ['A melody', 'Sad music genre', 'Wide selection', 'Rural music style', 'Captured on tape'],
    revealed: [
      { pos: 0, letter: 'T' },
      { pos: 2, letter: 'U' },
      { pos: 0, letter: 'V' },
      { pos: 3, letter: 'N' },
      { pos: 2, letter: 'C' }
    ],
    didYouKnow: 'Jukeboxes started as nickel-in-slot phonographs in 1889, evolving from early recording devices. The name "jukebox" comes from "juke joints" where people danced to them in the 1930s. They helped revive the music industry during the Depression and offered a wide variety of music for soldiers during WWII.'
  }
};

// Generate letters for a puzzle (excluding revealed letters)
function generateLetterPool(words, revealed) {
  const allLetters = words.join('').split('');
  
  // Remove revealed letters from the pool
  revealed.forEach((rev, wordIndex) => {
    if (rev) {
      const letterToRemove = rev.letter;
      const idx = allLetters.indexOf(letterToRemove);
      if (idx !== -1) {
        allLetters.splice(idx, 1);
      }
    }
  });
  
  // Shuffle the letters
  for (let i = allLetters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allLetters[i], allLetters[j]] = [allLetters[j], allLetters[i]];
  }
  return allLetters;
}

// Puzzle Component
function LetterGriddlePuzzle({ puzzle }) {
  const [letterPool, setLetterPool] = useState([]);
  const [guesses, setGuesses] = useState(puzzle.words.map(() => []));
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [completed, setCompleted] = useState(puzzle.words.map(() => false));
  const [revealedHints, setRevealedHints] = useState(puzzle.words.map(() => false));
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  useEffect(() => {
    setLetterPool(generateLetterPool(puzzle.words, puzzle.revealed));
    const initialGuesses = puzzle.words.map((word, wordIndex) => {
      const guess = Array(word.length).fill(null);
      const revealed = puzzle.revealed[wordIndex];
      if (revealed) {
        guess[revealed.pos] = { letter: revealed.letter, revealed: true };
      }
      return guess;
    });
    setGuesses(initialGuesses);
    setCompleted(puzzle.words.map(() => false));
  }, [puzzle]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      
      if (/^[A-Z]$/.test(key)) {
        const poolIndex = letterPool.findIndex(letter => letter === key);
        if (poolIndex !== -1) {
          const wordGuess = guesses[activeWordIndex];
          if (!wordGuess || completed[activeWordIndex]) return;
          
          const emptySlotIndex = wordGuess.findIndex(g => g === null);
          if (emptySlotIndex !== -1) {
            placeLetterInSlot(activeWordIndex, emptySlotIndex, key, poolIndex);
          }
        }
      }
      
      if (e.key === 'Backspace') {
        const wordGuess = guesses[activeWordIndex];
        if (!wordGuess || completed[activeWordIndex]) return;
        
        for (let i = wordGuess.length - 1; i >= 0; i--) {
          if (wordGuess[i] && !wordGuess[i].revealed) {
            removeLetterFromSlot(activeWordIndex, i);
            break;
          }
        }
      }
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveWordIndex(prev => {
          let next = (prev + 1) % puzzle.words.length;
          while (completed[next] && next !== prev) {
            next = (next + 1) % puzzle.words.length;
          }
          return next;
        });
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveWordIndex(prev => {
          let next = (prev - 1 + puzzle.words.length) % puzzle.words.length;
          while (completed[next] && next !== prev) {
            next = (next - 1 + puzzle.words.length) % puzzle.words.length;
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [letterPool, guesses, activeWordIndex, completed, puzzle.words.length]);

  // FIXED: Now stores the letter itself instead of relying on poolIndex
  const placeLetterInSlot = (wordIndex, slotIndex, letter, poolIndex) => {
    const newGuesses = [...guesses];
    newGuesses[wordIndex] = [...newGuesses[wordIndex]];
    // Store the letter - we'll add it back to the pool when removed
    newGuesses[wordIndex][slotIndex] = { letter };
    setGuesses(newGuesses);
    
    // Remove the letter from the pool by splicing it out entirely
    const newPool = letterPool.filter((_, idx) => idx !== poolIndex);
    setLetterPool(newPool);
    setSelectedLetter(null);
    
    const wordGuess = newGuesses[wordIndex];
    if (wordGuess.every(g => g !== null)) {
      const guessedWord = wordGuess.map(g => g.letter).join('');
      if (guessedWord === puzzle.words[wordIndex]) {
        const newCompleted = [...completed];
        newCompleted[wordIndex] = true;
        setCompleted(newCompleted);
        const nextIncomplete = newCompleted.findIndex((c, i) => !c && i > wordIndex);
        if (nextIncomplete !== -1) {
          setActiveWordIndex(nextIncomplete);
        } else {
          const firstIncomplete = newCompleted.findIndex(c => !c);
          if (firstIncomplete !== -1) {
            setActiveWordIndex(firstIncomplete);
          }
        }
      }
    }
  };

  // FIXED: Simply adds the letter back to the pool
  const removeLetterFromSlot = (wordIndex, slotIndex) => {
    const newGuesses = [...guesses];
    newGuesses[wordIndex] = [...newGuesses[wordIndex]];
    const returnedLetter = newGuesses[wordIndex][slotIndex];
    newGuesses[wordIndex][slotIndex] = null;
    setGuesses(newGuesses);
    
    // Simply add the letter back to the pool
    if (returnedLetter && returnedLetter.letter && !returnedLetter.revealed) {
      setLetterPool(prev => [...prev, returnedLetter.letter]);
    }
  };

  const handleLetterClick = (letter, poolIndex) => {
    if (selectedLetter?.poolIndex === poolIndex) {
      setSelectedLetter(null);
      return;
    }
    setSelectedLetter({ letter, poolIndex });
  };

  const handleSlotClick = (wordIndex, slotIndex) => {
    if (completed[wordIndex]) return;
    
    const currentGuess = guesses[wordIndex][slotIndex];
    
    if (currentGuess?.revealed) return;
    
    if (selectedLetter && !currentGuess) {
      placeLetterInSlot(wordIndex, slotIndex, selectedLetter.letter, selectedLetter.poolIndex);
    }
    else if (currentGuess && !currentGuess.revealed) {
      removeLetterFromSlot(wordIndex, slotIndex);
    }
  };

  const shuffleLetters = () => {
    setLetterPool(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  const resetPuzzle = () => {
    setLetterPool(generateLetterPool(puzzle.words, puzzle.revealed));
    const initialGuesses = puzzle.words.map((word, wordIndex) => {
      const guess = Array(word.length).fill(null);
      const revealed = puzzle.revealed[wordIndex];
      if (revealed) {
        guess[revealed.pos] = { letter: revealed.letter, revealed: true };
      }
      return guess;
    });
    setGuesses(initialGuesses);
    setCompleted(puzzle.words.map(() => false));
    setRevealedHints(puzzle.words.map(() => false));
    setSelectedLetter(null);
    setActiveWordIndex(0);
  };

  const revealHint = (wordIndex) => {
    setRevealedHints(prev => {
      const newHints = [...prev];
      newHints[wordIndex] = true;
      return newHints;
    });
  };

  const allCompleted = completed.every(c => c);

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <span className="puzzle-icon">☕</span>
        <span className="puzzle-title">Letter Griddle</span>
        <span className="puzzle-icon">☕</span>
      </div>
      
      <div className="puzzle-category">{puzzle.title}</div>
      
      {/* Word rows */}
      <div className="word-rows">
        {puzzle.words.map((word, wordIndex) => (
          <div 
            key={wordIndex} 
            className={`word-row ${completed[wordIndex] ? 'completed' : ''} ${activeWordIndex === wordIndex && !completed[wordIndex] ? 'active' : ''}`}
            onClick={() => !completed[wordIndex] && setActiveWordIndex(wordIndex)}
          >
            {revealedHints[wordIndex] && !completed[wordIndex] && (
              <div className="hint-text">{puzzle.hints[wordIndex]}</div>
            )}
            <div className="word-row-content">
              <div className="word-length">{word.length} Letters</div>
              <div className="letter-slots">
                {Array(word.length).fill(null).map((_, slotIndex) => {
                  const guess = guesses[wordIndex]?.[slotIndex];
                  return (
                    <button
                      key={slotIndex}
                      className={`letter-slot ${guess ? 'filled' : ''} ${guess?.revealed ? 'revealed' : ''} ${completed[wordIndex] ? 'correct' : ''}`}
                      onClick={(e) => { e.stopPropagation(); handleSlotClick(wordIndex, slotIndex); }}
                    >
                      {guess?.letter || ''}
                    </button>
                  );
                })}
              </div>
              {!completed[wordIndex] && !revealedHints[wordIndex] && (
                <button 
                  className="hint-btn"
                  onClick={(e) => { e.stopPropagation(); revealHint(wordIndex); }}
                >
                  Hint
                </button>
              )}
            </div>
            {completed[wordIndex] && (
              <div className="word-complete-icon">☕</div>
            )}
          </div>
        ))}
      </div>

      {/* Letter pool - FIXED: No more null filtering issues */}
      <div className="letter-pool-container">
        <div className="letter-pool-header">
          <span className="skillet">🍳</span>
          <span>Letter Griddle</span>
          <span className="skillet">🍳</span>
        </div>
        <div className="letter-pool">
          {letterPool.map((letter, index) => (
            <button
              key={index}
              className={`pool-letter ${selectedLetter?.poolIndex === index ? 'selected' : ''}`}
              onClick={() => handleLetterClick(letter, index)}
            >
              {letter}
            </button>
          ))}
        </div>
        <button className="shuffle-btn" onClick={shuffleLetters}>
          🔀 Shuffle
        </button>
      </div>

      {/* Instructions */}
      <div className="puzzle-instructions">
        <p>• Click a letter, then click a slot to place it</p>
        <p>• Click a filled slot to return the letter</p>
        <p>• Desktop? Type letters directly! Use ↑↓ to switch words, Backspace to remove</p>
        <p>• Like a good recipe, sometimes you just have to try it and see!</p>
      </div>

      {/* Reset button */}
      <button className="reset-btn" onClick={resetPuzzle}>
        🔄 Reset Puzzle
      </button>

      {/* Completion celebration modal - full screen */}
      {allCompleted && (
        <div className="completion-modal-overlay">
          <div className="confetti-container">
            {[...Array(40)].map((_, i) => (
              <div 
                key={i} 
                className="confetti" 
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-20px',
                  animationDelay: `${Math.random() * 0.5}s`,
                  backgroundColor: ['#f59e0b', '#fbbf24', '#92400e', '#fde68a', '#d97706'][Math.floor(Math.random() * 5)]
                }}
              />
            ))}
          </div>
          <div className="completion-modal">
            <div className="completion-emoji">☕🍯🥞</div>
            <h3>Delicious!</h3>
            <p>You solved the puzzle!</p>
            <div className="completion-buttons">
              <button className="completion-btn primary" onClick={resetPuzzle}>
                🔄 Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Story Card Component
function StoryCard({ story, onClick }) {
  return (
    <button 
      className={`story-card ${story.locked ? 'story-card-locked' : ''}`}
      onClick={story.locked ? undefined : onClick}
      disabled={story.locked}
    >
      <h3 className="story-card-title">{story.title}</h3>
      {story.locked ? (
        <p className="story-card-locked-text">{story.subtitle}</p>
      ) : (
        <p className="story-card-date">{story.date}</p>
      )}
    </button>
  );
}

// Story Detail Component
function StoryDetail({ story, puzzle, onBack }) {
  return (
    <div className="story-detail">
      <button className="back-btn" onClick={onBack}>
        ← Back to Stories
      </button>

      <div className="story-content-wrapper">
        {/* Story Section */}
        <div className="story-section">
          <div className="story-text-card">
            {story.content.map((paragraph, i) => (
              <p key={i} className="story-paragraph">{paragraph}</p>
            ))}
            <div className="story-closing">
              <p>{story.closing}</p>
            </div>
          </div>
        </div>

        {/* Puzzle Section */}
        <div className="puzzle-section">
          <div className="did-you-know">
            <h3>Did You Know?</h3>
            <p>{puzzle.didYouKnow}</p>
          </div>
          
          <LetterGriddlePuzzle puzzle={puzzle} />
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function LetterGriddleCafe() {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div className="cafe-app">
      {/* Header */}
      <header className="cafe-header">
        <div className="header-content">
          <h1 className="header-title">The Letter Griddle Cafe</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {selectedStory ? (
          <StoryDetail 
            story={selectedStory} 
            puzzle={puzzles[selectedStory.id]}
            onBack={() => setSelectedStory(null)} 
          />
        ) : (
          <>
            <div className="stories-intro">
              <h2>Come for the trivia, pancakes, and coffee. Stay for the tea.</h2>
            </div>
            <div className="story-grid">
              {stories.map(story => (
                <StoryCard 
                  key={story.id} 
                  story={story} 
                  onClick={() => setSelectedStory(story)} 
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="cafe-footer">
        <p className="footer-text">
          Part of <a href="https://lettergriddle.com" className="footer-link">The Letter Griddle Games</a>
        </p>
        <div className="footer-social">
          <a href="https://instagram.com/letter_griddle" className="footer-link instagram-link" target="_blank" rel="noopener noreferrer">
            <svg className="instagram-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @letter_griddle
          </a>
        </div>
        <div className="footer-links">
          <a href="https://lettergriddle.com/privacy" className="footer-link">Privacy</a>
          <span className="footer-divider">•</span>
          <a href="https://lettergriddle.com/terms" className="footer-link">Terms</a>
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} Letter Griddle.
        </p>
      </footer>
    </div>
  );
}