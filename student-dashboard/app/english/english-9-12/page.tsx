"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookText, 
  FileCheck, 
  Brain, 
  Scale, 
  Sparkles, 
  PenSquare, 
  BookOpen, 
  CheckCircle2, 
  FileText 
} from "lucide-react";

// Define tools with categories
const englishTools = [
  {
    title: "AI Essay Coach",
    description: "Advanced AI writing assistant that provides real-time feedback on grammar, style, structure, and argumentation",
    icon: Brain,
    path: "/english/english-9-12/ai-essay-coach",
    category: "Writing"
  },
  {
    title: "Plagiarism Guardian",
    description: "Scans essays against academic sources to detect plagiarism and suggests proper citation methods",
    icon: FileCheck,
    path: "/english/english-9-12/plagiarism-guardian",
    category: "Academic Integrity"
  },
  {
    title: "Rubric Grader",
    description: "Evaluates essays based on customizable rubric criteria and provides detailed feedback for improvement",
    icon: Scale,
    path: "/english/english-9-12/rubric-grader",
    category: "Assessment"
  },
  {
    title: "Literature Analysis Engine",
    description: "Analyzes literary works for themes, symbolism, character development, and provides in-depth interpretations",
    icon: BookOpen,
    path: "/english/english-9-12/literature-analysis",
    category: "Literature"
  },
  {
    title: "Academic Paraphraser",
    description: "Helps students rewrite academic content in their own words while maintaining accuracy and integrity",
    icon: PenSquare,
    path: "/english/english-9-12/academic-paraphraser",
    category: "Writing"
  },
  {
    title: "Thesis Statement Generator",
    description: "Creates strong, arguable thesis statements based on topic inputs and research materials",
    icon: Sparkles,
    path: "/english/english-9-12/thesis-generator",
    category: "Writing"
  },
  {
    title: "Citation Wizard",
    description: "Automatically formats citations in MLA, APA, Chicago, or Harvard styles from URLs, DOIs, or manual inputs",
    icon: CheckCircle2,
    path: "/english/english-9-12/citation-wizard",
    category: "Research"
  }
];

export default function English9To12Page() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Writing", "Research", "Literature", "Assessment", "Academic Integrity"];
  
  const filteredTools = filter === "All" 
    ? englishTools 
    : englishTools.filter(tool => tool.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-500 w-10 h-10 rounded-md flex items-center justify-center">
            <BookText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">English 9-12</h1>
            <p className="text-gray-400">AI-Powered English Language Arts Tools</p>
          </div>
        </div>
        
        <div className="text-sm bg-purple-900/30 border border-purple-800/50 px-3 py-1 rounded-full text-purple-300">
          Advanced AI Integration
        </div>
      </div>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === category 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTools.map((tool) => (
          <Link 
            key={tool.title} 
            href={tool.path}
            className="block transition-transform hover:scale-[1.02]"
          >
            <div className="card h-full">
              <div className="bg-purple-500 rounded-t-lg p-4 flex items-center space-x-3">
                <div className="bg-white/20 w-10 h-10 rounded-md flex items-center justify-center">
                  {React.createElement(tool.icon, { className: "w-6 h-6 text-white" })}
                </div>
                <h3 className="text-xl font-semibold text-white">{tool.title}</h3>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between">
                  <p className="text-gray-300">{tool.description}</p>
                </div>
                <div className="mt-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/30 text-purple-300">
                    {tool.category}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Information Box */}
      <div className="border border-purple-900/30 bg-purple-900/20 rounded-lg p-4 mt-4">
        <div className="flex items-start">
          <FileText className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-purple-400 mb-1">Advanced AI English Tools</h3>
            <p className="text-gray-300 text-sm">
              These tools leverage cutting-edge AI to support students throughout their English 
              coursework. From essay writing and research to plagiarism checking and literature 
              analysis, our suite provides more personalized feedback than traditional AI assistants.
              Each tool is designed to promote learning and academic integrity while developing 
              essential English Language Arts skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 