"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Scale, 
  Download, 
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Edit,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";

// Types for rubric criteria and assessment
interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  weight: number;
  levels: {
    score: number;
    description: string;
  }[];
}

interface RubricAssessment {
  criterionId: string;
  score: number;
  feedback: string;
}

interface RubricTemplate {
  id: string;
  name: string;
  description: string;
  criteria: RubricCriterion[];
}

export default function RubricGraderPage() {
  // State for managing rubric templates
  const [templates] = useState<RubricTemplate[]>([
    {
      id: "essay-rubric",
      name: "Standard Essay Rubric",
      description: "A general rubric for grading essays across English 9-12",
      criteria: [
        {
          id: "thesis",
          name: "Thesis & Argument",
          description: "Strength and clarity of thesis statement and supporting arguments",
          weight: 25,
          levels: [
            { score: 4, description: "Exceptional - Clear, insightful thesis with compelling supporting arguments" },
            { score: 3, description: "Proficient - Clear thesis with adequate supporting arguments" },
            { score: 2, description: "Developing - Basic thesis with limited supporting arguments" },
            { score: 1, description: "Beginning - Unclear or missing thesis with weak arguments" }
          ]
        },
        {
          id: "evidence",
          name: "Evidence & Analysis",
          description: "Use of relevant evidence and depth of analysis",
          weight: 25,
          levels: [
            { score: 4, description: "Exceptional - Compelling evidence with insightful analysis" },
            { score: 3, description: "Proficient - Relevant evidence with adequate analysis" },
            { score: 2, description: "Developing - Limited evidence with superficial analysis" },
            { score: 1, description: "Beginning - Minimal or irrelevant evidence with little analysis" }
          ]
        },
        {
          id: "organization",
          name: "Organization & Structure",
          description: "Logical flow and effective organization of ideas",
          weight: 20,
          levels: [
            { score: 4, description: "Exceptional - Sophisticated organization with seamless transitions" },
            { score: 3, description: "Proficient - Logical organization with effective transitions" },
            { score: 2, description: "Developing - Basic organization with awkward transitions" },
            { score: 1, description: "Beginning - Disorganized with abrupt or missing transitions" }
          ]
        },
        {
          id: "style",
          name: "Style & Voice",
          description: "Effective use of language and appropriate academic voice",
          weight: 15,
          levels: [
            { score: 4, description: "Exceptional - Sophisticated vocabulary and consistent scholarly voice" },
            { score: 3, description: "Proficient - Appropriate vocabulary and mostly scholarly voice" },
            { score: 2, description: "Developing - Basic vocabulary with inconsistent voice" },
            { score: 1, description: "Beginning - Limited vocabulary with inappropriate voice" }
          ]
        },
        {
          id: "mechanics",
          name: "Grammar & Mechanics",
          description: "Correct grammar, spelling, punctuation, and formatting",
          weight: 15,
          levels: [
            { score: 4, description: "Exceptional - Nearly error-free with sophisticated sentence structures" },
            { score: 3, description: "Proficient - Few errors that don't interfere with meaning" },
            { score: 2, description: "Developing - Several errors that sometimes interfere with meaning" },
            { score: 1, description: "Beginning - Numerous errors that significantly interfere with meaning" }
          ]
        }
      ]
    }
  ]);
  
  // State for the student essay and assessment
  const [essay, setEssay] = useState("");
  const [essayTitle, setEssayTitle] = useState("");
  const [selectedTemplate] = useState<string>(templates[0].id);
  const [assessment, setAssessment] = useState<RubricAssessment[]>([]);
  const [isAssessing, setIsAssessing] = useState(false);
  const [overallFeedback, setOverallFeedback] = useState("");

  // Get currently selected template
  const getCurrentTemplate = () => {
    return templates.find(t => t.id === selectedTemplate) || templates[0];
  };

  // Calculate total score based on weighted criteria
  const calculateTotalScore = () => {
    if (assessment.length === 0) return 0;
    
    const template = getCurrentTemplate();
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    template.criteria.forEach(criterion => {
      const criterionAssessment = assessment.find(a => a.criterionId === criterion.id);
      if (criterionAssessment) {
        totalWeightedScore += (criterionAssessment.score / 4) * criterion.weight;
        totalWeight += criterion.weight;
      }
    });
    
    return totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;
  };

  // Handle assessing the essay
  const handleAssessEssay = () => {
    if (!essay.trim()) return;
    
    setIsAssessing(true);
    
    // In a real application, this would be an API call
    // For now, we'll simulate a response with mock data
    setTimeout(() => {
      const template = getCurrentTemplate();
      const mockAssessment: RubricAssessment[] = template.criteria.map(criterion => {
        // Generate somewhat random but biased toward higher scores
        const score = Math.floor(Math.random() * 3) + 2; // 2-4
        
        return {
          criterionId: criterion.id,
          score,
          feedback: generateMockFeedback(criterion, score)
        };
      });
      
      setAssessment(mockAssessment);
      setOverallFeedback(generateOverallFeedback());
      setIsAssessing(false);
    }, 2000);
  };

  // Generate mock feedback based on criterion and score
  const generateMockFeedback = (criterion: RubricCriterion, score: number) => {
    const feedbackTemplates = [
      [
        "Your essay shows a beginning level of understanding in this area.",
        "This aspect needs significant improvement.",
        "Consider reviewing the requirements and revising this section."
      ],
      [
        "Your essay is developing in this area but needs more work.",
        "Some good elements here, but there's room for improvement.",
        "With more specific details, this section could be stronger."
      ],
      [
        "Your essay demonstrates proficiency in this area.",
        "This is a strong section with only minor suggestions for improvement.",
        "Good work here - just a few refinements would make it excellent."
      ],
      [
        "Your essay shows exceptional mastery in this area.",
        "This section is particularly strong and well-developed.",
        "Excellent work that demonstrates sophisticated understanding."
      ]
    ];
    
    const levelFeedback = feedbackTemplates[score - 1];
    return `${levelFeedback[Math.floor(Math.random() * levelFeedback.length)]} ${criterion.name.toLowerCase()} is ${["critical", "essential", "important", "key"][Math.floor(Math.random() * 4)]} to effective writing.`;
  };

  // Generate overall feedback
  const generateOverallFeedback = () => {
    const totalScore = calculateTotalScore();
    
    if (totalScore >= 90) {
      return "Outstanding work! Your essay demonstrates exceptional critical thinking, strong analysis, and polished writing. The arguments are compelling and well-supported with evidence. Only minor refinements would improve this excellent piece.";
    } else if (totalScore >= 80) {
      return "Very good work! Your essay shows strong critical thinking and analysis with well-organized ideas. Your arguments are generally well-supported, though some areas could benefit from deeper analysis or more specific evidence.";
    } else if (totalScore >= 70) {
      return "Good work with some areas for improvement. Your essay demonstrates solid understanding, but would benefit from more developed analysis, stronger evidence, or more polished writing. Consider revising to strengthen your arguments and organization.";
    } else {
      return "Your essay shows basic understanding but needs significant improvement. Focus on developing a stronger thesis, providing more relevant evidence, improving organization, and refining your writing style. Consider reviewing writing resources or seeking additional help.";
    }
  };

  // Reset the assessment
  const handleResetAssessment = () => {
    setEssay("");
    setEssayTitle("");
    setAssessment([]);
    setOverallFeedback("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-500 w-10 h-10 rounded-md flex items-center justify-center">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Rubric Grader</h1>
            <p className="text-gray-400">Evaluate writing against customizable rubric criteria</p>
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
      <div className="space-y-6">
        {/* Essay Input */}
        <Card>
          <CardHeader>
            <CardTitle>Submit Your Essay</CardTitle>
            <CardDescription>
              Enter your essay text to assess against a standard essay rubric
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="essay-title">Essay Title</Label>
              <Input 
                id="essay-title" 
                placeholder="Enter the title of your essay" 
                value={essayTitle}
                onChange={(e) => setEssayTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="essay-text">Essay Text</Label>
              <Textarea 
                id="essay-text" 
                placeholder="Paste or type your essay here..." 
                className="min-h-[300px]"
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button 
              disabled={!essay.trim() || isAssessing} 
              onClick={handleAssessEssay}
              className="gap-1"
            >
              {isAssessing ? (
                <>Analyzing<span className="loading loading-dots"></span></>
              ) : (
                <>
                  <Scale className="h-4 w-4" />
                  Grade Essay
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Assessment Results */}
        {assessment.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Assessment Results</CardTitle>
                <div className="text-right">
                  <div className="text-3xl font-bold text-indigo-400">
                    {Math.round(calculateTotalScore())}%
                  </div>
                  <div className="text-sm text-gray-400">
                    Overall Score
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Overall Feedback</h3>
                <div className="p-3 bg-indigo-950/30 border border-indigo-900/50 rounded-md">
                  <p>{overallFeedback}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Criteria Breakdown</h3>
                {getCurrentTemplate().criteria.map((criterion) => {
                  const criterionAssessment = assessment.find(a => a.criterionId === criterion.id);
                  if (!criterionAssessment) return null;
                  
                  return (
                    <div key={criterion.id} className="border border-gray-800 rounded-md overflow-hidden">
                      <div className="p-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{criterion.name}</h4>
                            <p className="text-sm text-gray-400">{criterion.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge className="px-3 bg-indigo-600 hover:bg-indigo-600">
                              {criterionAssessment.score}/4
                            </Badge>
                            <div className="text-xs text-gray-400 mt-1">
                              Weight: {criterion.weight}%
                            </div>
                          </div>
                        </div>
                        
                        <Progress 
                          value={(criterionAssessment.score / 4) * 100} 
                          className="h-2" 
                        />
                        
                        <div className="p-3 bg-gray-900/30 border border-gray-800 rounded-md mt-2">
                          <p className="text-sm">{criterionAssessment.feedback}</p>
                        </div>
                        
                        <div className="text-sm mt-2">
                          <span className="font-medium">Performance level: </span>
                          {criterion.levels.find(l => l.score === criterionAssessment.score)?.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 w-full justify-between">
                <Button variant="outline" className="gap-1" onClick={() => setEssay("")}>
                  <Edit className="h-4 w-4" />
                  Edit Essay
                </Button>
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  Download Results
                </Button>
                <Button className="gap-1" onClick={handleResetAssessment}>
                  <Sparkles className="h-4 w-4" />
                  Grade New Essay
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
      
      {/* Information Card */}
      <Card className="bg-indigo-950/20 border border-indigo-900/40">
        <CardContent className="pt-4">
          <div className="flex items-start space-x-3">
            <HelpCircle className="w-5 h-5 text-indigo-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-indigo-400">About the Rubric Grader Tool</h3>
              <p className="text-sm text-gray-300 mt-1">
                This tool helps students understand how their writing will be assessed based on standard essay rubrics. 
                Enter your essay text and receive detailed feedback on each criterion of the rubric. The tool provides 
                actionable insights to help improve your writing skills.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 