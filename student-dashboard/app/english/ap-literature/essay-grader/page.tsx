"use client";

import React, { useState } from "react";
import { BarChart4, ArrowLeft, BookText, Target, PenTool, FileText, CircleDashed, Check, AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface EssayGradeResult {
  score: number;
  overview: string;
  thesis: {
    score: number;
    feedback: string;
  };
  evidence: {
    score: number;
    feedback: string;
  };
  analysis: {
    score: number;
    feedback: string;
  };
  organization: {
    score: number;
    feedback: string;
  };
  style: {
    score: number;
    feedback: string;
  };
  specific_suggestions: string[];
}

interface DetectionResult {
  aiProbability: number;
  aiAssessment: string;
  copyrightIssues: {
    detected: boolean;
    explanation: string;
    potentialSources?: string[];
  };
}

export default function EssayGraderPage() {
  const [essay, setEssay] = useState("");
  const [prompt, setPrompt] = useState("");
  const [essayType, setEssayType] = useState<string>("Literary Analysis");
  const [isGrading, setIsGrading] = useState(false);
  const [result, setResult] = useState<EssayGradeResult | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState("");
  const [checkAI, setCheckAI] = useState(true);
  const [checkCopyright, setCheckCopyright] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);
  
  const handleGradeEssay = async () => {
    if (!essay.trim()) {
      setError("Please enter an essay to grade");
      return;
    }
    
    if (essay.split(/\s+/).length < 100) {
      setError("Please enter a longer essay (at least 100 words) for better assessment");
      return;
    }
    
    setIsGrading(true);
    setError("");
    setResult(null);
    setDetectionResult(null);
    
    try {
      // Grade the essay
      const response = await fetch('/api/essay-grader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ essay, prompt, essayType }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to grade essay');
      }
      
      const gradeResult = await response.json();
      setResult(gradeResult);
      
      // If AI or copyright detection is enabled, run those checks
      if (checkAI || checkCopyright) {
        setIsDetecting(true);
        
        const detectionResponse = await fetch('/api/essay-detection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            text: essay, 
            checkAI, 
            checkCopyright 
          }),
        });
        
        if (detectionResponse.ok) {
          const detectionData = await detectionResponse.json();
          setDetectionResult(detectionData);
        }
        
        setIsDetecting(false);
      }
    } catch (err) {
      console.error("Error grading essay:", err);
      setError("An error occurred during grading. Please try again.");
    } finally {
      setIsGrading(false);
    }
  };
  
  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 5) return "text-green-500";
    if (score >= 4) return "text-blue-500";
    if (score >= 3) return "text-yellow-500";
    return "text-red-500";
  };
  
  // Get background color based on score
  const getScoreBgColor = (score: number) => {
    if (score >= 5) return "bg-green-900/30";
    if (score >= 4) return "bg-blue-900/30";
    if (score >= 3) return "bg-yellow-900/30";
    return "bg-red-900/30";
  };

  // Get AI probability display
  const getAIProbabilityDisplay = () => {
    if (!detectionResult) return null;
    
    const prob = detectionResult.aiProbability;
    let color = "text-green-500";
    let bgColor = "bg-green-900/30";
    let icon = <ShieldCheck className="h-5 w-5 mr-2" />;
    
    if (prob > 80) {
      color = "text-red-500";
      bgColor = "bg-red-900/30";
      icon = <ShieldAlert className="h-5 w-5 mr-2" />;
    } else if (prob > 40) {
      color = "text-yellow-500";
      bgColor = "bg-yellow-900/30";
      icon = <AlertTriangle className="h-5 w-5 mr-2" />;
    }
    
    return (
      <div className={`${bgColor} border border-${color.replace('text-', '')}/30 rounded-md p-4 mb-4`}>
        <div className="flex items-center">
          <div className={color}>
            {icon}
          </div>
          <div>
            <h3 className={`font-medium ${color}`}>
              {prob > 80 ? 'High probability of AI-generated content' : 
               prob > 40 ? 'Medium probability of AI-generated content' : 
               'Low probability of AI-generated content'}
            </h3>
            <p className="text-gray-300 mt-1">AI probability: {prob}%</p>
          </div>
        </div>
        <p className="text-gray-300 mt-3">{detectionResult.aiAssessment}</p>
      </div>
    );
  };
  
  // Get copyright issues display
  const getCopyrightDisplay = () => {
    if (!detectionResult) return null;
    
    const { detected, explanation, potentialSources } = detectionResult.copyrightIssues;
    
    if (!detected) {
      return (
        <div className="bg-green-900/30 border border-green-500/30 rounded-md p-4 mb-4">
          <div className="flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
            <h3 className="font-medium text-green-500">No copyright issues detected</h3>
          </div>
          <p className="text-gray-300 mt-2">{explanation}</p>
        </div>
      );
    }
    
    return (
      <div className="bg-red-900/30 border border-red-500/30 rounded-md p-4 mb-4">
        <div className="flex items-center">
          <ShieldAlert className="h-5 w-5 mr-2 text-red-500" />
          <h3 className="font-medium text-red-500">Potential copyright issues detected</h3>
        </div>
        <p className="text-gray-300 mt-2">{explanation}</p>
        
        {potentialSources && potentialSources.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-300 mb-1">Potential sources:</h4>
            <ul className="list-disc pl-5 text-gray-400 text-sm">
              {potentialSources.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-900 w-10 h-10 rounded-md flex items-center justify-center">
            <BarChart4 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Essay Rubric Grader</h1>
            <p className="text-gray-400">Score essays on College Board's 6-point rubric</p>
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Paste Your Essay</h2>
            </div>
            <div className="card-body space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="essayType" className="block text-sm font-medium text-gray-300 mb-2">
                    Essay Type
                  </label>
                  <select
                    id="essayType"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={essayType}
                    onChange={(e) => setEssayType(e.target.value)}
                  >
                    <option value="Literary Analysis">Literary Analysis</option>
                    <option value="Poetry Analysis">Poetry Analysis</option>
                    <option value="Prose Fiction Analysis">Prose Fiction Analysis</option>
                    <option value="Open Question Response">Open Question Response</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                    Essay Prompt (Optional)
                  </label>
                  <input
                    type="text"
                    id="prompt"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter the essay prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
              </div>
              
              <textarea
                className="w-full h-64 bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Paste your essay here for evaluation..."
                value={essay}
                onChange={(e) => {
                  setEssay(e.target.value);
                  setResult(null);
                  setDetectionResult(null);
                  setError("");
                }}
                aria-label="Essay text input"
              ></textarea>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <div className="text-sm text-gray-400">
                  {essay.split(/\s+/).filter(Boolean).length} words
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="check-ai"
                      className="rounded bg-gray-700 border-gray-500 text-purple-600 focus:ring-purple-500"
                      checked={checkAI}
                      onChange={(e) => setCheckAI(e.target.checked)}
                    />
                    <label htmlFor="check-ai" className="text-sm text-gray-300">
                      Check for AI content
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="check-copyright"
                      className="rounded bg-gray-700 border-gray-500 text-purple-600 focus:ring-purple-500"
                      checked={checkCopyright}
                      onChange={(e) => setCheckCopyright(e.target.checked)}
                    />
                    <label htmlFor="check-copyright" className="text-sm text-gray-300">
                      Check for copyright issues
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  className="btn-primary bg-purple-600 hover:bg-purple-700"
                  onClick={handleGradeEssay}
                  disabled={isGrading || isDetecting}
                >
                  {isGrading ? "Grading..." : isDetecting ? "Running checks..." : "Grade Essay"}
                </button>
              </div>
              
              {error && (
                <div className="bg-red-900/30 border border-red-700 text-red-200 p-3 rounded-md">
                  {error}
                </div>
              )}
            </div>
          </div>
          
          {/* Detection Results */}
          {detectionResult && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold">Content Authenticity Check</h2>
              </div>
              <div className="card-body space-y-3">
                {checkAI && getAIProbabilityDisplay()}
                {checkCopyright && getCopyrightDisplay()}
              </div>
            </div>
          )}
          
          {/* Grading Results */}
          {result && (
            <div className="card">
              <div className="card-header flex items-center justify-between">
                <h2 className="text-lg font-semibold">AP Literature Essay Score</h2>
                <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}/6
                </div>
              </div>
              <div className="card-body space-y-5">
                {/* Overview */}
                <div className={`${getScoreBgColor(result.score)} border border-${getScoreColor(result.score).replace('text-', '')}/30 rounded-md p-4`}>
                  <p className="text-gray-200">{result.overview}</p>
                </div>
                
                {/* Criteria Scores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="card bg-gray-800">
                    <div className="card-header flex items-center space-x-2 py-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <h3 className="text-sm font-medium">Thesis</h3>
                      <div className={`ml-auto ${getScoreColor(result.thesis.score)}`}>{result.thesis.score}/6</div>
                    </div>
                    <div className="p-3 text-sm text-gray-300">
                      {result.thesis.feedback}
                    </div>
                  </div>
                  
                  <div className="card bg-gray-800">
                    <div className="card-header flex items-center space-x-2 py-2">
                      <BookText className="w-4 h-4 text-purple-400" />
                      <h3 className="text-sm font-medium">Evidence</h3>
                      <div className={`ml-auto ${getScoreColor(result.evidence.score)}`}>{result.evidence.score}/6</div>
                    </div>
                    <div className="p-3 text-sm text-gray-300">
                      {result.evidence.feedback}
                    </div>
                  </div>
                  
                  <div className="card bg-gray-800">
                    <div className="card-header flex items-center space-x-2 py-2">
                      <PenTool className="w-4 h-4 text-purple-400" />
                      <h3 className="text-sm font-medium">Analysis</h3>
                      <div className={`ml-auto ${getScoreColor(result.analysis.score)}`}>{result.analysis.score}/6</div>
                    </div>
                    <div className="p-3 text-sm text-gray-300">
                      {result.analysis.feedback}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card bg-gray-800">
                    <div className="card-header flex items-center space-x-2 py-2">
                      <FileText className="w-4 h-4 text-purple-400" />
                      <h3 className="text-sm font-medium">Organization</h3>
                      <div className={`ml-auto ${getScoreColor(result.organization.score)}`}>{result.organization.score}/6</div>
                    </div>
                    <div className="p-3 text-sm text-gray-300">
                      {result.organization.feedback}
                    </div>
                  </div>
                  
                  <div className="card bg-gray-800">
                    <div className="card-header flex items-center space-x-2 py-2">
                      <CircleDashed className="w-4 h-4 text-purple-400" />
                      <h3 className="text-sm font-medium">Style & Mechanics</h3>
                      <div className={`ml-auto ${getScoreColor(result.style.score)}`}>{result.style.score}/6</div>
                    </div>
                    <div className="p-3 text-sm text-gray-300">
                      {result.style.feedback}
                    </div>
                  </div>
                </div>
                
                {/* Specific Suggestions */}
                <div>
                  <h3 className="text-md font-medium text-purple-400 mb-2">Suggestions for Improvement</h3>
                  <ul className="space-y-2">
                    {result.specific_suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start text-gray-300 text-sm">
                        <span className="bg-purple-900/40 text-purple-300 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">{index + 1}</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right sidebar */}
        <div className="space-y-4">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">AP Essay Scoring Guide</h2>
            </div>
            <div className="card-body p-0">
              <div className="divide-y divide-gray-700">
                <div className="p-3">
                  <h3 className="font-medium text-green-500 text-sm">Score 6 (Superior)</h3>
                  <p className="text-xs text-gray-300 mt-1">Specific, insightful analysis with sophisticated understanding. May have minor flaws but demonstrates advanced literary analysis skills.</p>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-green-500 text-sm">Score 5 (Strong)</h3>
                  <p className="text-xs text-gray-300 mt-1">Clear analysis with precise interpretation. Less thorough than a 6 but demonstrates strong understanding of literary elements.</p>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-blue-500 text-sm">Score 4 (Adequate)</h3>
                  <p className="text-xs text-gray-300 mt-1">Competent analysis that goes beyond summary. Less convincing or thorough than higher scores but shows solid comprehension.</p>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-yellow-500 text-sm">Score 3 (Developing)</h3>
                  <p className="text-xs text-gray-300 mt-1">Basic understanding but simplistic or uneven development. May contain analysis that is unclear or incomplete.</p>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-red-500 text-sm">Score 2 (Minimal)</h3>
                  <p className="text-xs text-gray-300 mt-1">Limited success addressing the task. Analysis may be unconvincing, irrelevant, or rely too heavily on plot summary.</p>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-red-500 text-sm">Score 1 (Inadequate)</h3>
                  <p className="text-xs text-gray-300 mt-1">Minimal understanding of the prompt or text. Significant weaknesses in writing and analysis.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Academic Integrity</h2>
            </div>
            <div className="card-body space-y-3 text-sm text-gray-300">
              <p>
                The Essay Rubric Grader now includes:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ShieldCheck className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                  <span><strong className="text-purple-400">AI Detection</strong> - Analyzes text for patterns consistent with AI generation</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                  <span><strong className="text-purple-400">Copyright Check</strong> - Identifies potential plagiarism or copyright issues</span>
                </li>
              </ul>
              <p className="text-xs text-gray-400 mt-2">
                Note: These tools help identify potential issues but are not perfect. Always verify results and use them as guidance rather than definitive proof.
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Tips for Better Essays</h2>
            </div>
            <div className="card-body space-y-3 text-sm text-gray-300">
              <p>
                To score higher on your AP Literature essays:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                  <span><strong className="text-purple-400">Thesis</strong> - Make it specific, debatable, and insightful</span>
                </li>
                <li className="flex items-start">
                  <BookText className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                  <span><strong className="text-purple-400">Evidence</strong> - Use specific quotes and details</span>
                </li>
                <li className="flex items-start">
                  <PenTool className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                  <span><strong className="text-purple-400">Analysis</strong> - Explain how evidence supports your thesis</span>
                </li>
                <li className="flex items-start">
                  <FileText className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                  <span><strong className="text-purple-400">Organization</strong> - Use logical progression with clear paragraphs</span>
                </li>
                <li className="flex items-start">
                  <CircleDashed className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                  <span><strong className="text-purple-400">Style</strong> - Use sophisticated vocabulary and varied syntax</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 