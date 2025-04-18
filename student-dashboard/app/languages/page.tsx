import React from "react";
import Link from "next/link";
import { Languages, ChevronRight } from "lucide-react";

// Define available classes
const languageClasses = [
  {
    title: "Spanish 1",
    description: "Introductory Spanish vocabulary, basic grammar, and conversational phrases",
    path: "/languages/spanish-1",
  },
  {
    title: "Spanish 2",
    description: "Intermediate Spanish grammar, reading comprehension, and cultural topics",
    path: "/languages/spanish-2",
  },
  {
    title: "Spanish 3",
    description: "Advanced Spanish conversation, literature, and composition",
    path: "/languages/spanish-3",
  },
  {
    title: "French 1",
    description: "Introductory French vocabulary, basic grammar, and cultural concepts",
    path: "/languages/french-1",
  },
  {
    title: "French 2",
    description: "Intermediate French grammar, reading comprehension, and conversational skills",
    path: "/languages/french-2",
  },
  {
    title: "Mandarin",
    description: "Introduction to Mandarin Chinese characters, pronunciation, and basic conversation",
    path: "/languages/mandarin",
  },
  {
    title: "Latin",
    description: "Classical Latin vocabulary, grammar, Roman history, and cultural studies",
    path: "/languages/latin",
  }
];

export default function LanguagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-red-500 w-10 h-10 rounded-md flex items-center justify-center">
          <Languages className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold">World Languages</h1>
      </div>
      
      <p className="text-gray-300">
        Access tools and resources for all world language courses.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {languageClasses.map((languageClass) => (
          <Link 
            key={languageClass.title} 
            href={languageClass.path}
            className="card hover:bg-gray-800/60 transition-colors"
          >
            <div className="card-body flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-red-400">{languageClass.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{languageClass.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-red-900/20 border border-red-900/30 rounded-lg p-4 mt-6">
        <h2 className="text-lg font-medium text-red-400 mb-2">Language Resources</h2>
        <p className="text-gray-300 text-sm">
          Access vocabulary builders, translation tools, pronunciation guides, and interactive 
          flashcards for all your language courses. Each class page contains specialized 
          tools relevant to that specific language and level.
        </p>
      </div>
    </div>
  );
} 