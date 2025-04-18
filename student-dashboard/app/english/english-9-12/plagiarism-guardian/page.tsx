"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  FileCheck, 
  Send, 
  AlertTriangle, 
  Copy, 
  ExternalLink, 
  Book, 
  Shield, 
  Check, 
  X,
  Undo2,
  RotateCcw,
  RefreshCw,
  FileText,
  Lightbulb,
  Quote
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Types for our plagiarism check
interface MatchSource {
  title: string;
  url: string;
  matchedText: string;
  similarity: number;
  publicationDate?: string;
  author?: string;
}

interface PlagiarismMatch {
  text: string;
  startIndex: number;
  endIndex: number;
  similarity: number;
  sources: MatchSource[];
}

interface PlagiarismResult {
  originalityScore: number;
  matches: PlagiarismMatch[];
  citationSuggestions: CitationSuggestion[];
  scannedWords: number;
  matchedWords: number;
}

interface CitationSuggestion {
  source: MatchSource;
  mlaFormat: string;
  apaFormat: string;
  chicagoFormat: string;
}

export default function PlagiarismGuardianPage() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<PlagiarismResult | null>(null);
  const [activeTab, setActiveTab] = useState("scanner");
  const [citationFormat, setCitationFormat] = useState("mla");
  const [highlightedText, setHighlightedText] = useState<PlagiarismMatch | null>(null);

  // Function to handle text submission for plagiarism check
  const handleScanForPlagiarism = () => {
    if (!text.trim()) return;
    
    setIsScanning(true);
    
    // In a real application, this would be an API call
    // For now, we'll simulate a response with mock data
    setTimeout(() => {
      setScanResult(generateMockResult());
      setActiveTab("results");
      setIsScanning(false);
    }, 3000);
  };

  // Generate mock plagiarism check results
  const generateMockResult = (): PlagiarismResult => {
    const originalityScore = Math.floor(Math.random() * 30) + 70; // 70-99
    const wordCount = text.split(/\s+/).length;
    const matchedWords = Math.floor(wordCount * (1 - originalityScore / 100));
    
    // Create some mock plagiarism matches
    const matches: PlagiarismMatch[] = [];
    
    // Generate 3-5 random plagiarism matches
    const matchCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < matchCount; i++) {
      // Find a random segment of text to mark as plagiarized
      const words = text.split(/\s+/);
      const startWordIndex = Math.floor(Math.random() * Math.max(1, words.length - 20));
      const matchLength = Math.floor(Math.random() * 10) + 5; // 5-15 words
      const endWordIndex = Math.min(startWordIndex + matchLength, words.length);
      
      const matchedTextArray = words.slice(startWordIndex, endWordIndex);
      const matchedText = matchedTextArray.join(" ");
      
      // Calculate start and end indices in the original text
      const startIndex = text.indexOf(matchedTextArray[0], startWordIndex);
      const endIndex = startIndex + matchedText.length;
      
      // Generate a random similarity score for this match
      const similarity = Math.floor(Math.random() * 40) + 60; // 60-99%
      
      // Create mock sources for this match
      const sources: MatchSource[] = [
        {
          title: getRandomSourceTitle(),
          url: getRandomSourceUrl(),
          matchedText: matchedText,
          similarity: similarity,
          publicationDate: getRandomDate(),
          author: getRandomAuthor()
        }
      ];
      
      // Add a second source for some matches
      if (Math.random() > 0.5) {
        sources.push({
          title: getRandomSourceTitle(),
          url: getRandomSourceUrl(),
          matchedText: matchedText,
          similarity: Math.floor(similarity * 0.9), // Slightly lower similarity
          publicationDate: getRandomDate(),
          author: getRandomAuthor()
        });
      }
      
      matches.push({
        text: matchedText,
        startIndex,
        endIndex,
        similarity,
        sources
      });
    }
    
    // Create citation suggestions
    const citationSuggestions: CitationSuggestion[] = matches.flatMap(match => 
      match.sources.map(source => ({
        source,
        mlaFormat: generateMlaCitation(source),
        apaFormat: generateApaCitation(source),
        chicagoFormat: generateChicagoCitation(source)
      }))
    );
    
    return {
      originalityScore,
      matches,
      citationSuggestions,
      scannedWords: wordCount,
      matchedWords
    };
  };

  // Function to generate the text with highlighted plagiarism
  const getHighlightedText = () => {
    if (!scanResult) return text;
    
    // Sort matches by start index (descending) to avoid index changes
    const sortedMatches = [...scanResult.matches].sort((a, b) => b.startIndex - a.startIndex);
    
    let result = text;
    
    for (const match of sortedMatches) {
      const { startIndex, endIndex } = match;
      const before = result.substring(0, startIndex);
      const highlighted = result.substring(startIndex, endIndex);
      const after = result.substring(endIndex);
      
      result = before + `<span class="bg-red-500/30 text-red-100 px-1 py-0.5 rounded">${highlighted}</span>` + after;
    }
    
    return result;
  };

  // Helper functions for generating mock data
  const getRandomSourceTitle = () => {
    const titles = [
      "Understanding the Foundations of Literary Theory",
      "Modern Approaches to Critical Analysis",
      "The Evolution of Narrative Structures",
      "Contemporary Perspectives on Rhetorical Techniques",
      "Exploring Symbolism in 20th Century Literature",
      "The Role of Context in Textual Interpretation",
      "Analytical Frameworks for Comparative Literature"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };
  
  const getRandomSourceUrl = () => {
    const domains = ["scholar.org", "academia.edu", "research-journal.com", "literary-archive.net", "education-resources.org"];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `https://www.${domain}/article/${Math.floor(Math.random() * 10000)}`;
  };
  
  const getRandomDate = () => {
    const year = Math.floor(Math.random() * 10) + 2010; // 2010-2020
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };
  
  const getRandomAuthor = () => {
    const firstNames = ["John", "Sarah", "Michael", "Emily", "David", "Jennifer", "Robert", "Maria"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia"];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };
  
  // Generate citations in different formats
  const generateMlaCitation = (source: MatchSource) => {
    const author = source.author ? source.author : "No Author";
    const title = source.title;
    const date = source.publicationDate ? new Date(source.publicationDate) : new Date();
    const year = date.getFullYear();
    
    return `${author}. "${title}." ${year}.`;
  };
  
  const generateApaCitation = (source: MatchSource) => {
    const author = source.author ? source.author : "No Author";
    const title = source.title;
    const date = source.publicationDate ? new Date(source.publicationDate) : new Date();
    const year = date.getFullYear();
    
    return `${author}. (${year}). ${title}.`;
  };
  
  const generateChicagoCitation = (source: MatchSource) => {
    const author = source.author ? source.author : "No Author";
    const title = source.title;
    const date = source.publicationDate ? new Date(source.publicationDate) : new Date();
    const year = date.getFullYear();
    
    return `${author}. ${year}. "${title}."`;
  };
  
  // Function to handle copying a citation
  const handleCopyCitation = (citation: string) => {
    navigator.clipboard.writeText(citation);
    // In a real app, you might show a toast notification here
  };
  
  // Function to highlight a specific match
  const handleHighlightMatch = (match: PlagiarismMatch) => {
    setHighlightedText(match);
  };
  
  // Function to clear highlight
  const handleClearHighlight = () => {
    setHighlightedText(null);
  };
  
  // Get severity level text and color based on originality score
  const getSeverityInfo = (score: number) => {
    if (score >= 90) {
      return { text: "Low Risk", color: "text-green-400" };
    } else if (score >= 80) {
      return { text: "Moderate Risk", color: "text-yellow-400" };
    } else {
      return { text: "High Risk", color: "text-red-400" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-500 w-10 h-10 rounded-md flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Plagiarism Guardian</h1>
            <p className="text-gray-400">Scan text for potential plagiarism and get citation suggestions</p>
          </div>
        </div>
        <Link 
          href="/english/english-9-12"
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to English Tools
        </Link>
      </div>
      
      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="scanner" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Plagiarism Scanner</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Scan Results</span>
          </TabsTrigger>
          <TabsTrigger value="citations" className="flex items-center gap-2">
            <Quote className="h-4 w-4" />
            <span>Citation Helper</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scanner" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Text Information</CardTitle>
              <CardDescription>
                Enter details about the text you want to check for plagiarism
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Document Title</Label>
                <Input
                  id="title"
                  placeholder="Enter title of your paper or essay"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content to Check</CardTitle>
              <CardDescription>
                Paste your text below to scan for potential plagiarism
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[300px] font-mono text-base"
                placeholder="Paste your essay, report, or other text content here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="mt-2 text-right text-sm text-gray-400">
                {text.split(/\s+/).filter(Boolean).length} words
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setText("")}
                disabled={!text.trim()}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear
              </Button>
              <Button
                onClick={handleScanForPlagiarism}
                disabled={isScanning || !text.trim()}
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Scan for Plagiarism
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <div className="bg-purple-900/30 text-purple-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
                <div>
                  <h3 className="font-medium">Paste Your Text</h3>
                  <p className="text-sm text-gray-400">Enter your essay, paper, or document content in the text area above.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-900/30 text-purple-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</div>
                <div>
                  <h3 className="font-medium">Scan for Plagiarism</h3>
                  <p className="text-sm text-gray-400">Our AI will analyze your text against millions of academic and web sources.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-900/30 text-purple-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
                <div>
                  <h3 className="font-medium">Review Results</h3>
                  <p className="text-sm text-gray-400">Get a detailed report showing potential matches and an originality score.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-900/30 text-purple-300 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</div>
                <div>
                  <h3 className="font-medium">Get Citation Help</h3>
                  <p className="text-sm text-gray-400">For any identified sources, receive properly formatted citations to use in your work.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {!scanResult ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileCheck className="w-12 h-12 text-purple-400 mb-4" />
                <p className="text-lg text-center text-gray-400">
                  Submit your text to check for plagiarism and view results here
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setActiveTab("scanner")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Go to Scanner
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Originality Report</CardTitle>
                  <CardDescription>
                    {title ? `Results for "${title}"` : "Scan results"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-col items-center">
                      <div className="relative w-36 h-36">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl font-bold text-purple-400">
                            {scanResult.originalityScore}%
                          </div>
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#374151"
                            strokeWidth="10"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={
                              scanResult.originalityScore >= 90
                                ? "#4ade80"
                                : scanResult.originalityScore >= 80
                                ? "#facc15"
                                : "#ef4444"
                            }
                            strokeWidth="10"
                            strokeDasharray={`${(scanResult.originalityScore / 100) * 283} 283`}
                            strokeDashoffset={-70.75}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="text-lg font-medium">Originality Score</div>
                        <div className={`${getSeverityInfo(scanResult.originalityScore).color}`}>
                          {getSeverityInfo(scanResult.originalityScore).text}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          {scanResult.matches.length}
                        </div>
                        <div className="text-sm text-gray-400">
                          Potentially plagiarized passages
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          {scanResult.citationSuggestions.length}
                        </div>
                        <div className="text-sm text-gray-400">
                          Sources that need citation
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          {scanResult.scannedWords}
                        </div>
                        <div className="text-sm text-gray-400">
                          Words scanned
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          {scanResult.matchedWords}
                        </div>
                        <div className="text-sm text-gray-400">
                          Words matched to other sources
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Detected Matches</CardTitle>
                  <CardDescription>
                    Passages potentially matching other sources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scanResult.matches.map((match, index) => (
                    <div 
                      key={index}
                      className={`border ${
                        match.similarity >= 90 
                          ? "border-red-900 bg-red-900/20" 
                          : match.similarity >= 80 
                          ? "border-yellow-900 bg-yellow-900/20" 
                          : "border-yellow-900/50 bg-yellow-900/10"
                      } rounded-lg p-4`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="font-medium flex items-center">
                          <AlertTriangle className={`w-4 h-4 mr-2 ${
                            match.similarity >= 90 
                              ? "text-red-400" 
                              : "text-yellow-400"
                          }`} />
                          <span>Match #{index + 1}</span>
                        </div>
                        <Badge variant="outline" className={`${
                          match.similarity >= 90 
                            ? "border-red-500 text-red-400" 
                            : "border-yellow-500 text-yellow-400"
                        }`}>
                          {match.similarity}% Similar
                        </Badge>
                      </div>
                      
                      <div className="bg-gray-900 p-3 rounded font-mono text-sm mb-3">
                        "{match.text}"
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-sm font-medium">Matched Sources:</div>
                        {match.sources.map((source, sourceIndex) => (
                          <div key={sourceIndex} className="ml-2 pl-3 border-l border-gray-600 space-y-1">
                            <div className="font-medium">{source.title}</div>
                            <div className="text-sm text-gray-400 flex items-center">
                              <Book className="w-3.5 h-3.5 mr-1.5" />
                              {source.author || "Unknown Author"}
                            </div>
                            <div className="flex items-center space-x-2">
                              <a 
                                href={source.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                              >
                                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                                View Source
                              </a>
                              <button
                                onClick={() => handleHighlightMatch(match)}
                                className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                              >
                                <Lightbulb className="w-3.5 h-3.5 mr-1.5" />
                                Highlight
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {scanResult.matches.length === 0 && (
                    <div className="text-center py-6">
                      <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <p className="text-lg text-gray-300">
                        No matching passages detected
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Your text appears to be original
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Text Preview</CardTitle>
                  <CardDescription>
                    Your text with highlighted potential matches
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {highlightedText ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Badge className="bg-red-500/30 text-red-100 border-red-500/30">
                          Highlighting match #{scanResult.matches.indexOf(highlightedText) + 1}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleClearHighlight}
                        >
                          <Undo2 className="w-3.5 h-3.5 mr-1.5" />
                          Clear Highlight
                        </Button>
                      </div>
                      <div className="relative p-4 bg-gray-900 rounded-lg max-h-[400px] overflow-auto">
                        <div className="whitespace-pre-wrap">
                          {text.substring(0, highlightedText.startIndex)}
                          <span className="bg-red-500/30 text-red-100 px-1 py-0.5 rounded">
                            {text.substring(highlightedText.startIndex, highlightedText.endIndex)}
                          </span>
                          {text.substring(highlightedText.endIndex)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative p-4 bg-gray-900 rounded-lg max-h-[400px] overflow-auto">
                      <div 
                        className="whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-gray-400 flex items-center">
                    <div className="w-3 h-3 bg-red-500/30 rounded mr-2"></div>
                    Highlighted text indicates potential plagiarism
                  </div>
                </CardFooter>
              </Card>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setActiveTab("scanner")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Scan New Text
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("citations")}>
                  <Quote className="w-4 h-4 mr-2" />
                  Get Citations
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="citations" className="space-y-4">
          {!scanResult || scanResult.citationSuggestions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Quote className="w-12 h-12 text-purple-400 mb-4" />
                <p className="text-lg text-center text-gray-400">
                  {!scanResult 
                    ? "Scan your text for plagiarism to get citation suggestions"
                    : "No sources requiring citation were found in your text"
                  }
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setActiveTab("scanner")}
                >
                  <FileCheck className="w-4 h-4 mr-2" />
                  Go to Scanner
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Citation Suggestions</CardTitle>
                  <CardDescription>
                    Properly formatted citations for detected sources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex space-x-2 mb-4">
                    <Button 
                      variant={citationFormat === "mla" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setCitationFormat("mla")}
                    >
                      MLA
                    </Button>
                    <Button 
                      variant={citationFormat === "apa" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCitationFormat("apa")}
                    >
                      APA
                    </Button>
                    <Button 
                      variant={citationFormat === "chicago" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCitationFormat("chicago")}
                    >
                      Chicago
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {scanResult.citationSuggestions.map((suggestion, index) => (
                      <div key={index} className="bg-gray-800 p-4 rounded-lg">
                        <div className="font-medium mb-2">{suggestion.source.title}</div>
                        <div className="text-sm text-gray-400 mb-3">
                          By {suggestion.source.author || "Unknown Author"}
                          {suggestion.source.publicationDate && `, ${new Date(suggestion.source.publicationDate).getFullYear()}`}
                        </div>
                        
                        <div className="bg-gray-900 p-3 rounded-md font-mono text-sm mb-2">
                          {citationFormat === "mla" && suggestion.mlaFormat}
                          {citationFormat === "apa" && suggestion.apaFormat}
                          {citationFormat === "chicago" && suggestion.chicagoFormat}
                        </div>
                        
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyCitation(
                              citationFormat === "mla" 
                                ? suggestion.mlaFormat 
                                : citationFormat === "apa" 
                                ? suggestion.apaFormat 
                                : suggestion.chicagoFormat
                            )}
                          >
                            <Copy className="w-3.5 h-3.5 mr-1.5" />
                            Copy Citation
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Citation Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-4">
                    <div className="space-y-3">
                      <h3 className="font-medium text-purple-400">When to Cite Sources:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li>When directly quoting text from another source</li>
                        <li>When paraphrasing or summarizing another author's ideas</li>
                        <li>When presenting data, statistics, or specific facts from a source</li>
                        <li>When referencing someone else's unique theories or concepts</li>
                        <li>When using images, charts, or other visual materials from another source</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-medium text-center mb-2">MLA Style</h3>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>Used primarily in humanities</li>
                        <li>Author-page citation system</li>
                        <li>Works Cited page at the end</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-medium text-center mb-2">APA Style</h3>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>Common in social sciences</li>
                        <li>Author-date citation system</li>
                        <li>References list at the end</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-medium text-center mb-2">Chicago Style</h3>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>Often used in history and arts</li>
                        <li>Notes-bibliography system</li>
                        <li>Bibliography at the end</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setActiveTab("results")}>
                  <FileCheck className="w-4 h-4 mr-2" />
                  Back to Results
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("scanner")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Scan New Text
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 