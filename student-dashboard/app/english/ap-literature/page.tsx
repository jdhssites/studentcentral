import React from "react";
import Link from "next/link";
import { BookText, ScrollText, BarChart4, Sparkles, Library } from "lucide-react";

// Define the tools for AP Literature
const apLitTools = [
  {
    title: "Poem Analysis AI",
    description: "Breaks down AP Lit-level poetry for tone, devices, meaning",
    icon: Sparkles,
    path: "/english/ap-literature/poem-analysis",
    color: "bg-purple-600",
    comingSoon: false,
  },
  {
    title: "Prose Fiction Extract Practice",
    description: "Upload a passage → get AP-style MCQs",
    icon: ScrollText,
    path: "/english/ap-literature/prose-practice",
    color: "bg-purple-700",
    comingSoon: false,
  },
  {
    title: "Theme Tracker Tool",
    description: "Log and connect literary themes across works",
    icon: Library,
    path: "/english/ap-literature/theme-tracker",
    color: "bg-purple-800",
    comingSoon: false,
  },
  {
    title: "Essay Rubric Grader",
    description: "Paste essay → scores it on College Board's 6-point rubric",
    icon: BarChart4,
    path: "/english/ap-literature/essay-grader",
    color: "bg-purple-900",
    comingSoon: false,
  },
];

export default function APLiteraturePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-purple-600 w-10 h-10 rounded-md flex items-center justify-center">
          <BookText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AP Literature</h1>
          <p className="text-gray-400">Critical Reading & Analysis</p>
        </div>
      </div>
      
      <p className="text-gray-300">
        Access advanced tools to help you excel in AP Literature, from poetry analysis to essay assessment.
      </p>
      
      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apLitTools.map((tool) => (
          <Link 
            key={tool.title} 
            href={tool.path}
            className="block transition-transform hover:scale-[1.02]"
          >
            <div className="card h-full">
              <div className={`${tool.color} rounded-t-lg p-4 flex items-center space-x-3`}>
                <div className="bg-white/20 w-10 h-10 rounded-md flex items-center justify-center">
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{tool.title}</h3>
              </div>
              
              <div className="p-4">
                <p className="text-gray-300">{tool.description}</p>
                {tool.comingSoon && (
                  <div className="mt-2 text-purple-400 text-sm">Coming soon</div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Class Overview */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold">About AP Literature</h2>
        </div>
        <div className="card-body space-y-4">
          <p className="text-gray-300">
            AP Literature and Composition develops advanced skills in literary analysis and critical thinking. Students will:
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Analyze complex literary works across different genres and time periods</li>
            <li>Identify and interpret literary devices, tone, and narrative techniques</li>
            <li>Develop sophisticated thesis statements for literary analysis</li>
            <li>Write well-structured essays that meet College Board standards</li>
            <li>Prepare for the AP exam through authentic practice and assessment</li>
          </ul>
          
          <div className="bg-purple-900/20 border border-purple-900/30 rounded-lg p-4 mt-2">
            <h3 className="text-lg font-medium text-purple-400 mb-2">AP Exam Preparation</h3>
            <p className="text-gray-300 text-sm">
              The tools on this page are designed to support your AP Literature exam preparation. 
              Use the Poem Analysis AI to deepen your understanding of poetry, 
              Prose Fiction Extract Practice for multiple-choice question practice, 
              Theme Tracker to connect works across the curriculum, 
              and Essay Rubric Grader to assess your written responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 