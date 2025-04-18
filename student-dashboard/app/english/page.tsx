import React from "react";
import Link from "next/link";
import { BookText, ChevronRight } from "lucide-react";

// Define available classes
const englishClasses = [
  {
    title: "English 9-12",
    description: "Core English curriculum from literature analysis to research and composition",
    path: "/english/english-9-12",
  },
  {
    title: "AP Literature",
    description: "College-level literary analysis, critical reading, and essay composition",
    path: "/english/ap-literature",
  },
  {
    title: "AP Language",
    description: "Rhetorical analysis, argumentative writing, and synthesis of sources",
    path: "/english/ap-language",
  },
  {
    title: "Creative Writing",
    description: "Fiction, poetry, drama, and personal narrative writing techniques",
    path: "/english/creative-writing",
  }
];

export default function EnglishPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-500 w-10 h-10 rounded-md flex items-center justify-center">
          <BookText className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold">English Language Arts</h1>
      </div>
      
      <p className="text-gray-300">
        Access tools and resources for all English courses, from composition to literature analysis.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {englishClasses.map((englishClass) => (
          <Link 
            key={englishClass.title} 
            href={englishClass.path}
            className="card hover:bg-gray-800/60 transition-colors"
          >
            <div className="card-body flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-indigo-400">{englishClass.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{englishClass.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-indigo-900/20 border border-indigo-900/30 rounded-lg p-4 mt-6">
        <h2 className="text-lg font-medium text-indigo-400 mb-2">English Resources</h2>
        <p className="text-gray-300 text-sm">
          Access citation generators, grammar checkers, essay templates, and literary analysis guides
          for all your English courses. Each class page contains specialized tools relevant 
          to that specific area of language arts.
        </p>
      </div>
    </div>
  );
} 