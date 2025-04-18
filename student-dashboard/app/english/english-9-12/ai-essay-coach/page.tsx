"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Brain, 
  Send, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Download, 
  FileText, 
  BookOpen,
  RotateCcw,
  Info,
  RefreshCw,
  Zap
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Types for our feedback
interface FeedbackItem {
  type: "grammar" | "style" | "content" | "structure" | "suggestion";
  severity: "error" | "warning" | "suggestion" | "positive";
  text: string;
  selection?: {
    start: number;
    end: number;
  };
  suggestion?: string;
}

interface EssayAnalysis {
  overallScore: number;
  grammarScore: number;
  styleScore: number;
  contentScore: number;
  structureScore: number;
  strengths: string[];
  improvements: string[];
  feedback: FeedbackItem[];
}

export default function AIEssayCoachPage() {
  const [essayText, setEssayText] = useState("");
  const [essayTitle, setEssayTitle] = useState("");
  const [essayType, setEssayType] = useState("analytical");
  const [gradeLevel, setGradeLevel] = useState("9");
  const [prompt, setPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<EssayAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState("write");
  const [hoveredFeedback, setHoveredFeedback] = useState<FeedbackItem | null>(null);

  // Function to handle analyzing the essay
  const handleAnalyzeEssay = () => {
    if (!essayText.trim()) return;
    
    setIsAnalyzing(true);
    
    // In a real application, this would be an API call
    // For now, we'll simulate a response with example data
    setTimeout(() => {
      setAnalysis(generateMockAnalysis());
      setActiveTab("feedback");
      setIsAnalyzing(false);
    }, 2000);
  };
  
  // Generate mock feedback for demonstration
  const generateMockAnalysis = (): EssayAnalysis => {
    // Create some mock feedback based on essay length and type
    const feedbackItems: FeedbackItem[] = [];
    
    // Add some grammar feedback
    feedbackItems.push({
      type: "grammar",
      severity: "error",
      text: "Subject-verb agreement error in this sentence.",
      selection: {
        start: Math.floor(Math.random() * Math.max(essayText.length - 20, 1)),
        end: Math.floor(Math.random() * Math.max(essayText.length - 10, 5)) + 10,
      },
      suggestion: "Consider revising to ensure the verb agrees with the subject."
    });
    
    // Add some style feedback
    feedbackItems.push({
      type: "style",
      severity: "warning",
      text: "This sentence is too long and may be difficult to follow.",
      selection: {
        start: Math.floor(Math.random() * Math.max(essayText.length - 50, 1)),
        end: Math.floor(Math.random() * Math.max(essayText.length - 20, 10)) + 40,
      },
      suggestion: "Consider breaking this into two or three shorter sentences for clarity."
    });
    
    // Add some content feedback
    feedbackItems.push({
      type: "content",
      severity: "suggestion",
      text: "This paragraph would be stronger with a specific example.",
      selection: {
        start: Math.floor(Math.random() * Math.max(essayText.length - 100, 1)),
        end: Math.floor(Math.random() * Math.max(essayText.length - 50, 20)) + 80,
      },
      suggestion: "Add a concrete example from the text to support your claim."
    });
    
    // Add some structure feedback
    feedbackItems.push({
      type: "structure",
      severity: "warning",
      text: "This paragraph lacks a clear topic sentence.",
      selection: {
        start: Math.floor(Math.random() * Math.max(essayText.length - 150, 1)),
        end: Math.floor(Math.random() * Math.max(essayText.length - 100, 30)) + 120,
      },
      suggestion: "Begin with a sentence that clearly states the main idea of the paragraph."
    });
    
    // Add some positive feedback
    feedbackItems.push({
      type: "style",
      severity: "positive",
      text: "Excellent word choice that effectively conveys your meaning.",
      selection: {
        start: Math.floor(Math.random() * Math.max(essayText.length - 30, 1)),
        end: Math.floor(Math.random() * Math.max(essayText.length - 15, 5)) + 25,
      }
    });

    // Return the mock analysis
    return {
      overallScore: Math.floor(Math.random() * 20) + 80, // 80-99
      grammarScore: Math.floor(Math.random() * 20) + 80,
      styleScore: Math.floor(Math.random() * 20) + 80,
      contentScore: Math.floor(Math.random() * 20) + 80,
      structureScore: Math.floor(Math.random() * 20) + 80,
      strengths: [
        "Strong thesis statement that clearly outlines your argument",
        "Good use of transition words to connect ideas",
        "Effective integration of evidence in paragraph 3",
        "Conclusion effectively summarizes key points"
      ],
      improvements: [
        "Consider strengthening your introduction with a more engaging hook",
        "Some paragraphs would benefit from more specific examples",
        "Watch for run-on sentences throughout your essay",
        "Add more analysis after presenting evidence"
      ],
      feedback: feedbackItems
    };
  };

  // Function to handle feedback hover
  const handleFeedbackHover = (feedback: FeedbackItem) => {
    setHoveredFeedback(feedback);
  };

  // Function to clear feedback hover
  const handleFeedbackLeave = () => {
    setHoveredFeedback(null);
  };

  // Function to get the color class based on severity
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "bg-red-900/30 text-red-300 border-red-900/50";
      case "warning":
        return "bg-yellow-900/30 text-yellow-300 border-yellow-900/50";
      case "suggestion":
        return "bg-blue-900/30 text-blue-300 border-blue-900/50";
      case "positive":
        return "bg-green-900/30 text-green-300 border-green-900/50";
      default:
        return "bg-gray-900/30 text-gray-300 border-gray-900/50";
    }
  };

  // Function to get the icon based on severity
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <XCircle className="w-4 h-4" />;
      case "warning":
        return <AlertCircle className="w-4 h-4" />;
      case "suggestion":
        return <Info className="w-4 h-4" />;
      case "positive":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };
  
  // Function to handle applying a suggestion
  const handleApplySuggestion = (feedback: FeedbackItem) => {
    if (feedback.selection && feedback.suggestion) {
      const beforeSelection = essayText.substring(0, feedback.selection.start);
      const afterSelection = essayText.substring(feedback.selection.end);
      setEssayText(beforeSelection + feedback.suggestion + afterSelection);
    }
  };

  // Function to generate improved essay using AI
  const handleImproveEssay = () => {
    setIsAnalyzing(true);
    
    // In a real application, this would be an API call
    // For now, we'll simulate a response
    setTimeout(() => {
      const improvedEssay = essayText.replace(
        /\b(very|really|actually|basically|literally)\b/gi, 
        () => ["notably", "significantly", "substantially", "genuinely", "legitimately"][Math.floor(Math.random() * 5)]
      );
      setEssayText(improvedEssay);
      setIsAnalyzing(false);
      // Re-analyze after improvement
      handleAnalyzeEssay();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-500 w-10 h-10 rounded-md flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Essay Coach</h1>
            <p className="text-gray-400">Real-time feedback and improvements for your essays</p>
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
          <TabsTrigger value="write" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Write & Edit</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>AI Feedback</span>
          </TabsTrigger>
          <TabsTrigger value="improve" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Improve</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Essay Information</CardTitle>
              <CardDescription>
                Enter your essay details for more accurate feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="essay-title">Essay Title</Label>
                  <Input
                    id="essay-title"
                    placeholder="Enter your essay title"
                    value={essayTitle}
                    onChange={(e) => setEssayTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prompt">Assignment Prompt (Optional)</Label>
                  <Input
                    id="prompt"
                    placeholder="Enter the assignment prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="essay-type">Essay Type</Label>
                  <Select
                    value={essayType}
                    onValueChange={setEssayType}
                  >
                    <SelectTrigger id="essay-type">
                      <SelectValue placeholder="Select essay type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analytical">Analytical Essay</SelectItem>
                      <SelectItem value="argumentative">Argumentative Essay</SelectItem>
                      <SelectItem value="expository">Expository Essay</SelectItem>
                      <SelectItem value="narrative">Narrative Essay</SelectItem>
                      <SelectItem value="descriptive">Descriptive Essay</SelectItem>
                      <SelectItem value="compare-contrast">Compare & Contrast Essay</SelectItem>
                      <SelectItem value="cause-effect">Cause & Effect Essay</SelectItem>
                      <SelectItem value="research">Research Paper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade-level">Grade Level</Label>
                  <Select
                    value={gradeLevel}
                    onValueChange={setGradeLevel}
                  >
                    <SelectTrigger id="grade-level">
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">9th Grade</SelectItem>
                      <SelectItem value="10">10th Grade</SelectItem>
                      <SelectItem value="11">11th Grade</SelectItem>
                      <SelectItem value="12">12th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Essay</CardTitle>
              <CardDescription>
                Write or paste your essay here to get AI-powered feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[300px] font-mono text-base"
                placeholder="Enter your essay text here..."
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
              />
              <div className="mt-2 text-right text-sm text-gray-400">
                {essayText.length} characters | ~{Math.round(essayText.split(/\s+/).length / 250)} pages
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setEssayText("")}
                disabled={!essayText.trim()}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear
              </Button>
              <Button
                onClick={handleAnalyzeEssay}
                disabled={isAnalyzing || !essayText.trim()}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Analyze Essay
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          {!analysis ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Sparkles className="w-12 h-12 text-purple-400 mb-4" />
                <p className="text-lg text-center text-gray-400">
                  Enter your essay and click "Analyze Essay" to get AI feedback
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setActiveTab("write")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Go to Essay Editor
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Essay Evaluation</CardTitle>
                  <CardDescription>
                    Overall score and breakdown by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="text-5xl font-bold text-purple-400 mb-2">
                      {analysis.overallScore}/100
                    </div>
                    <Progress 
                      value={analysis.overallScore} 
                      className="w-full h-2.5 bg-gray-700" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Grammar</div>
                        <div className="text-purple-400 font-bold">{analysis.grammarScore}</div>
                      </div>
                      <Progress 
                        value={analysis.grammarScore} 
                        className="h-1.5 bg-gray-700" 
                      />
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Style</div>
                        <div className="text-purple-400 font-bold">{analysis.styleScore}</div>
                      </div>
                      <Progress 
                        value={analysis.styleScore} 
                        className="h-1.5 bg-gray-700" 
                      />
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Content</div>
                        <div className="text-purple-400 font-bold">{analysis.contentScore}</div>
                      </div>
                      <Progress 
                        value={analysis.contentScore} 
                        className="h-1.5 bg-gray-700" 
                      />
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Structure</div>
                        <div className="text-purple-400 font-bold">{analysis.structureScore}</div>
                      </div>
                      <Progress 
                        value={analysis.structureScore} 
                        className="h-1.5 bg-gray-700" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.strengths.map((strength, index) => (
                        <li 
                          key={index} 
                          className="flex items-start"
                        >
                          <span className="bg-green-900/30 text-green-400 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-amber-400 mr-2" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.improvements.map((improvement, index) => (
                        <li 
                          key={index} 
                          className="flex items-start"
                        >
                          <span className="bg-amber-900/30 text-amber-400 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Feedback</CardTitle>
                  <CardDescription>
                    Specific suggestions to improve your essay
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.feedback.map((feedback, index) => (
                    <div 
                      key={index}
                      className={`border p-3 rounded-md ${getSeverityColor(feedback.severity)}`}
                      onMouseEnter={() => handleFeedbackHover(feedback)}
                      onMouseLeave={handleFeedbackLeave}
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {getSeverityIcon(feedback.severity)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <div className="font-medium">{feedback.text}</div>
                            <Badge variant="outline" className="ml-2">
                              {feedback.type}
                            </Badge>
                          </div>
                          
                          {feedback.selection && (
                            <div className="bg-gray-900 p-2 rounded my-2 text-sm font-mono">
                              "...{essayText.substring(feedback.selection.start, feedback.selection.end)}..."
                            </div>
                          )}
                          
                          {feedback.suggestion && (
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-sm italic">
                                Suggestion: {feedback.suggestion}
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="ml-2 h-7 text-xs"
                                onClick={() => handleApplySuggestion(feedback)}
                              >
                                Apply
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setActiveTab("write")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Return to Editor
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("improve")}>
                  <Zap className="w-4 h-4 mr-2" />
                  Improve Essay
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="improve" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Essay Improvement</CardTitle>
              <CardDescription>
                Automatically enhance your essay based on feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-4">
                <div className="flex items-start">
                  <Sparkles className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-1">How It Works</h3>
                    <p className="text-gray-300 text-sm">
                      Our AI will analyze your essay and make improvements to enhance:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400 mr-2" />
                        Grammar and punctuation
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400 mr-2" />
                        Sentence structure and flow
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400 mr-2" />
                        Word choice and vocabulary
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400 mr-2" />
                        Clarity and conciseness
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="improvement-focus">Focus Areas</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="improvement-focus">
                    <SelectValue placeholder="Select improvement focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    <SelectItem value="grammar">Grammar & Mechanics</SelectItem>
                    <SelectItem value="style">Style & Voice</SelectItem>
                    <SelectItem value="structure">Structure & Organization</SelectItem>
                    <SelectItem value="vocabulary">Vocabulary Enhancement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="improvement-level">Improvement Level</Label>
                <Select defaultValue="moderate">
                  <SelectTrigger id="improvement-level">
                    <SelectValue placeholder="Select improvement level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light (Subtle Changes)</SelectItem>
                    <SelectItem value="moderate">Moderate (Balanced Enhancement)</SelectItem>
                    <SelectItem value="substantial">Substantial (Major Improvements)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Textarea
                className="min-h-[250px] font-mono text-base"
                placeholder="Your essay will appear here after analysis..."
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
              />
              
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("feedback")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Feedback
                </Button>
                <Button
                  onClick={handleImproveEssay}
                  disabled={isAnalyzing || !essayText.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Improving...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Improve Essay
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Essay
            </Button>
            <Button>
              <BookOpen className="w-4 h-4 mr-2" />
              View Improved Essay
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 