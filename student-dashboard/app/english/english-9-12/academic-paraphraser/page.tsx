"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  PenSquare, 
  RefreshCw, 
  Copy, 
  Check, 
  BarChart3, 
  Trash2, 
  BookOpen, 
  ChevronsDown, 
  ChevronsUp, 
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface ParaphraseOptions {
  style: "academic" | "simplified" | "creative" | "formal";
  complexity: number; // 1-10
  lengthPreference: "shorter" | "similar" | "longer";
  keepStructure: boolean;
  vocabularyLevel: "basic" | "intermediate" | "advanced";
}

interface ParaphraseResult {
  paraphrasedText: string;
  originalLength: number;
  newLength: number;
  readabilityScore: number;
  academicWordsCount: number;
  changedWordsPercentage: number;
  originalToNew: {[key: string]: string}[];
}

// Simulated list of commonly flagged phrases that could indicate plagiarism
const plagiarismRiskPhrases = [
  "according to",
  "states that",
  "argues that",
  "as mentioned by",
  "in the words of",
  "as explained by",
  "as demonstrated by",
  "established that",
  "emphasizes that",
  "highlights"
];

export default function AcademicParaphraserPage() {
  // Main state variables
  const [originalText, setOriginalText] = useState("");
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [sourceTitle, setSourceTitle] = useState("");
  const [sourceAuthor, setSourceAuthor] = useState("");
  const [isPhrasing, setIsPhrasing] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [activeTab, setActiveTab] = useState("input");
  const [paraphraseStats, setParaphraseStats] = useState<ParaphraseResult | null>(null);

  // Set default paraphrase options
  const [paraphraseOptions, setParaphraseOptions] = useState<ParaphraseOptions>({
    style: "academic",
    complexity: 7,
    lengthPreference: "similar",
    keepStructure: true,
    vocabularyLevel: "advanced"
  });

  // Handle paraphrase options change
  const handleOptionChange = (option: keyof ParaphraseOptions, value: string | number | boolean) => {
    setParaphraseOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  // Reset all fields
  const handleReset = () => {
    setOriginalText("");
    setParaphrasedText("");
    setSourceTitle("");
    setSourceAuthor("");
    setParaphraseStats(null);
    setActiveTab("input");
  };

  // Copy paraphrased text to clipboard
  const handleCopy = () => {
    if (paraphrasedText) {
      navigator.clipboard.writeText(paraphrasedText);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  // Generate mock paraphrase results for development
  const generateMockParaphrase = (): ParaphraseResult => {
    // Generate a sophisticated academic paraphrase of the original text
    let result = "";
    const words = originalText.split(/\s+/);
    
    if (paraphraseOptions.style === "academic") {
      result = "The research indicates that the phenomenon in question demonstrates significant implications for understanding the underlying mechanisms. Various scholars have postulated theoretical frameworks that encompass multifaceted dimensions of this complex subject matter. It is imperative to acknowledge the nuanced interplay between contributing factors.";
    } else if (paraphraseOptions.style === "simplified") {
      result = "Research shows that this topic has important effects that help us understand how it works. Many researchers have created theories about the different parts of this complicated subject. We need to recognize how various factors work together in subtle ways.";
    } else if (paraphraseOptions.style === "formal") {
      result = "Evidence suggests that the aforementioned phenomenon exhibits considerable ramifications for comprehending the fundamental mechanisms. Numerous scholars have proposed theoretical constructs that incorporate multidimensional aspects of this intricate subject. One must recognize the subtle interaction among contributing elements.";
    } else { // creative
      result = "This fascinating topic opens doors to understanding deeper workings, with thought leaders crafting innovative frameworks that capture its richness and complexity. The beautiful dance between different factors creates a tapestry of understanding that rewards careful study.";
    }
    
    if (words.length > 50) {
      result += " Furthermore, the empirical evidence substantiates the assertion that methodological approaches necessitate careful consideration. The implications extend beyond immediate applications to encompass broader theoretical paradigms.";
    }

    // Generate mock statistics based on the paraphrase options
    const originalLength = originalText.length;
    const newLength = result.length;
    const readabilityScore = 70 + (paraphraseOptions.complexity * 1.5);
    const academicWordsCount = Math.floor(result.split(/\s+/).length * 0.4);
    const changedWordsPercentage = 65 + (Math.random() * 20);

    // Mock word changes with correct typing
    const originalToNew: {[key: string]: string}[] = [
      {"shows": "demonstrates"},
      {"important": "significant"},
      {"effects": "implications"},
      {"parts": "dimensions"},
      {"complicated": "complex"}
    ];

    return {
      paraphrasedText: result,
      originalLength,
      newLength,
      readabilityScore: Math.min(100, readabilityScore),
      academicWordsCount,
      changedWordsPercentage,
      originalToNew
    };
  };

  // Handle paraphrase action
  const handleParaphrase = async () => {
    if (!originalText.trim()) return;
    
    setIsPhrasing(true);
    setActiveTab("result");
    
    try {
      // Use mock data for development/testing
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const mockResults = generateMockParaphrase();
        setParaphrasedText(mockResults.paraphrasedText);
        setParaphraseStats(mockResults);
        setIsPhrasing(false);
        return;
      }
      
      // Call the paraphrase API
      const response = await fetch('/api/paraphrase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: originalText,
          sourceTitle,
          sourceAuthor,
          style: paraphraseOptions.style,
          complexity: paraphraseOptions.complexity,
          lengthPreference: paraphraseOptions.lengthPreference,
          keepStructure: paraphraseOptions.keepStructure,
          vocabularyLevel: paraphraseOptions.vocabularyLevel
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to paraphrase text');
      }
      
      const result = await response.json();
      setParaphrasedText(result.paraphrasedText);
      setParaphraseStats(result);
    } catch (error) {
      console.error('Error paraphrasing text:', error);
      // Show an error message to the user
      alert('An error occurred while paraphrasing the text. Please try again.');
    } finally {
      setIsPhrasing(false);
    }
  };

  // Check for potential plagiarism risk phrases
  const checkPlagiarismRisks = (text: string) => {
    return plagiarismRiskPhrases.filter(phrase => 
      text.toLowerCase().includes(phrase.toLowerCase())
    );
  };

  // Get potential plagiarism risks in the paraphrased text
  const plagiarismRisks = paraphrasedText ? checkPlagiarismRisks(paraphrasedText) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-500 w-10 h-10 rounded-md flex items-center justify-center">
            <PenSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Academic Paraphraser</h1>
            <p className="text-gray-400">Rewrite text in academic style while maintaining meaning</p>
          </div>
        </div>
        
        <Link href="/english/english-9-12">
          <Button variant="ghost" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to English Tools
          </Button>
        </Link>
      </div>
      
      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="input">Original Text</TabsTrigger>
          <TabsTrigger value="result" disabled={!paraphrasedText && !isPhrasing}>Paraphrased Result</TabsTrigger>
        </TabsList>
        
        {/* Input Tab */}
        <TabsContent value="input" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Source Text</CardTitle>
              <CardDescription>
                Enter the text you want to paraphrase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="source-title">Source Title (Optional)</Label>
                    <Input 
                      id="source-title" 
                      placeholder="Title of the original work" 
                      value={sourceTitle}
                      onChange={(e) => setSourceTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="source-author">Source Author (Optional)</Label>
                    <Input 
                      id="source-author" 
                      placeholder="Author of the original work" 
                      value={sourceAuthor}
                      onChange={(e) => setSourceAuthor(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="original-text">Text to Paraphrase</Label>
                <Textarea 
                  id="original-text" 
                  placeholder="Paste the text you want to paraphrase here..." 
                  className="min-h-[200px]"
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                />
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>For best results, ensure your text is correctly formatted and punctuated</span>
                  <span>{originalText.length} characters</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Paraphrasing Options</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="h-7 gap-1 text-xs"
                >
                  {showAdvancedOptions ? (
                    <>
                      <ChevronsUp className="h-3.5 w-3.5" />
                      Hide Advanced Options
                    </>
                  ) : (
                    <>
                      <ChevronsDown className="h-3.5 w-3.5" />
                      Show Advanced Options
                    </>
                  )}
                </Button>
              </div>
              <CardDescription>
                Customize how your text will be paraphrased
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm mb-2 block">Paraphrasing Style</Label>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    {[
                      { id: "academic", label: "Academic" },
                      { id: "simplified", label: "Simplified" },
                      { id: "creative", label: "Creative" },
                      { id: "formal", label: "Formal" }
                    ].map((style) => (
                      <div 
                        key={style.id}
                        className={`flex items-center space-x-2 border ${
                          paraphraseOptions.style === style.id ? 'border-indigo-500 bg-indigo-950/20' : 'border-gray-800'
                        } rounded-md p-3 cursor-pointer hover:bg-gray-800`}
                        onClick={() => handleOptionChange('style', style.id as "academic" | "simplified" | "creative" | "formal")}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paraphraseOptions.style === style.id ? 'border-indigo-500' : 'border-gray-600'
                        }`}>
                          {paraphraseOptions.style === style.id && (
                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                          )}
                        </div>
                        <Label className="cursor-pointer">{style.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm">Complexity Level</Label>
                    <span className="text-sm text-indigo-400">{paraphraseOptions.complexity}/10</span>
                  </div>
                  <div className="relative py-4">
                    <div className="h-1.5 bg-gray-800 rounded-full">
                      <div 
                        className="absolute h-1.5 bg-indigo-500 rounded-full" 
                        style={{ width: `${(paraphraseOptions.complexity / 10) * 100}%` }}
                      />
                      <input
                        type="range"
                        min={1}
                        max={10}
                        step={1}
                        value={paraphraseOptions.complexity}
                        onChange={(e) => handleOptionChange('complexity', parseInt(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        aria-label="Complexity Level"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Simpler</span>
                    <span>More Complex</span>
                  </div>
                </div>
              </div>
              
              {showAdvancedOptions && (
                <div className="space-y-4 pt-2 border-t border-gray-800">
                  <div>
                    <Label className="text-sm mb-2 block">Output Length Preference</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {[
                        { id: "shorter", label: "More Concise" },
                        { id: "similar", label: "Similar Length" },
                        { id: "longer", label: "More Detailed" }
                      ].map((length) => (
                        <div 
                          key={length.id}
                          className={`flex items-center space-x-2 border ${
                            paraphraseOptions.lengthPreference === length.id ? 'border-indigo-500 bg-indigo-950/20' : 'border-gray-800'
                          } rounded-md p-2 cursor-pointer hover:bg-gray-800`}
                          onClick={() => handleOptionChange('lengthPreference', length.id as "shorter" | "similar" | "longer")}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            paraphraseOptions.lengthPreference === length.id ? 'border-indigo-500' : 'border-gray-600'
                          }`}>
                            {paraphraseOptions.lengthPreference === length.id && (
                              <div className="w-2 h-2 rounded-full bg-indigo-500" />
                            )}
                          </div>
                          <Label className="cursor-pointer">{length.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className={`w-4 h-4 border rounded-sm cursor-pointer ${
                          paraphraseOptions.keepStructure ? 'bg-indigo-500 border-indigo-600' : 'border-gray-600'
                        }`}
                        onClick={() => handleOptionChange('keepStructure', !paraphraseOptions.keepStructure)}
                      >
                        {paraphraseOptions.keepStructure && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                      <Label className="cursor-pointer" onClick={() => handleOptionChange('keepStructure', !paraphraseOptions.keepStructure)}>
                        Maintain paragraph structure
                      </Label>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">Vocabulary Level</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {[
                        { id: "basic", label: "Basic" },
                        { id: "intermediate", label: "Intermediate" },
                        { id: "advanced", label: "Advanced" }
                      ].map((level) => (
                        <div 
                          key={level.id}
                          className={`flex items-center space-x-2 border ${
                            paraphraseOptions.vocabularyLevel === level.id ? 'border-indigo-500 bg-indigo-950/20' : 'border-gray-800'
                          } rounded-md p-2 cursor-pointer hover:bg-gray-800`}
                          onClick={() => handleOptionChange('vocabularyLevel', level.id as "basic" | "intermediate" | "advanced")}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            paraphraseOptions.vocabularyLevel === level.id ? 'border-indigo-500' : 'border-gray-600'
                          }`}>
                            {paraphraseOptions.vocabularyLevel === level.id && (
                              <div className="w-2 h-2 rounded-full bg-indigo-500" />
                            )}
                          </div>
                          <Label className="cursor-pointer">{level.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-between flex-wrap gap-2">
              <Button 
                variant="outline" 
                onClick={handleReset}
                disabled={!originalText.trim()}
                className="gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Reset
              </Button>
              <Button 
                onClick={handleParaphrase}
                disabled={!originalText.trim() || isPhrasing}
                className="gap-1"
              >
                {isPhrasing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Paraphrasing...
                  </>
                ) : (
                  <>
                    <PenSquare className="h-4 w-4" />
                    Paraphrase Text
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Result Tab */}
        <TabsContent value="result" className="space-y-4">
          {isPhrasing ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PenSquare className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Paraphrasing Text</h3>
                    <p className="text-gray-400 mt-1">Reformulating content in academic style...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : paraphrasedText ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Paraphrased Result</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1" onClick={handleCopy}>
                        {hasCopied ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy Text
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1" onClick={handleReset}>
                        <RefreshCw className="h-4 w-4" />
                        Paraphrase New Text
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Academic rewrite of your original text
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/30">
                      <div className="prose prose-invert max-w-none">
                        <p>{paraphrasedText}</p>
                      </div>
                    </div>
                    
                    {/* Plagiarism Risk Warnings */}
                    {plagiarismRisks.length > 0 && (
                      <div className="bg-yellow-900/20 border border-yellow-900/40 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <HelpCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-yellow-400">Potential Citation Needed</h3>
                            <p className="text-sm text-gray-300 mt-1">
                              The following phrases may indicate content that requires proper citation:
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {plagiarismRisks.map((phrase, index) => (
                                <Badge key={index} variant="outline" className="bg-yellow-950/30 text-yellow-300 border-yellow-700">
                                  &quot;{phrase}&quot;
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Paraphrase Statistics */}
              {paraphraseStats && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-indigo-400" />
                      <CardTitle>Paraphrase Analysis</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-gray-800 rounded-md p-4 bg-gray-900/30">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-400">Readability Score</h3>
                          <span className="text-lg font-bold text-indigo-400">{paraphraseStats.readabilityScore.toFixed(0)}/100</span>
                        </div>
                        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-800">
                          <div
                            className="h-full w-full flex-1 bg-indigo-500 transition-all"
                            style={{ transform: `translateX(-${100 - paraphraseStats.readabilityScore}%)` }}
                          />
                        </div>
                      </div>
                      
                      <div className="border border-gray-800 rounded-md p-4 bg-gray-900/30">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-400">Academic Vocabulary</h3>
                          <span className="text-lg font-bold text-indigo-400">{paraphraseStats.academicWordsCount} words</span>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-1">
                          <span className="text-gray-500">Basic</span>
                          <span className="text-gray-500">Advanced</span>
                        </div>
                      </div>
                      
                      <div className="border border-gray-800 rounded-md p-4 bg-gray-900/30">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-400">Word Change Rate</h3>
                          <span className="text-lg font-bold text-indigo-400">{paraphraseStats.changedWordsPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-800">
                          <div
                            className="h-full w-full flex-1 bg-indigo-500 transition-all"
                            style={{ transform: `translateX(-${100 - paraphraseStats.changedWordsPercentage}%)` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-800 rounded-md p-4 bg-gray-900/30">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Length Comparison</h3>
                        <div className="flex justify-between text-sm">
                          <span>Original: {paraphraseStats.originalLength} characters</span>
                          <span>New: {paraphraseStats.newLength} characters</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="h-2 bg-gray-700 rounded-full flex-1 relative">
                            <div 
                              className="absolute h-2 bg-indigo-500 rounded-full" 
                              style={{
                                width: `${Math.min(100, (paraphraseStats.originalLength / Math.max(paraphraseStats.originalLength, paraphraseStats.newLength)) * 100)}%`
                              }}
                            ></div>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full flex-1 relative">
                            <div 
                              className="absolute h-2 bg-green-500 rounded-full" 
                              style={{
                                width: `${Math.min(100, (paraphraseStats.newLength / Math.max(paraphraseStats.originalLength, paraphraseStats.newLength)) * 100)}%`
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Original</span>
                          <span>Paraphrased</span>
                        </div>
                      </div>
                      
                      <div className="border border-gray-800 rounded-md p-4 bg-gray-900/30">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Word Substitution Examples</h3>
                        <div className="space-y-2 max-h-[100px] overflow-y-auto scrollbar-thin">
                          {paraphraseStats.originalToNew.map((pair, index) => {
                            const originalWord = Object.keys(pair)[0];
                            const newWord = pair[originalWord];
                            return (
                              <div key={index} className="flex items-center text-sm">
                                <span className="text-gray-400">{originalWord}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-2 text-indigo-400">
                                  <path d="M5 12h14"></path>
                                  <path d="m12 5 7 7-7 7"></path>
                                </svg>
                                <span className="text-green-400">{newWord}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : null}
        </TabsContent>
      </Tabs>
      
      {/* Information Card */}
      <Card className="bg-indigo-950/20 border border-indigo-900/40">
        <CardContent className="pt-4">
          <div className="flex items-start space-x-3">
            <BookOpen className="w-5 h-5 text-indigo-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-indigo-400">About Academic Paraphrasing</h3>
              <p className="text-sm text-gray-300 mt-1">
                Academic paraphrasing involves reformulating text while maintaining its original meaning. This tool helps you 
                rewrite content in your own words to avoid plagiarism while using appropriate academic language. Remember to 
                always cite your sources even when paraphrasing, as you&apos;re still using someone else&apos;s ideas. This tool is 
                designed to assist with proper academic writing, not to enable plagiarism.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 