"use client";

import React, { useState } from "react";
import { Sparkles, ArrowLeft, FileText, Palette, Heart, Clock, User, MessageSquare } from "lucide-react";
import Link from "next/link";

interface AnalysisResult {
  themes: {
    primary: string;
    secondary: string[];
    explanation: string;
  };
  tone: {
    primary: string;
    secondary: string[];
    explanation: string;
  };
  structure: {
    type: string;
    explanation: string;
  };
  characters: {
    main: string[];
    secondary: string[];
    analysis: string;
  };
  literary_devices: {
    name: string;
    example: string;
    explanation: string;
  }[];
}

export default function StoryAnalyzerPage() {
  const [story, setStory] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  
  const handleAnalyzeStory = async () => {
    if (!story.trim()) {
      setError("Please enter a story to analyze");
      return;
    }
    
    if (story.split(/\s+/).length < 50) {
      setError("Please enter a longer story (at least 50 words) for better analysis");
      return;
    }
    
    setIsAnalyzing(true);
    setError("");
    setResult(null);
    
    try {
      // Call the API endpoint instead of the direct import
      const response = await fetch('/api/story-analyzer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: story }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze story');
      }
      
      const analysisResult = await response.json();
      setResult(analysisResult);
    } catch (err) {
      console.error("Error analyzing story:", err);
      setError("An error occurred during analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-800 w-10 h-10 rounded-md flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Short Story Analyzer</h1>
            <p className="text-gray-400">Highlights theme, tone, and structure in stories</p>
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
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Paste Your Story</h2>
            </div>
            <div className="card-body space-y-4">
              <textarea
                className="w-full h-64 bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Paste a short story, a chapter, or a passage that you'd like to analyze..."
                value={story}
                onChange={(e) => {
                  setStory(e.target.value);
                  setResult(null);
                  setError("");
                }}
                aria-label="Story text input"
              ></textarea>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  {story.split(/\s+/).filter(Boolean).length} words
                </div>
                <button
                  className="btn-primary bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleAnalyzeStory}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Story"}
                </button>
              </div>
              
              {error && (
                <div className="bg-red-900/30 border border-red-700 text-red-200 p-3 rounded-md">
                  {error}
                </div>
              )}
            </div>
          </div>
          
          {/* Analysis Results */}
          {result && (
            <div className="space-y-6">
              {/* Themes */}
              <div className="card">
                <div className="card-header flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <h2 className="text-lg font-semibold">Themes</h2>
                </div>
                <div className="card-body space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 bg-pink-900/50 text-pink-300 rounded-full text-sm font-medium">
                      {result.themes.primary}
                    </div>
                    {result.themes.secondary.map((theme, index) => (
                      <div key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                        {theme}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-300">{result.themes.explanation}</p>
                </div>
              </div>
              
              {/* Tone */}
              <div className="card">
                <div className="card-header flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-purple-500" />
                  <h2 className="text-lg font-semibold">Tone & Mood</h2>
                </div>
                <div className="card-body space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm font-medium">
                      {result.tone.primary}
                    </div>
                    {result.tone.secondary.map((tone, index) => (
                      <div key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                        {tone}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-300">{result.tone.explanation}</p>
                </div>
              </div>
              
              {/* Structure */}
              <div className="card">
                <div className="card-header flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <h2 className="text-lg font-semibold">Structure & Style</h2>
                </div>
                <div className="card-body">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium">
                      {result.structure.type}
                    </div>
                  </div>
                  <p className="text-gray-300">{result.structure.explanation}</p>
                </div>
              </div>
              
              {/* Characters */}
              <div className="card">
                <div className="card-header flex items-center space-x-2">
                  <User className="w-5 h-5 text-green-500" />
                  <h2 className="text-lg font-semibold">Characters</h2>
                </div>
                <div className="card-body space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Main Characters</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.characters.main.map((character, index) => (
                        <div key={index} className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-sm">
                          {character}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {result.characters.secondary.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Secondary Characters</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.characters.secondary.map((character, index) => (
                          <div key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                            {character}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <p className="text-gray-300 mt-2">{result.characters.analysis}</p>
                </div>
              </div>
              
              {/* Literary Devices */}
              <div className="card">
                <div className="card-header flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-lg font-semibold">Literary Devices</h2>
                </div>
                <div className="card-body p-0">
                  <div className="divide-y divide-gray-700">
                    {result.literary_devices.map((device, index) => (
                      <div key={index} className="p-4">
                        <h3 className="font-medium text-yellow-400 mb-1">{device.name}</h3>
                        <div className="text-gray-300 text-sm mb-2">{device.explanation}</div>
                        <div className="bg-gray-800 p-3 rounded-md text-sm italic text-gray-300">
                          "{device.example}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right sidebar */}
        <div className="space-y-4">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">How It Works</h2>
            </div>
            <div className="card-body space-y-3 text-sm text-gray-300">
              <p>
                This tool analyzes short stories and literary passages to identify key elements:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Heart className="w-4 h-4 text-pink-500 mr-2 mt-0.5" />
                  <span><strong className="text-pink-400">Themes</strong> - Identifies central ideas and messages</span>
                </li>
                <li className="flex items-start">
                  <Palette className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                  <span><strong className="text-purple-400">Tone & Mood</strong> - Detects emotional atmosphere</span>
                </li>
                <li className="flex items-start">
                  <FileText className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                  <span><strong className="text-blue-400">Structure</strong> - Analyzes narrative organization</span>
                </li>
                <li className="flex items-start">
                  <User className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span><strong className="text-green-400">Characters</strong> - Identifies key figures and roles</span>
                </li>
                <li className="flex items-start">
                  <MessageSquare className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                  <span><strong className="text-yellow-400">Literary Devices</strong> - Spots techniques like metaphor, symbolism</span>
                </li>
              </ul>
              <p className="text-xs text-gray-400 mt-4">
                For best results, paste complete stories or substantial passages with at least 100 words.
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Tips for Analysis</h2>
            </div>
            <div className="card-body text-sm space-y-2">
              <p className="text-gray-300">
                When analyzing literature, consider these questions:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• What central ideas does the author explore?</li>
                <li>• How does the author's word choice affect the mood?</li>
                <li>• What symbols or motifs appear repeatedly?</li>
                <li>• How do characters change throughout the story?</li>
                <li>• What conflicts drive the narrative?</li>
                <li>• How does the story's structure contribute to its meaning?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 