"use client";

import React, { useState } from "react";
import { BookText, CheckCircle2, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

const commonErrors = [
  { 
    type: "Run-on sentence", 
    examples: [
      {
        incorrect: "I went to the store I bought some milk.",
        correct: "I went to the store, and I bought some milk.",
        explanation: "Two independent clauses should be joined with a conjunction or separated with proper punctuation."
      }
    ]
  },
  {
    type: "Subject-verb agreement",
    examples: [
      {
        incorrect: "The group of students were talking loudly.",
        correct: "The group of students was talking loudly.",
        explanation: "'Group' is a singular collective noun, so it takes a singular verb."
      }
    ]
  },
  {
    type: "Comma splice",
    examples: [
      {
        incorrect: "It was raining, we stayed inside.",
        correct: "It was raining, so we stayed inside.",
        explanation: "A comma alone cannot join two independent clauses. Use a conjunction, semicolon, or period."
      }
    ]
  },
  {
    type: "Pronoun reference",
    examples: [
      {
        incorrect: "Maria told Susan that she should study more.",
        correct: "Maria told Susan, 'You should study more.'",
        explanation: "Unclear pronoun reference - 'she' could refer to either Maria or Susan."
      }
    ]
  }
];

export default function GrammarFixPage() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setResults(null);
    setError("");
  };

  const handleCheckGrammar = async () => {
    if (!text.trim()) {
      setError("Please enter some text to check.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call the API endpoint
      const response = await fetch('/api/grammar-fix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to check grammar');
      }
      
      const grammarResults = await response.json();
      setResults(grammarResults);
    } catch (err) {
      console.error("Error checking grammar:", err);
      setError("Something went wrong during the grammar check. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-500 w-10 h-10 rounded-md flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Grammar Fix Tool</h1>
            <p className="text-gray-400">Instant grammar feedback with explanations</p>
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
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Enter your text</h2>
            </div>
            <div className="card-body space-y-4">
              <textarea
                className="w-full h-48 bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type or paste your text here to check for grammar errors..."
                value={text}
                onChange={handleTextChange}
              ></textarea>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  {text.length > 0 ? `${text.length} characters` : "Enter your text above"}
                </div>
                <button
                  className="btn-primary bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleCheckGrammar}
                  disabled={loading}
                >
                  {loading ? "Checking..." : "Check Grammar"}
                </button>
              </div>
              
              {error && (
                <div className="bg-red-900/30 border border-red-700 text-red-200 p-3 rounded-md flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Results */}
          {results && (
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 className="text-lg font-semibold">Results</h2>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  results.errorCount === 0 ? "bg-green-900/50 text-green-300" : "bg-yellow-900/50 text-yellow-300"
                }`}>
                  {results.errorCount === 0 
                    ? "No errors found!" 
                    : `${results.errorCount} issue${results.errorCount !== 1 ? 's' : ''} found`}
                </div>
              </div>
              <div className="card-body space-y-4">
                {results.errorCount === 0 ? (
                  <div className="bg-green-900/20 border border-green-900/30 rounded-md p-4 flex items-center">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
                    <p className="text-green-300">Great job! No grammar errors were detected in your text.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {results.errors.map((error: any, idx: number) => (
                      <div key={idx} className="bg-yellow-900/20 border border-yellow-900/30 rounded-md p-4">
                        <div className="font-semibold text-yellow-300">{error.type}</div>
                        <div className="text-sm text-gray-300 mt-1">
                          <span className="text-gray-400">Found in:</span> {error.position}
                        </div>
                        <div className="text-gray-300 mt-2 italic">"{error.text}"</div>
                        <div className="mt-2 text-gray-300">
                          <span className="text-gray-400">Suggestion:</span> {error.suggestion}
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-300 mb-3">Corrected Text:</h3>
                      <div className="bg-gray-800 p-4 rounded-md text-gray-300">
                        {results.correctedText}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Right sidebar */}
        <div className="space-y-4">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Common Grammar Errors</h2>
            </div>
            <div className="card-body p-0">
              <div className="divide-y divide-gray-700">
                {commonErrors.map((error, idx) => (
                  <div key={idx} className="p-4">
                    <h3 className="font-medium text-indigo-400">{error.type}</h3>
                    {error.examples.map((example, exIdx) => (
                      <div key={exIdx} className="mt-2 text-sm">
                        <div className="text-red-400 line-through">{example.incorrect}</div>
                        <div className="text-green-400 mt-1">{example.correct}</div>
                        <div className="text-gray-400 mt-1">{example.explanation}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Tips for Better Writing</h2>
            </div>
            <div className="card-body">
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Read your writing out loud to catch awkward phrasing</li>
                <li>Keep sentences concise and avoid run-ons</li>
                <li>Use active voice when possible</li>
                <li>Double-check for proper punctuation</li>
                <li>Ensure pronouns clearly refer to their antecedents</li>
                <li>Maintain consistent verb tense throughout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 