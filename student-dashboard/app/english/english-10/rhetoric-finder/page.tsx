"use client";

import React, { useState } from "react";
import { MessageSquare, ArrowLeft, Send, FileUp, BarChart2, Brain, Heart, Scale, Sparkles, Info } from "lucide-react";
import Link from "next/link";

interface RhetoricResult {
  ethos: DeviceInstance[];
  pathos: DeviceInstance[];
  logos: DeviceInstance[];
  otherDevices: DeviceInstance[];
  summary: {
    ethosScore: number;
    pathosScore: number;
    logosScore: number;
    primaryAppeal: string;
    suggestions: string[];
  };
}

interface DeviceInstance {
  type: string;
  name: string;
  text: string;
  explanation: string;
  impact: string;
}

export default function RhetoricFinderPage() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<RhetoricResult | null>(null);
  const [error, setError] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [viewTab, setViewTab] = useState<'all' | 'ethos' | 'pathos' | 'logos' | 'other'>('all');
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadedFile(file);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setText(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };
  
  const handleAnalyze = () => {
    if (!text.trim()) {
      setError("Please enter or upload text to analyze");
      return;
    }
    
    if (text.split(/\s+/).length < 20) {
      setError("Please enter a longer passage (at least 20 words) for better analysis");
      return;
    }
    
    setIsAnalyzing(true);
    setError("");
    
    // In a real application, this would be an API call to analyze the text
    // For now, we'll simulate a response with example data
    setTimeout(() => {
      setResult(getExampleResult());
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const getExampleResult = (): RhetoricResult => {
    return {
      ethos: [
        {
          type: "ethos",
          name: "Appeal to Authority",
          text: "As Dr. Smith, a leading researcher in climate science, has demonstrated...",
          explanation: "References a credible expert to establish authority on the topic.",
          impact: "Builds credibility by associating arguments with respected expertise."
        },
        {
          type: "ethos",
          name: "Establishment of Credibility",
          text: "Having worked in this industry for over twenty years, I've seen firsthand...",
          explanation: "Establishes personal experience and expertise in the subject matter.",
          impact: "Positions the speaker as knowledgeable and trustworthy on the topic."
        }
      ],
      pathos: [
        {
          type: "pathos",
          name: "Emotional Anecdote",
          text: "Imagine a child going to bed hungry every night, unable to focus in school the next day...",
          explanation: "Uses a vivid description of suffering to evoke empathy.",
          impact: "Creates emotional connection and moral urgency around the issue."
        },
        {
          type: "pathos",
          name: "Vivid Imagery",
          text: "The desolate landscape, once teeming with life, now stands barren and scorched...",
          explanation: "Uses descriptive language to create a mental image that evokes emotion.",
          impact: "Helps audience visualize and emotionally connect with environmental destruction."
        }
      ],
      logos: [
        {
          type: "logos",
          name: "Statistical Evidence",
          text: "Research shows that 85% of students who participated in the program showed improved test scores...",
          explanation: "Presents numerical data to support the argument.",
          impact: "Provides concrete evidence that appears objective and measurable."
        },
        {
          type: "logos",
          name: "Causal Reasoning",
          text: "Because water expands when it freezes, pipes can burst during cold weather if not properly insulated.",
          explanation: "Demonstrates cause and effect relationship based on scientific principle.",
          impact: "Builds logical foundation for the argument based on established facts."
        }
      ],
      otherDevices: [
        {
          type: "other",
          name: "Metaphor",
          text: "The tax code is a maze that traps ordinary citizens while allowing the wealthy to find easy exits.",
          explanation: "Compares tax laws to a confusing maze with different paths for different people.",
          impact: "Simplifies a complex concept and frames it in a way that supports the argument."
        },
        {
          type: "other",
          name: "Repetition",
          text: "We must act now. Now, before it's too late. Now, while we still have a chance.",
          explanation: "Repeats the word 'now' to emphasize urgency.",
          impact: "Creates rhythm and emphasizes the critical timing of the proposed action."
        }
      ],
      summary: {
        ethosScore: 25,
        pathosScore: 45,
        logosScore: 30,
        primaryAppeal: "pathos",
        suggestions: [
          "Consider adding more statistical evidence to strengthen logos appeal",
          "Include more expert citations to enhance ethos",
          "Balance emotional appeals with logical reasoning for a more rounded argument"
        ]
      }
    };
  };
  
  const getAppealsData = () => {
    if (!result) return [];
    
    return [
      { name: "Ethos", value: result.summary.ethosScore, color: "bg-blue-400" },
      { name: "Pathos", value: result.summary.pathosScore, color: "bg-red-400" },
      { name: "Logos", value: result.summary.logosScore, color: "bg-green-400" }
    ];
  };
  
  const getIconForType = (type: string) => {
    switch (type) {
      case 'ethos':
        return <Brain className="h-5 w-5 text-blue-400" />;
      case 'pathos':
        return <Heart className="h-5 w-5 text-red-400" />;
      case 'logos':
        return <Scale className="h-5 w-5 text-green-400" />;
      default:
        return <Sparkles className="h-5 w-5 text-purple-400" />;
    }
  };
  
  const getColorForType = (type: string) => {
    switch (type) {
      case 'ethos':
        return "border-blue-600 bg-blue-900/20";
      case 'pathos':
        return "border-red-600 bg-red-900/20";
      case 'logos':
        return "border-green-600 bg-green-900/20";
      default:
        return "border-purple-600 bg-purple-900/20";
    }
  };
  
  const getDisplayItems = () => {
    if (!result) return [];
    
    switch (viewTab) {
      case 'ethos':
        return result.ethos;
      case 'pathos':
        return result.pathos;
      case 'logos':
        return result.logos;
      case 'other':
        return result.otherDevices;
      case 'all':
      default:
        return [
          ...result.ethos,
          ...result.pathos,
          ...result.logos,
          ...result.otherDevices
        ];
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-700 w-10 h-10 rounded-md flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Rhetoric Device Finder</h1>
            <p className="text-gray-400">Analyze text for ethos, pathos, and logos appeals</p>
          </div>
        </div>
        <Link 
          href="/english/english-10"
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to English 10
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Enter Text for Analysis</h2>
            </div>
            <div className="card-body space-y-4">
              <textarea
                className="w-full h-64 bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste a speech, essay, or other persuasive text to analyze its rhetorical devices..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              
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
                <div className="text-sm text-gray-400">
                  {text.split(/\s+/).filter(Boolean).length} words
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 flex items-center disabled:opacity-50"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
                  <Send className="h-4 w-4 ml-2" />
                </button>
              </div>
              
              {error && (
                <div className="bg-red-900/30 border border-red-700 text-red-300 p-3 rounded-md">
                  {error}
                </div>
              )}
            </div>
          </div>
          
          {/* Results Section */}
          {result && (
            <div className="card mt-6">
              <div className="card-header">
                <h2 className="text-lg font-semibold">Rhetorical Analysis Results</h2>
              </div>
              <div className="card-body">
                {/* Tabs for different appeal types */}
                <div className="flex border-b border-gray-700 mb-4 overflow-x-auto pb-px">
                  <button
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${viewTab === 'all' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setViewTab('all')}
                  >
                    All Devices ({result.ethos.length + result.pathos.length + result.logos.length + result.otherDevices.length})
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap flex items-center ${viewTab === 'ethos' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setViewTab('ethos')}
                  >
                    <Brain className="h-4 w-4 mr-1" />
                    Ethos ({result.ethos.length})
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap flex items-center ${viewTab === 'pathos' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setViewTab('pathos')}
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    Pathos ({result.pathos.length})
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap flex items-center ${viewTab === 'logos' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setViewTab('logos')}
                  >
                    <Scale className="h-4 w-4 mr-1" />
                    Logos ({result.logos.length})
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap flex items-center ${viewTab === 'other' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setViewTab('other')}
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    Other Devices ({result.otherDevices.length})
                  </button>
                </div>
                
                {/* Distribution Chart */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-200 mb-2">Rhetorical Appeal Distribution</h3>
                  <div className="h-8 bg-gray-800 rounded-md overflow-hidden flex">
                    {getAppealsData().map((item, index) => (
                      <div 
                        key={index} 
                        className={`${item.color} h-full flex items-center justify-center text-xs font-medium text-gray-900`}
                        style={{ width: `${item.value}%` }}
                      >
                        {item.value}%
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-2 space-x-6">
                    {getAppealsData().map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-3 h-3 ${item.color} rounded-sm mr-1`}></div>
                        <span className="text-sm text-gray-300">{item.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-1 text-sm text-gray-400">
                    Primary Appeal: <span className="font-medium text-blue-400 capitalize">{result.summary.primaryAppeal}</span>
                  </div>
                </div>
                
                {/* Devices List */}
                <div className="space-y-4">
                  {getDisplayItems().map((item, index) => (
                    <div 
                      key={index} 
                      className={`border rounded-lg p-4 ${getColorForType(item.type)}`}
                    >
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">
                          {getIconForType(item.type)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-200">{item.name}</h4>
                          <blockquote className="italic text-gray-300 border-l-2 border-gray-600 pl-3 my-2">
                            "{item.text}"
                          </blockquote>
                          <p className="text-sm text-gray-300 mb-1">
                            <span className="font-medium text-gray-400">Explanation:</span> {item.explanation}
                          </p>
                          <p className="text-sm text-gray-300">
                            <span className="font-medium text-gray-400">Rhetorical Impact:</span> {item.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right sidebar */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Rhetorical Appeals Guide</h2>
            </div>
            <div className="card-body space-y-4">
              <div className="border border-blue-600 bg-blue-900/20 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Brain className="h-5 w-5 text-blue-400 mr-1.5" />
                  <h3 className="font-medium text-blue-400">Ethos</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Appeals to the writer's credibility or character. Establishes the writer as knowledgeable, trustworthy, and ethical.
                </p>
                <div className="mt-2">
                  <h4 className="text-xs font-medium text-gray-400 mb-1">Examples:</h4>
                  <ul className="list-disc list-inside text-xs text-gray-300 space-y-0.5">
                    <li>Citing credentials or experience</li>
                    <li>Referencing experts</li>
                    <li>Demonstrating fair-mindedness</li>
                    <li>Using appropriate language and tone</li>
                  </ul>
                </div>
              </div>
              
              <div className="border border-red-600 bg-red-900/20 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Heart className="h-5 w-5 text-red-400 mr-1.5" />
                  <h3 className="font-medium text-red-400">Pathos</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Appeals to emotion. Creates an emotional connection with the audience to persuade them.
                </p>
                <div className="mt-2">
                  <h4 className="text-xs font-medium text-gray-400 mb-1">Examples:</h4>
                  <ul className="list-disc list-inside text-xs text-gray-300 space-y-0.5">
                    <li>Vivid storytelling and imagery</li>
                    <li>Emotional language</li>
                    <li>Personal anecdotes</li>
                    <li>Appeals to values and beliefs</li>
                  </ul>
                </div>
              </div>
              
              <div className="border border-green-600 bg-green-900/20 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Scale className="h-5 w-5 text-green-400 mr-1.5" />
                  <h3 className="font-medium text-green-400">Logos</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Appeals to logic and reason. Uses evidence, facts, and logical reasoning to convince the audience.
                </p>
                <div className="mt-2">
                  <h4 className="text-xs font-medium text-gray-400 mb-1">Examples:</h4>
                  <ul className="list-disc list-inside text-xs text-gray-300 space-y-0.5">
                    <li>Statistics and data</li>
                    <li>Logical reasoning</li>
                    <li>Syllogisms</li>
                    <li>Cause-and-effect analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {result && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold">Suggestions for Improvement</h2>
              </div>
              <div className="card-body">
                <ul className="space-y-2">
                  {result.summary.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start text-gray-300 text-sm">
                      <div className="bg-blue-900/40 text-blue-300 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">{index + 1}</div>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <div className="flex">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-blue-400 mb-1">About This Tool</h3>
                <p className="text-xs text-gray-300">
                  The Rhetoric Device Finder analyzes persuasive texts to identify rhetorical appeals and devices. 
                  Understanding how ethos (credibility), pathos (emotion), and logos (logic) work in a text can 
                  help you both analyze others' persuasive strategies and improve your own persuasive writing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 