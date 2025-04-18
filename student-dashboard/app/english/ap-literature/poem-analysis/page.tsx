"use client";

import React, { useState } from "react";
import { Sparkles, ArrowLeft, Palette, BookOpen, GanttChart, BookText, MessageSquare, Send, FileUp, Undo, Bookmark, ArrowDown, Download } from "lucide-react";
import Link from "next/link";

interface AnalysisResult {
  tone: string;
  theme: string;
  literaryDevices: {
    name: string;
    examples: string[];
    explanation: string;
  }[];
  structure: string;
  meaning: string;
  speakerVoice: string;
  historicalContext?: string;
}

// Example analysis response
const exampleResponse: AnalysisResult = {
  tone: "Melancholic, reflective, and contemplative",
  theme: "The fleeting nature of beauty and youth; mortality and the passage of time",
  literaryDevices: [
    {
      name: "Metaphor",
      examples: ["Thou art the grave where buried love doth live"],
      explanation: "The poet compares the youth to a grave that paradoxically preserves love's memory"
    },
    {
      name: "Personification",
      examples: ["Time's fell hand", "Summers' honey breath", "Winter's ragged hand"],
      explanation: "Time, summer, and winter are given human attributes to emphasize their effects"
    },
    {
      name: "Imagery",
      examples: ["thy eternal summer shall not fade", "summer's honey breath"],
      explanation: "Vivid natural imagery used to contrast beauty against decay"
    }
  ],
  structure: "Shakespearean sonnet with an ABABCDCDEFEFGG rhyme scheme. The volta (turn) occurs at line 9.",
  meaning: "The sonnet explores how poetry can immortalize beauty and love, defying time's destructive power. The speaker promises that through verse, the subject's beauty will be eternalized.",
  speakerVoice: "Admiring, devoted, determined to preserve the subject's beauty through poetry"
};

export default function PoemAnalysisPage() {
  const [poemText, setPoemText] = useState('');
  const [poemTitle, setPoemTitle] = useState('');
  const [poemAuthor, setPoemAuthor] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showExample, setShowExample] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadedFile(file);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPoemText(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const handleAnalyze = () => {
    if (!poemText.trim()) {
      setError('Please enter or upload a poem to analyze');
      return;
    }
    
    setError('');
    setIsAnalyzing(true);
    
    // In a real application, this would be an API call to an AI service
    // For now, we'll simulate with a timeout and return the example result
    setTimeout(() => {
      setResult(exampleResponse);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setResult(null);
    setError('');
  };
  
  const downloadAnalysis = () => {
    if (!result) return;
    
    const analysisText = `
# Analysis of "${poemTitle || 'Untitled'}" ${poemAuthor ? `by ${poemAuthor}` : ''}

## Tone
${result.tone}

## Theme
${result.theme}

## Literary Devices
${result.literaryDevices.map(device => (
  `### ${device.name}
Examples: ${device.examples.join('; ')}
Explanation: ${device.explanation}
`)).join('\n')}

## Structure
${result.structure}

## Speaker/Voice
${result.speakerVoice}

## Meaning
${result.meaning}

${result.historicalContext ? `## Historical Context\n${result.historicalContext}` : ''}

## Original Poem
${poemText}
`;

    const blob = new Blob([analysisText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${poemTitle || 'poem'}-analysis.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-600 w-10 h-10 rounded-md flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Poem Analysis AI</h1>
            <p className="text-gray-400">Analyze poetry for AP Literature-level insights</p>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b px-4 py-3 bg-gray-50">
            <h2 className="font-medium">Input Poem</h2>
          </div>
          
          <div className="p-4">
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poem Title (optional)</label>
                <input 
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={poemTitle}
                  onChange={(e) => setPoemTitle(e.target.value)}
                  placeholder="Title of the poem"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author (optional)</label>
                <input 
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={poemAuthor}
                  onChange={(e) => setPoemAuthor(e.target.value)}
                  placeholder="Author of the poem"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Poem Text</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={12}
                value={poemText}
                onChange={(e) => setPoemText(e.target.value)}
                placeholder="Paste the poem text here..."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Or upload a text file</label>
              <div className="flex items-center">
                <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
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
                className="text-sm text-blue-600 hover:underline flex items-center"
                onClick={() => setShowExample(!showExample)}
              >
                {showExample ? 'Hide' : 'Show'} example poem
                <ArrowDown className={`h-4 w-4 ml-1 transition-transform ${showExample ? 'rotate-180' : ''}`} />
              </button>
              
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Poem'}
                <Send className="h-4 w-4 ml-2" />
              </button>
            </div>
            
            {showExample && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm border">
                <p className="font-medium mb-2">Sonnet 18 by William Shakespeare</p>
                <pre className="whitespace-pre-wrap font-sans text-gray-700">
                  {`Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date:
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm'd;
And every fair from fair sometime declines,
By chance, or nature's changing course, untrimm'd;
But thy eternal summer shall not fade
Nor lose possession of that fair thou ow'st;
Nor shall Death brag thou wander'st in his shade,
When in eternal lines to time thou grow'st;
So long as men can breathe or eyes can see,
So long lives this, and this gives life to thee.`}
                </pre>
                <button 
                  className="mt-2 text-blue-600 hover:underline text-sm"
                  onClick={() => {
                    setPoemText(`Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date:
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm'd;
And every fair from fair sometime declines,
By chance, or nature's changing course, untrimm'd;
But thy eternal summer shall not fade
Nor lose possession of that fair thou ow'st;
Nor shall Death brag thou wander'st in his shade,
When in eternal lines to time thou grow'st;
So long as men can breathe or eyes can see,
So long lives this, and this gives life to thee.`);
                    setPoemTitle("Sonnet 18");
                    setPoemAuthor("William Shakespeare");
                    setShowExample(false);
                  }}
                >
                  Use this example
                </button>
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b px-4 py-3 bg-gray-50 flex justify-between items-center">
            <h2 className="font-medium">Analysis Results</h2>
            {result && (
              <div className="flex space-x-2">
                <button 
                  className="text-gray-600 hover:text-gray-800"
                  onClick={resetAnalysis}
                  title="Start over"
                >
                  <Undo className="h-4 w-4" />
                </button>
                <button 
                  className="text-gray-600 hover:text-gray-800"
                  onClick={downloadAnalysis}
                  title="Download analysis"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="p-4">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Analyzing poem...</p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Bookmark className="h-4 w-4 mr-1 text-blue-600" />
                    Tone
                  </h3>
                  <p className="text-gray-800">{result.tone}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Bookmark className="h-4 w-4 mr-1 text-blue-600" />
                    Theme
                  </h3>
                  <p className="text-gray-800">{result.theme}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Bookmark className="h-4 w-4 mr-1 text-blue-600" />
                    Literary Devices
                  </h3>
                  <div className="space-y-3 mt-2">
                    {result.literaryDevices.map((device, index) => (
                      <div key={index} className="pl-3 border-l-2 border-blue-100">
                        <h4 className="font-medium text-blue-700">{device.name}</h4>
                        <div className="mt-1 text-sm">
                          <p className="text-gray-700"><span className="font-medium">Examples:</span> {device.examples.join('; ')}</p>
                          <p className="text-gray-700"><span className="font-medium">Explanation:</span> {device.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Bookmark className="h-4 w-4 mr-1 text-blue-600" />
                    Structure
                  </h3>
                  <p className="text-gray-800">{result.structure}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Bookmark className="h-4 w-4 mr-1 text-blue-600" />
                    Speaker/Voice
                  </h3>
                  <p className="text-gray-800">{result.speakerVoice}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-blue-600" />
                    Meaning
                  </h3>
                  <p className="text-gray-800">{result.meaning}</p>
                </div>
                
                {result.historicalContext && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Bookmark className="h-4 w-4 mr-1 text-blue-600" />
                      Historical Context
                    </h3>
                    <p className="text-gray-800">{result.historicalContext}</p>
                  </div>
                )}
                
                <div className="bg-blue-50 p-3 rounded-md mt-6">
                  <h3 className="text-sm font-medium text-blue-700 mb-2">AP Literature Connection</h3>
                  <p className="text-sm text-gray-700">
                    Use these insights to analyze the poem's complexity, considering how form and content work together to create meaning. When writing your AP Literature essay, focus on how the identified literary devices contribute to the overall theme and tone.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Enter a poem and click "Analyze" to see detailed analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 