import React from "react";
import Link from "next/link";
import { GalleryVerticalEnd, ChevronRight } from "lucide-react";

// Define available classes
const historyClasses = [
  {
    title: "World History",
    description: "Ancient civilizations, medieval period, renaissance, modern world history",
    path: "/history/world",
  },
  {
    title: "US History",
    description: "Colonial America, revolution, civil war, 20th century, contemporary US",
    path: "/history/us",
  },
  {
    title: "Government",
    description: "Constitutional principles, branches of government, rights and responsibilities",
    path: "/history/government",
  },
  {
    title: "Economics",
    description: "Microeconomics, macroeconomics, economic systems, and financial literacy",
    path: "/history/economics",
  },
  {
    title: "AP US History",
    description: "In-depth analysis of American history from pre-Columbian era to present",
    path: "/history/ap-us",
  },
  {
    title: "AP World History",
    description: "Advanced global patterns of interaction and developments across time periods",
    path: "/history/ap-world",
  },
  {
    title: "AP Government",
    description: "Advanced study of US political system, policy making, and constitutional underpinnings",
    path: "/history/ap-government",
  }
];

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-yellow-500 w-10 h-10 rounded-md flex items-center justify-center">
          <GalleryVerticalEnd className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold">History & Social Studies</h1>
      </div>
      
      <p className="text-gray-300">
        Access tools and resources for all history and social studies courses.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {historyClasses.map((historyClass) => (
          <Link 
            key={historyClass.title} 
            href={historyClass.path}
            className="card hover:bg-gray-800/60 transition-colors"
          >
            <div className="card-body flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400">{historyClass.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{historyClass.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-yellow-900/20 border border-yellow-900/30 rounded-lg p-4 mt-6">
        <h2 className="text-lg font-medium text-yellow-400 mb-2">History Resources</h2>
        <p className="text-gray-300 text-sm">
          Access interactive timelines, historical document analysis tools, citation generators, and
          primary source archives for all your history courses. Each class page contains specialized 
          tools relevant to that specific area of historical study.
        </p>
      </div>
    </div>
  );
} 