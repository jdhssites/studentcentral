"use client";

import React, { useState } from "react";
import { BookOpenCheck, ArrowLeft, CheckCircle, XCircle, HelpCircle, Lightbulb, RefreshCw, FileUp, Send, Undo, Info, Download } from "lucide-react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface PracticeSession {
  passage: string;
  title?: string;
  author?: string;
  questions: Question[];
  userAnswers: (number | null)[];
  completed: boolean;
}

// Sample passage and questions
const exampleSession: PracticeSession = {
  passage: `It was about eleven o'clock in the morning, mid October, with the sun not shining and a look of hard wet rain in the clearness of the foothills. I was wearing my powder-blue suit, with dark blue shirt, tie and display handkerchief, black brogues, black wool socks with dark blue clocks on them. I was neat, clean, shaved and sober, and I didn't care who knew it. I was everything the well-dressed private detective ought to be. I was calling on four million dollars.

The main hallway of the Sternwood place was two stories high. Over the entrance doors, which would have let in a troop of Indian elephants, there was a broad stained-glass panel showing a knight in dark armor rescuing a lady who was tied to a tree and didn't have any clothes on but some very long and convenient hair. The knight had pushed the vizor of his helmet back to be sociable, and he was fiddling with the knots on the ropes that tied the lady to the tree and not getting anywhere. I stood there and thought that if I lived in the house, I would sooner or later have to climb up there and help him. He didn't seem to be really trying.`,
  title: "The Big Sleep",
  author: "Raymond Chandler",
  questions: [
    {
      id: 1,
      text: "The narrator's description of his clothing can best be understood as an attempt to",
      options: [
        "establish his affluence and social status",
        "present himself as professional and competent",
        "distract from his actual mission",
        "appeal to the wealthy client he's about to meet",
        "conceal his true identity from others"
      ],
      correctAnswer: 1,
      explanation: "The narrator meticulously describes his outfit to establish his professional appearance as a well-dressed detective. The line 'I was everything the well-dressed private detective ought to be' directly confirms this intention."
    },
    {
      id: 2,
      text: "The description of the stained-glass panel serves primarily to",
      options: [
        "establish the historical setting of the narrative",
        "foreshadow the romantic subplot of the story",
        "create a contrast between wealth and tastelessness",
        "introduce the theme of heroic rescue that will recur",
        "provide humorous commentary on the wealthy household"
      ],
      correctAnswer: 4,
      explanation: "The narrator's ironic observation about the knight 'not getting anywhere' and 'not really trying' suggests a humorous and somewhat critical view of the ostentatious display of wealth in the Sternwood home, reflecting the narrator's cynical perspective."
    },
    {
      id: 3,
      text: "The narrator's tone in this passage can best be described as",
      options: [
        "reverent and admiring",
        "anxious and uncertain",
        "detached and objective",
        "cynical and sardonic",
        "enthusiastic and eager"
      ],
      correctAnswer: 3,
      explanation: "The narrator maintains a cynical, sardonic tone throughout the passage. His ironic observations about his own appearance and the ridiculous stained glass window reveal a worldly, somewhat jaded perspective characteristic of hard-boiled detective fiction."
    }
  ],
  userAnswers: [null, null, null],
  completed: false
};

export default function ProsePracticePage() {
  const [session, setSession] = useState<PracticeSession | null>(null);
  const [passageText, setPassageText] = useState('');
  const [passageTitle, setPassageTitle] = useState('');
  const [passageAuthor, setPassageAuthor] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [error, setError] = useState('');
  const [explanationVisible, setExplanationVisible] = useState<{[key: number]: boolean}>({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadedFile(file);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPassageText(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const generateQuestions = () => {
    if (!passageText.trim()) {
      setError('Please enter or upload a prose passage to continue');
      return;
    }
    
    setError('');
    setIsGenerating(true);
    
    // In a real application, this would be an API call to an AI service
    // For now, we'll simulate with a timeout and return the example questions
    setTimeout(() => {
      setSession({
        passage: passageText,
        title: passageTitle || undefined,
        author: passageAuthor || undefined,
        questions: exampleSession.questions,
        userAnswers: exampleSession.questions.map(() => null),
        completed: false
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handleAnswerSelection = (questionIndex: number, optionIndex: number) => {
    if (!session) return;
    
    const newUserAnswers = [...session.userAnswers];
    newUserAnswers[questionIndex] = optionIndex;
    
    setSession({
      ...session,
      userAnswers: newUserAnswers
    });
  };

  const toggleExplanation = (questionId: number) => {
    setExplanationVisible({
      ...explanationVisible,
      [questionId]: !explanationVisible[questionId]
    });
  };

  const goToNextQuestion = () => {
    if (!session) return;
    if (activeQuestionIndex < session.questions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    } else {
      completeSession();
    }
  };

  const goToPreviousQuestion = () => {
    if (!session) return;
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  const completeSession = () => {
    if (!session) return;
    setSession({
      ...session,
      completed: true
    });
    setShowResults(true);
  };

  const resetSession = () => {
    setSession(null);
    setShowResults(false);
    setActiveQuestionIndex(0);
    setExplanationVisible({});
  };

  const calculateScore = () => {
    if (!session) return { correct: 0, total: 0, percentage: 0 };
    
    const correct = session.questions.reduce((count, question, index) => {
      return count + (session.userAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
    
    const total = session.questions.length;
    const percentage = Math.round((correct / total) * 100);
    
    return { correct, total, percentage };
  };

  const downloadResults = () => {
    if (!session) return;
    
    const score = calculateScore();
    const resultsText = `
# AP Literature Prose Practice Results

## Passage
${session.title ? `Title: ${session.title}` : 'Untitled passage'}
${session.author ? `Author: ${session.author}` : ''}

## Score
${score.correct} out of ${score.total} (${score.percentage}%)

## Questions and Answers

${session.questions.map((question, index) => `
Question ${index + 1}: ${question.text}
Your answer: ${session.userAnswers[index] !== null ? question.options[session.userAnswers[index]!] : 'Not answered'}
Correct answer: ${question.options[question.correctAnswer]}
${session.userAnswers[index] === question.correctAnswer ? '✓ Correct' : '✗ Incorrect'}

Explanation: ${question.explanation}
`).join('\n')}

## Passage Text
${session.passage}
`;

    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ap-lit-prose-practice-results.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const useExamplePassage = () => {
    setPassageText(exampleSession.passage);
    setPassageTitle(exampleSession.title || '');
    setPassageAuthor(exampleSession.author || '');
    setShowExample(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-700 w-10 h-10 rounded-md flex items-center justify-center">
            <BookOpenCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Prose Fiction Practice</h1>
            <p className="text-gray-400">Practice with AP Literature-style multiple-choice questions</p>
          </div>
        </div>
        <Link 
          href="/english/ap-literature"
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to AP Literature
        </Link>
      </div>
      
      {!session ? (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold">Enter Prose Passage</h2>
          </div>
          
          <div className="card-body space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Passage Title (optional)</label>
                <input 
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={passageTitle}
                  onChange={(e) => setPassageTitle(e.target.value)}
                  placeholder="Title of the work"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Author (optional)</label>
                <input 
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={passageAuthor}
                  onChange={(e) => setPassageAuthor(e.target.value)}
                  placeholder="Author of the work"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Passage Text</label>
              <textarea
                className="w-full h-64 bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={passageText}
                onChange={(e) => setPassageText(e.target.value)}
                placeholder="Paste the prose passage here (300-800 words recommended)..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Or upload a text file</label>
              <div className="flex items-center">
                <label className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 cursor-pointer">
                  <FileUp className="h-4 w-4 mr-2" />
                  {uploadedFile ? uploadedFile.name : 'Choose file'}
                  <input 
                    type="file" 
                    className="sr-only" 
                    accept=".txt"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <button 
                className="text-sm text-purple-400 hover:text-purple-300"
                onClick={() => setShowExample(!showExample)}
              >
                {showExample ? 'Hide' : 'Show'} example passage
              </button>
              
              <button
                className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 flex items-center"
                onClick={generateQuestions}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Questions'}
                <Send className="h-4 w-4 ml-2" />
              </button>
            </div>
            
            {showExample && (
              <div className="mt-4 p-3 bg-gray-800 rounded-md text-sm border border-gray-700">
                <p className="font-medium mb-2 text-gray-300">The Big Sleep by Raymond Chandler (excerpt)</p>
                <div className="whitespace-pre-wrap font-sans text-gray-400 text-sm max-h-60 overflow-y-auto mb-2">
                  {exampleSession.passage}
                </div>
                <button 
                  className="text-purple-400 hover:text-purple-300 text-sm"
                  onClick={useExamplePassage}
                >
                  Use this example
                </button>
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-700 text-red-300 rounded-md text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      ) : !showResults ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h2 className="font-medium">
                {session.title ? session.title : 'Passage'}
                {session.author && ` by ${session.author}`}
              </h2>
            </div>
            
            <div className="card-body">
              <div className="whitespace-pre-line text-gray-300">{session.passage}</div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 className="font-medium">Question {activeQuestionIndex + 1} of {session.questions.length}</h2>
              <div className="text-sm text-gray-400">
                {session.userAnswers.filter(a => a !== null).length} of {session.questions.length} answered
              </div>
            </div>
            
            <div className="card-body space-y-6">
              <div>
                <p className="font-medium text-gray-200 mb-4">{session.questions[activeQuestionIndex].text}</p>
                
                <div className="space-y-2">
                  {session.questions[activeQuestionIndex].options.map((option, optIndex) => (
                    <div 
                      key={optIndex}
                      className={`p-3 border rounded-md cursor-pointer ${
                        session.userAnswers[activeQuestionIndex] === optIndex 
                          ? 'border-purple-500 bg-purple-900/30' 
                          : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                      }`}
                      onClick={() => handleAnswerSelection(activeQuestionIndex, optIndex)}
                    >
                      <div className="flex items-start">
                        <div className={`h-5 w-5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                          session.userAnswers[activeQuestionIndex] === optIndex 
                            ? 'border-purple-500 bg-purple-500 text-white' 
                            : 'border-gray-500'
                        }`}>
                          {String.fromCharCode(65 + optIndex)}
                        </div>
                        <span className="ml-2 text-gray-300">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  className="px-4 py-2 border border-gray-700 rounded-md text-gray-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
                  onClick={goToPreviousQuestion}
                  disabled={activeQuestionIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                
                <button
                  className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 flex items-center"
                  onClick={goToNextQuestion}
                >
                  {activeQuestionIndex === session.questions.length - 1 ? 'Finish' : 'Next'}
                  {activeQuestionIndex === session.questions.length - 1 ? (
                    <CheckCircle className="h-4 w-4 ml-1" />
                  ) : (
                    <ArrowLeft className="h-4 w-4 ml-1 transform rotate-180" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h2 className="font-medium">Results</h2>
            <div className="flex space-x-2">
              <button 
                className="text-gray-400 hover:text-gray-300"
                onClick={resetSession}
                title="Start over"
              >
                <Undo className="h-4 w-4" />
              </button>
              <button 
                className="text-gray-400 hover:text-gray-300"
                onClick={downloadResults}
                title="Download results"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="card-body">
            <div className="flex justify-center mb-8">
              {(() => {
                const score = calculateScore();
                return (
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2 text-purple-400">{score.percentage}%</div>
                    <div className="text-gray-400">{score.correct} out of {score.total} correct</div>
                  </div>
                );
              })()}
            </div>
            
            <div className="space-y-8">
              {session.questions.map((question, index) => {
                const userAnswer = session.userAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={index} className="border-b border-gray-700 pb-6 last:border-0">
                    <div className="flex items-start">
                      <div className={`mt-1 flex-shrink-0 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <XCircle className="h-5 w-5" />
                        )}
                      </div>
                      
                      <div className="ml-3 flex-1">
                        <p className="font-medium text-gray-200 mb-3">
                          Question {index + 1}: {question.text}
                        </p>
                        
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optIndex) => {
                            let optionClass = 'p-2 border rounded-md';
                            
                            if (optIndex === question.correctAnswer) {
                              optionClass += ' border-green-500 bg-green-900/20';
                            } else if (userAnswer === optIndex) {
                              optionClass += ' border-red-500 bg-red-900/20';
                            } else {
                              optionClass += ' border-gray-700';
                            }
                            
                            return (
                              <div key={optIndex} className={optionClass}>
                                <div className="flex items-start">
                                  <div className={`h-5 w-5 rounded-full flex-shrink-0 flex items-center justify-center ${
                                    optIndex === question.correctAnswer ? 'bg-green-500 text-white' : 
                                    (userAnswer === optIndex ? 'bg-red-500 text-white' : 'border border-gray-500')
                                  }`}>
                                    {String.fromCharCode(65 + optIndex)}
                                  </div>
                                  <span className="ml-2 text-gray-300">{option}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div>
                          <button
                            className="flex items-center text-sm text-purple-400 hover:text-purple-300"
                            onClick={() => toggleExplanation(question.id)}
                          >
                            {explanationVisible[question.id] ? 'Hide' : 'Show'} explanation
                            <Info className="h-4 w-4 ml-1" />
                          </button>
                          
                          {explanationVisible[question.id] && (
                            <div className="mt-2 p-3 bg-purple-900/20 border border-purple-800 rounded-md text-sm">
                              <p className="text-gray-300">{question.explanation}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 p-4 border border-purple-900/30 bg-purple-900/20 rounded-md">
              <div className="flex items-start">
                <HelpCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-purple-400 mb-1">AP Literature Test Taking Tips</h3>
                  <p className="text-sm text-gray-300">
                    When tackling multiple-choice questions on the AP Literature exam, first read the passage carefully, 
                    annotating key literary elements. For each question, eliminate obviously wrong answers before selecting 
                    the best option. Pay attention to tone, narrative perspective, and how literary devices contribute to meaning. 
                    Remember that correct answers are supported directly by the text.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-600"
                onClick={resetSession}
              >
                Practice with a New Passage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 