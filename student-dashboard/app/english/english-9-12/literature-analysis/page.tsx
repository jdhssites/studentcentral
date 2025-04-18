"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  BookOpen, 
  Search, 
  Download,
  User,
  Lightbulb,
  Sparkles,
  Mountain,
  Droplet,
  Edit,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { analyzeLiterature } from '../../../lib/openai';

// Types for analysis results
interface ThemeEvidence {
  name: string;
  description: string;
  evidence: string[];
}

interface SymbolInfo {
  symbol: string;
  meaning: string;
  occurrences: string[];
}

interface CharacterInfo {
  name: string;
  analysis: string;
  traits: string[];
  development: string;
  relationships: string;
}

interface NarrativeInfo {
  structure: string;
  perspective: string;
  techniques: string[];
  arc: string;
}

interface LiteraryDevice {
  device: string;
  examples: string[];
}

interface OverallInsights {
  summary: string;
  significance: string;
  criticalPerspectives: string;
}

interface AnalysisResults {
  themes?: {
    primaryThemes: ThemeEvidence[];
    motifs: string[];
  };
  symbolism?: SymbolInfo[];
  characters?: CharacterInfo[];
  narrative?: NarrativeInfo;
  literaryDevices?: LiteraryDevice[];
  overallInsights: OverallInsights;
}

// Classic texts for pre-selection
const classicTexts = [
  { 
    id: "romeo-juliet",
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    excerpt: "Two households, both alike in dignity,\nIn fair Verona, where we lay our scene,\nFrom ancient grudge break to new mutiny,\nWhere civil blood makes civil hands unclean."
  },
  { 
    id: "great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    excerpt: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.\n'Whenever you feel like criticizing anyone,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had.'"
  },
  { 
    id: "to-kill-mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    excerpt: "When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem's fears of never being able to play football were assuaged, he was seldom self-conscious about his injury."
  },
  { 
    id: "lord-flies",
    title: "Lord of the Flies",
    author: "William Golding",
    excerpt: "The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon. Though he had taken off his school sweater and trailed it now from one hand, his grey shirt stuck to him and his hair was plastered to his forehead."
  },
  { 
    id: "1984",
    title: "1984",
    author: "George Orwell",
    excerpt: "It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him."
  }
];

// Analysis types with descriptions
const analysisTypes = [
  {
    id: "themes",
    label: "Themes & Motifs",
    description: "Identify recurring ideas, concepts, and motifs in the text",
    icon: Lightbulb
  },
  {
    id: "symbolism",
    label: "Symbolism",
    description: "Analyze symbolic elements and their deeper meanings",
    icon: Droplet
  },
  {
    id: "character",
    label: "Character Analysis",
    description: "Examine character development, motivations, and relationships",
    icon: User
  },
  {
    id: "narrative",
    label: "Narrative Structure",
    description: "Analyze the structure, plot development, and narrative techniques",
    icon: Mountain
  },
  {
    id: "literary-devices",
    label: "Literary Devices",
    description: "Identify figurative language, imagery, and other literary techniques",
    icon: Sparkles
  }
];

// Create a simple checkbox component since we're missing the required dependency
const SimpleCheckbox = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
  return (
    <div 
      className={`w-4 h-4 border rounded-sm cursor-pointer ${checked ? 'bg-blue-500 border-blue-600' : 'border-gray-600'}`}
      onClick={onChange}
    >
      {checked && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )}
    </div>
  );
};

export default function LiteratureAnalysisPage() {
  // State for the literary text and results
  const [literaryText, setLiteraryText] = useState("");
  const [textTitle, setTextTitle] = useState("");
  const [textAuthor, setTextAuthor] = useState("");
  const [selectedAnalysisTypes, setSelectedAnalysisTypes] = useState<string[]>(["themes", "character"]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [activeTab, setActiveTab] = useState("input");

  // Handle selecting a classic text
  const handleSelectClassicText = (textId: string) => {
    const selectedText = classicTexts.find(text => text.id === textId);
    if (selectedText) {
      setTextTitle(selectedText.title);
      setTextAuthor(selectedText.author);
      setLiteraryText(selectedText.excerpt);
    }
  };

  // Handle analysis type selection
  const handleAnalysisTypeToggle = (analysisId: string) => {
    setSelectedAnalysisTypes(prev => 
      prev.includes(analysisId)
        ? prev.filter(id => id !== analysisId)
        : [...prev, analysisId]
    );
  };

  // Handle analyzing the text
  const handleAnalyzeText = async () => {
    if (!literaryText.trim()) return;
    
    setIsAnalyzing(true);
    setActiveTab("results");
    
    try {
      // Use mock data for development/testing
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const mockResults = generateMockAnalysis();
        setAnalysisResults(mockResults);
        return;
      }
      
      // Use the OpenAI API directly for analysis
      const results = await analyzeLiterature({
        text: literaryText,
        title: textTitle,
        author: textAuthor,
        analysisTypes: selectedAnalysisTypes,
      });
      
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error analyzing text:', error);
      // Show an error message to the user
      alert('An error occurred while analyzing the text. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate mock analysis for testing/development
  const generateMockAnalysis = (): AnalysisResults => {
    return {
      overallInsights: {
        summary: "This text exemplifies the author's skillful use of symbolism and metaphor to explore themes of identity and self-discovery. The narrative structure creates a compelling journey that mirrors the protagonist's internal transformation.",
        significance: "The work stands as an important contribution to modern literature, challenging conventional narrative structures while addressing universal human experiences.",
        criticalPerspectives: "The text can be interpreted through feminist, post-colonial, and psychoanalytic lenses, each revealing different layers of meaning and social commentary."
      },
      themes: selectedAnalysisTypes.includes('themes') ? {
        primaryThemes: [
          {
            name: "Identity and Self-Discovery",
            description: "Exploration of how individuals define themselves in relation to society and personal history",
            evidence: [
              "The protagonist's journey through unfamiliar landscapes",
              "Repeated motif of mirrors and reflections",
              "Character's explicit questioning of their role in society"
            ]
          },
          {
            name: "Power and Control",
            description: "Examination of institutional power structures and personal agency",
            evidence: [
              "Descriptions of architectural structures as imposing and restrictive",
              "Dialogue between authority figures and subordinates",
              "Symbolism of keys, doors, and locked spaces"
            ]
          }
        ],
        motifs: ["Journeys", "Water", "Darkness and Light", "Dreams"]
      } : undefined,
      symbolism: selectedAnalysisTypes.includes('symbolism') ? [
        {
          symbol: "The River",
          meaning: "Represents the flow of time and the journey of life, with its currents and obstacles symbolizing life challenges",
          occurrences: [
            "Opening scene describes the river as 'winding through time itself'",
            "Character's pivotal decision made while standing on a bridge",
            "Final scene returns to the river, now described as 'calmer, wider'"
          ]
        },
        {
          symbol: "Birds",
          meaning: "Symbolize freedom, aspiration, and the human spirit's desire to transcend limitations",
          occurrences: [
            "Caged bird in the protagonist's childhood home",
            "Flock of birds appearing at moments of important decision",
            "Single bird described watching the protagonist in the final paragraph"
          ]
        }
      ] : undefined,
      characters: selectedAnalysisTypes.includes('character') ? [
        {
          name: "The Protagonist",
          analysis: "A complex character who serves as both observer and catalyst within the narrative, embodying the tension between societal expectations and individual desire",
          traits: ["Introspective", "Resilient", "Conflicted"],
          development: "Evolves from passive acceptance of circumstances to active pursuit of personal truth and meaning",
          relationships: "Defined by complicated dynamics with parental figures and a series of mentors who both guide and mislead"
        },
        {
          name: "The Mentor",
          analysis: "Represents wisdom but with deliberate ambiguity about their true motives and reliability",
          traits: ["Enigmatic", "Knowledgeable", "Morally ambiguous"],
          development: "Gradually revealed to be more fallible than initially presented",
          relationships: "Creates a dependent relationship with the protagonist while seemingly preparing them for independence"
        }
      ] : undefined,
      narrative: selectedAnalysisTypes.includes('narrative') ? {
        structure: "The text employs a non-linear narrative that moves between past and present, creating a tapestry of moments that gradually reveal their connections",
        perspective: "Written primarily in limited third-person perspective, occasionally shifting to create moments of dramatic irony",
        techniques: ["Flashbacks", "Foreshadowing", "Unreliable narration", "Stream of consciousness passages"],
        arc: "Follows a modified hero's journey structure with distinct phases of departure, initiation, and return, though with a deliberately ambiguous resolution"
      } : undefined,
      literaryDevices: selectedAnalysisTypes.includes('literary-devices') ? [
        {
          device: "Metaphor",
          examples: [
            "Life described as 'a library with endless shelves'",
            "Emotions portrayed as 'colors seeping through fabric'",
            "Memory characterized as 'an unreliable photographer'"
          ]
        },
        {
          device: "Irony",
          examples: [
            "Character finds freedom within confinement",
            "Wisdom comes from the character deemed foolish",
            "Moment of greatest clarity occurs in dense fog"
          ]
        },
        {
          device: "Allusion",
          examples: [
            "References to Greek myth of Theseus and the labyrinth",
            "Parallels to Shakespearean tragedy structures",
            "Biblical imagery of gardens and temptation"
          ]
        }
      ] : undefined
    };
  };

  // Reset analysis
  const handleReset = () => {
    setAnalysisResults(null);
    setActiveTab("input");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 w-10 h-10 rounded-md flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Literature Analysis Engine</h1>
            <p className="text-gray-400">Deep analysis of themes, symbols, characters, and more</p>
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
          <TabsTrigger value="input">Text Input</TabsTrigger>
          <TabsTrigger value="results" disabled={!analysisResults}>Analysis Results</TabsTrigger>
        </TabsList>
        
        {/* Text Input Tab */}
        <TabsContent value="input" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enter Literary Text</CardTitle>
              <CardDescription>
                Paste any literary text or select from classic excerpts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-title">Title</Label>
                <Input 
                  id="text-title" 
                  placeholder="Enter the title of the work" 
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="text-author">Author</Label>
                <Input 
                  id="text-author" 
                  placeholder="Enter the author's name" 
                  value={textAuthor}
                  onChange={(e) => setTextAuthor(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="literary-text">Text</Label>
                <Textarea 
                  id="literary-text" 
                  placeholder="Paste the literary text here..." 
                  className="min-h-[200px]"
                  value={literaryText}
                  onChange={(e) => setLiteraryText(e.target.value)}
                />
              </div>
              
              <div className="pt-2">
                <Label className="text-sm text-gray-400">Quick Select Classic Texts</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {classicTexts.map((text) => (
                    <Button 
                      key={text.id} 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSelectClassicText(text.id)}
                      className="text-xs"
                    >
                      {text.title}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Analysis Options</CardTitle>
              <CardDescription>
                Select the types of literary analysis to perform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisTypes.map((type) => (
                  <div 
                    key={type.id} 
                    className={`border rounded-md p-4 cursor-pointer transition-colors ${
                      selectedAnalysisTypes.includes(type.id) 
                        ? 'border-blue-500 bg-blue-950/20' 
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                    onClick={() => handleAnalysisTypeToggle(type.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`mt-0.5 ${selectedAnalysisTypes.includes(type.id) ? 'text-blue-400' : 'text-gray-400'}`}>
                        {React.createElement(type.icon, { size: 20 })}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{type.label}</h3>
                          <SimpleCheckbox
                            checked={selectedAnalysisTypes.includes(type.id)}
                            onChange={() => handleAnalysisTypeToggle(type.id)}
                          />
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button 
                disabled={!literaryText.trim() || selectedAnalysisTypes.length === 0 || isAnalyzing} 
                onClick={handleAnalyzeText}
                className="gap-1"
              >
                {isAnalyzing ? (
                  <>Analyzing<span className="loading loading-dots"></span></>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Analyze Text
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Analysis Results Tab */}
        <TabsContent value="results" className="space-y-5">
          {isAnalyzing ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Analyzing Literature</h3>
                    <p className="text-gray-400 mt-1">Examining themes, characters, and literary elements...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : analysisResults ? (
            <>
              {/* Overview Card */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{textTitle || "Literary Analysis"}</CardTitle>
                      {textAuthor && <CardDescription>by {textAuthor}</CardDescription>}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Save Analysis
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1" onClick={handleReset}>
                        <Edit className="h-4 w-4" />
                        New Analysis
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
                      <h3 className="font-medium text-lg mb-2">Overall Literary Insights</h3>
                      <p>{analysisResults.overallInsights.summary}</p>
                      
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-blue-400">Literary Significance</h4>
                          <p className="text-sm text-gray-300 mt-1">{analysisResults.overallInsights.significance}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-blue-400">Critical Perspectives</h4>
                          <p className="text-sm text-gray-300 mt-1">{analysisResults.overallInsights.criticalPerspectives}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedAnalysisTypes.map((type) => {
                        const analysisType = analysisTypes.find(t => t.id === type);
                        return (
                          <Badge key={type} variant="outline" className="px-2 py-1 gap-1">
                            {React.createElement(analysisType?.icon || BookOpen, { className: "h-3 w-3" })}
                            {analysisType?.label}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Themes Analysis */}
              {analysisResults.themes && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-yellow-400" />
                      <CardTitle>Themes & Motifs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Primary Themes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {analysisResults.themes.primaryThemes.map((theme: ThemeEvidence, index: number) => (
                            <div key={index} className="border border-gray-800 rounded-md p-4">
                              <h4 className="font-medium text-yellow-400">{theme.name}</h4>
                              <p className="text-sm mt-1">{theme.description}</p>
                              
                              <div className="mt-3">
                                <h5 className="text-xs font-medium text-gray-400 mb-1">Textual Evidence:</h5>
                                <ul className="text-sm space-y-1">
                                  {theme.evidence.map((evidence: string, i: number) => (
                                    <li key={i} className="flex items-start">
                                      <span className="text-yellow-500 mr-2">•</span>
                                      <span>{evidence}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Recurring Motifs</h3>
                        <div className="flex flex-wrap gap-2">
                          {analysisResults.themes.motifs.map((motif: string, index: number) => (
                            <Badge key={index} className="bg-yellow-900/20 text-yellow-300 border-yellow-900/50 hover:bg-yellow-900/30">
                              {motif}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Symbolism Analysis */}
              {analysisResults.symbolism && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Droplet className="h-5 w-5 text-blue-400" />
                      <CardTitle>Symbolism</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResults.symbolism.map((symbol: SymbolInfo, index: number) => (
                        <div key={index} className="border border-gray-800 rounded-md overflow-hidden">
                          <div className="bg-blue-950/30 border-b border-gray-800 px-4 py-3">
                            <h3 className="font-medium text-blue-400">{symbol.symbol}</h3>
                          </div>
                          <div className="p-4">
                            <p>{symbol.meaning}</p>
                            
                            <div className="mt-3">
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Textual Occurrences:</h4>
                              <ul className="text-sm space-y-1">
                                {symbol.occurrences.map((occurrence: string, i: number) => (
                                  <li key={i} className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    <span>{occurrence}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Character Analysis */}
              {analysisResults.characters && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-green-400" />
                      <CardTitle>Character Analysis</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResults.characters.map((character: CharacterInfo, index: number) => (
                        <div key={index} className="border border-gray-800 rounded-md p-4">
                          <h3 className="font-medium text-green-400">{character.name}</h3>
                          <p className="mt-2">{character.analysis}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Character Traits:</h4>
                              <div className="flex flex-wrap gap-1">
                                {character.traits.map((trait: string, i: number) => (
                                  <Badge key={i} className="bg-green-900/20 text-green-300 border-green-900/50">
                                    {trait}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Character Development:</h4>
                              <p className="text-sm">{character.development}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Key Relationships:</h4>
                              <p className="text-sm">{character.relationships}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Narrative Structure Analysis */}
              {analysisResults.narrative && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Mountain className="h-5 w-5 text-purple-400" />
                      <CardTitle>Narrative Structure</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-800 rounded-md p-4">
                          <h3 className="text-sm font-medium text-purple-400 mb-1">Structure</h3>
                          <p>{analysisResults.narrative.structure}</p>
                        </div>
                        
                        <div className="border border-gray-800 rounded-md p-4">
                          <h3 className="text-sm font-medium text-purple-400 mb-1">Narrative Perspective</h3>
                          <p>{analysisResults.narrative.perspective}</p>
                        </div>
                      </div>
                      
                      <div className="border border-gray-800 rounded-md p-4">
                        <h3 className="text-sm font-medium text-purple-400 mb-1">Narrative Arc</h3>
                        <p>{analysisResults.narrative.arc}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Narrative Techniques</h3>
                        <ul className="space-y-2">
                          {analysisResults.narrative.techniques.map((technique: string, index: number) => (
                            <li key={index} className="flex items-start border border-gray-800 rounded-md p-3">
                              <span className="text-purple-500 mr-2">•</span>
                              <span>{technique}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Literary Devices Analysis */}
              {analysisResults.literaryDevices && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5 text-amber-400" />
                      <CardTitle>Literary Devices</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {analysisResults.literaryDevices.map((device: LiteraryDevice, index: number) => (
                        <div key={index}>
                          <h3 className="text-lg font-medium text-amber-400 mb-2">{device.device}</h3>
                          <div className="space-y-2">
                            {device.examples.map((example: string, i: number) => (
                              <div key={i} className="border border-gray-800 rounded-md p-3 bg-amber-950/10">
                                <p>&quot;{example}&quot;</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : null}
        </TabsContent>
      </Tabs>
      
      {/* Information Card */}
      <Card className="bg-blue-950/20 border border-blue-900/40">
        <CardContent className="pt-4">
          <div className="flex items-start space-x-3">
            <HelpCircle className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-400">About the Literature Analysis Engine</h3>
              <p className="text-sm text-gray-300 mt-1">
                This tool uses advanced language processing to analyze literary texts for themes, symbols, character development, 
                and literary devices. It helps students develop deeper understanding of literature by providing detailed 
                analysis with textual evidence. Great for essay preparation, class discussions, and developing critical reading skills.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 