"use client";

import React, { useState, useEffect } from "react";
import { BrainCircuit, ArrowLeft, RotateCw, ThumbsUp, X, Check, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface FlashCard {
  term: string;
  definition: string;
  example: string;
  category: "figure-of-speech" | "literary-element" | "poetic-device" | "narrative";
}

const flashcards: FlashCard[] = [
  {
    term: "Simile",
    definition: "A comparison between two unlike things using 'like' or 'as'",
    example: "Her eyes twinkled like stars in the night sky.",
    category: "figure-of-speech"
  },
  {
    term: "Metaphor",
    definition: "A direct comparison between two unlike things without using 'like' or 'as'",
    example: "Time is money. The classroom was a zoo.",
    category: "figure-of-speech"
  },
  {
    term: "Personification",
    definition: "Giving human qualities to non-human objects or abstract ideas",
    example: "The wind whispered through the trees. Opportunity knocked on his door.",
    category: "figure-of-speech"
  },
  {
    term: "Alliteration",
    definition: "Repetition of the same consonant sounds at the beginning of words",
    example: "Peter Piper picked a peck of pickled peppers.",
    category: "poetic-device"
  },
  {
    term: "Onomatopoeia",
    definition: "Words that imitate the sound they represent",
    example: "Buzz, hiss, splash, boom",
    category: "poetic-device"
  },
  {
    term: "Hyperbole",
    definition: "Exaggeration used for emphasis or effect",
    example: "I'm so hungry I could eat a horse. I've told you a million times.",
    category: "figure-of-speech"
  },
  {
    term: "Imagery",
    definition: "Language that appeals to the senses (sight, sound, taste, touch, smell)",
    example: "The rusty metal gate creaked loudly as the wind pushed it open.",
    category: "literary-element"
  },
  {
    term: "Symbolism",
    definition: "Using an object, person, place, or event to represent something else",
    example: "A dove represents peace. The color red can symbolize anger or love.",
    category: "literary-element"
  },
  {
    term: "Theme",
    definition: "The central or underlying message of a literary work",
    example: "Themes in 'Romeo and Juliet' include love, fate, and family rivalry.",
    category: "literary-element"
  },
  {
    term: "Protagonist",
    definition: "The main character or lead figure in a story or play",
    example: "Harry Potter is the protagonist of the Harry Potter series.",
    category: "narrative"
  },
  {
    term: "Antagonist",
    definition: "The character or force that opposes the protagonist",
    example: "Lord Voldemort is the antagonist who opposes Harry Potter.",
    category: "narrative"
  },
  {
    term: "Foreshadowing",
    definition: "Hints or clues about events that will happen later in the story",
    example: "Dark clouds gathering might foreshadow a coming conflict.",
    category: "narrative"
  },
  {
    term: "Irony",
    definition: "A contrast between expectation and reality",
    example: "A fire station burning down. A traffic cop getting a speeding ticket.",
    category: "literary-element"
  },
  {
    term: "Allusion",
    definition: "A reference to another work of literature, person, or event",
    example: "Calling someone a 'Romeo' alludes to Shakespeare's romantic character.",
    category: "literary-element"
  },
  {
    term: "Rhyme",
    definition: "Repetition of similar sounds at the end of words",
    example: "Jack and Jill went up the hill.",
    category: "poetic-device"
  },
  {
    term: "Meter",
    definition: "The rhythmic pattern of stressed and unstressed syllables in poetry",
    example: "Shall I comPARE thee TO a SUMmer's DAY? (iambic pentameter)",
    category: "poetic-device"
  },
];

const categories = [
  { id: "all", label: "All Terms" },
  { id: "figure-of-speech", label: "Figures of Speech" },
  { id: "literary-element", label: "Literary Elements" },
  { id: "poetic-device", label: "Poetic Devices" },
  { id: "narrative", label: "Narrative Elements" },
];

export default function LiteraryTermsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredCards, setFilteredCards] = useState<FlashCard[]>(flashcards);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [studyMode, setStudyMode] = useState<"flashcards" | "quiz">("flashcards");
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: boolean}>({});
  const [savedTerms, setSavedTerms] = useState<string[]>([]);
  
  // Filter cards when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredCards(flashcards);
    } else {
      setFilteredCards(flashcards.filter(card => card.category === activeCategory));
    }
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setQuizAnswers({});
  }, [activeCategory]);
  
  // Shuffle the cards
  const shuffleCards = () => {
    const shuffled = [...filteredCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setFilteredCards(shuffled);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setQuizAnswers({});
  };
  
  // Navigate to next or previous card
  const navigateCard = (direction: "next" | "prev") => {
    setShowAnswer(false);
    if (direction === "next") {
      setCurrentCardIndex((currentCardIndex + 1) % filteredCards.length);
    } else {
      setCurrentCardIndex((currentCardIndex - 1 + filteredCards.length) % filteredCards.length);
    }
  };
  
  // Toggle saving a term
  const toggleSaveTerm = (term: string) => {
    if (savedTerms.includes(term)) {
      setSavedTerms(savedTerms.filter(t => t !== term));
    } else {
      setSavedTerms([...savedTerms, term]);
    }
  };
  
  // Handle quiz answers
  const handleQuizAnswer = (isCorrect: boolean) => {
    setQuizAnswers({
      ...quizAnswers,
      [currentCardIndex]: isCorrect
    });
    
    // Move to next card after a brief delay
    setTimeout(() => {
      if (currentCardIndex < filteredCards.length - 1) {
        navigateCard("next");
      }
    }, 1000);
  };
  
  // Reset quiz
  const resetQuiz = () => {
    setQuizAnswers({});
    setCurrentCardIndex(0);
    shuffleCards();
  };
  
  // Calculate quiz score
  const quizScore = Object.values(quizAnswers).filter(Boolean).length;
  const quizTotal = Object.keys(quizAnswers).length;
  const quizCompleted = quizTotal === filteredCards.length;
  
  // Progress percentage
  const progressPercentage = (currentCardIndex + 1) / filteredCards.length * 100;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-700 w-10 h-10 rounded-md flex items-center justify-center">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Literary Terms Flashcards</h1>
            <p className="text-gray-400">Quiz-style practice for literary devices and elements</p>
          </div>
        </div>
        <Link 
          href="/english/english-9"
          className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to English 9
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                title="Select category"
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label} ({category.id === "all" ? flashcards.length : flashcards.filter(card => card.category === category.id).length})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Study Mode
              </label>
              <div className="flex">
                <button
                  className={`px-4 py-2 ${studyMode === "flashcards" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"} rounded-l-md`}
                  onClick={() => setStudyMode("flashcards")}
                >
                  Flashcards
                </button>
                <button
                  className={`px-4 py-2 ${studyMode === "quiz" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"} rounded-r-md`}
                  onClick={() => {
                    setStudyMode("quiz");
                    setQuizAnswers({});
                    setCurrentCardIndex(0);
                    setShowAnswer(false);
                  }}
                >
                  Quiz Mode
                </button>
              </div>
            </div>
            
            <button
              className="flex items-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors mt-7"
              onClick={shuffleCards}
            >
              <RotateCw className="w-4 h-4" />
              <span>Shuffle</span>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          {/* Flashcards */}
          {filteredCards.length > 0 ? (
            <div className="card h-80">
              <div className="card-body flex flex-col items-center justify-center p-6">
                {studyMode === "flashcards" ? (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-400">
                        Card {currentCardIndex + 1} of {filteredCards.length}
                      </div>
                      <button
                        onClick={() => toggleSaveTerm(filteredCards[currentCardIndex].term)}
                        className="text-gray-400 hover:text-indigo-400 transition-colors"
                        title="Bookmark this term"
                        aria-label="Bookmark this term"
                      >
                        <Bookmark className={`w-5 h-5 ${savedTerms.includes(filteredCards[currentCardIndex].term) ? "fill-indigo-400 text-indigo-400" : ""}`} />
                      </button>
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-center items-center text-center">
                      <h3 className="text-2xl font-semibold mb-4">{filteredCards[currentCardIndex].term}</h3>
                      
                      {showAnswer ? (
                        <div className="space-y-3">
                          <p className="text-gray-300">{filteredCards[currentCardIndex].definition}</p>
                          <div className="mt-2 text-sm text-indigo-300 italic">
                            <span className="font-semibold">Example:</span> {filteredCards[currentCardIndex].example}
                          </div>
                        </div>
                      ) : (
                        <button
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
                          onClick={() => setShowAnswer(true)}
                        >
                          Show Definition
                        </button>
                      )}
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <button
                        title="Previous card"
                        className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        onClick={() => navigateCard("prev")}
                        disabled={currentCardIndex === 0}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        title="Next card"
                        className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        onClick={() => navigateCard("next")}
                        disabled={currentCardIndex === filteredCards.length - 1}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Quiz Mode */
                  <div className="w-full h-full flex flex-col justify-between">
                    {quizCompleted ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="mb-4">
                          <ThumbsUp className="w-16 h-16 text-indigo-400 mx-auto mb-2" />
                          <h3 className="text-2xl font-semibold mb-2">Quiz Complete!</h3>
                          <p className="text-gray-300">You got {quizScore} out of {quizTotal} correct.</p>
                          <p className="text-2xl font-bold mt-2">
                            {Math.round((quizScore / quizTotal) * 100)}%
                          </p>
                        </div>
                        <button
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
                          onClick={resetQuiz}
                        >
                          Try Again
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-sm text-gray-400">
                            Question {currentCardIndex + 1} of {filteredCards.length}
                          </div>
                          <div className="text-sm text-gray-400">
                            Score: {quizScore} / {quizTotal}
                          </div>
                        </div>
                        
                        <div className="flex-grow flex flex-col justify-center items-center text-center">
                          <p className="text-gray-300 mb-6">What is the definition of:</p>
                          <h3 className="text-2xl font-semibold mb-8">{filteredCards[currentCardIndex].term}</h3>
                          
                          {quizAnswers[currentCardIndex] !== undefined ? (
                            <div className={`p-4 rounded-md ${quizAnswers[currentCardIndex] ? "bg-green-900/20 border border-green-900/50" : "bg-red-900/20 border border-red-900/50"}`}>
                              <div className="flex items-center">
                                {quizAnswers[currentCardIndex] ? 
                                  <Check className="w-5 h-5 text-green-500 mr-2" /> : 
                                  <X className="w-5 h-5 text-red-500 mr-2" />}
                                <p className="text-gray-200">{filteredCards[currentCardIndex].definition}</p>
                              </div>
                              <div className="mt-2 text-sm italic">
                                <span className="font-semibold">Example:</span> {filteredCards[currentCardIndex].example}
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                              {generateQuizOptions().map((option, index) => (
                                <button
                                  key={index}
                                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-md transition-colors text-sm text-left"
                                  onClick={() => handleQuizAnswer(option.correct)}
                                >
                                  {option.definition}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {quizAnswers[currentCardIndex] !== undefined && currentCardIndex < filteredCards.length - 1 && (
                          <div className="flex justify-end mt-4">
                            <button
                              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
                              onClick={() => navigateCard("next")}
                            >
                              Next Question
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body text-center py-12">
                <p className="text-gray-400">No flashcards available for this category.</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Study Tips</h2>
            </div>
            <div className="card-body space-y-3">
              <p className="text-sm text-gray-300">
                Literary terms help you analyze texts more precisely and express your thoughts about literature more clearly.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Review a few terms each day for better retention</li>
                <li>• Try to identify these terms in the books you're reading</li>
                <li>• Create your own examples to deepen understanding</li>
                <li>• Use the quiz mode to test your knowledge</li>
                <li>• Bookmark difficult terms to review them later</li>
              </ul>
            </div>
          </div>
          
          {savedTerms.length > 0 && (
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 className="text-lg font-semibold">Bookmarked Terms</h2>
                <button
                  className="text-xs text-gray-400 hover:text-indigo-400"
                  onClick={() => setSavedTerms([])}
                >
                  Clear All
                </button>
              </div>
              <div className="card-body p-0">
                <div className="divide-y divide-gray-700">
                  {savedTerms.map((term) => {
                    const termData = flashcards.find(card => card.term === term);
                    return termData ? (
                      <div key={term} className="p-3 flex justify-between">
                        <div>
                          <h3 className="font-medium text-indigo-400">{termData.term}</h3>
                          <p className="text-xs text-gray-400 mt-1">{termData.definition}</p>
                        </div>
                        <button
                          onClick={() => toggleSaveTerm(term)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                          title="Remove from bookmarks"
                          aria-label="Remove from bookmarks"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  // Helper function to generate quiz options
  function generateQuizOptions() {
    const correctOption = {
      definition: filteredCards[currentCardIndex].definition,
      correct: true
    };
    
    // Get 3 random incorrect definitions
    const incorrectOptions = [];
    const availableOptions = flashcards
      .filter(card => card.term !== filteredCards[currentCardIndex].term)
      .map(card => card.definition);
    
    // Shuffle available options and take first 3
    for (let i = availableOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableOptions[i], availableOptions[j]] = [availableOptions[j], availableOptions[i]];
    }
    
    for (let i = 0; i < Math.min(3, availableOptions.length); i++) {
      incorrectOptions.push({
        definition: availableOptions[i],
        correct: false
      });
    }
    
    // Combine correct and incorrect options and shuffle
    const allOptions = [correctOption, ...incorrectOptions];
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }
    
    return allOptions;
  }
} 