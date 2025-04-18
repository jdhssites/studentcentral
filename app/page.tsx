import React from "react";
import Link from "next/link";
import { 
  Calculator, 
  LineChart, 
  Lightbulb, 
  BookOpen,
  Shapes,
  Binary,
  Atom,
  Search
} from "lucide-react";

// Define tool categories with their icons and basic info
const toolCategories = [
  {
    title: "Mathematics",
    description: "Algebraic equations, calculus, statistics, and graph visualizers",
    icon: Calculator,
    path: "/tools/algebraic-equations",
    color: "bg-blue-500"
  },
  {
    title: "Physics",
    description: "Mechanics, electricity, optics calculators and simulators",
    icon: Atom,
    path: "/tools/mechanics",
    color: "bg-purple-500"
  },
  {
    title: "Computer Science",
    description: "Data structures, algorithms, binary conversion tools",
    icon: Binary,
    path: "/tools/data-structures",
    color: "bg-green-500"
  },
  {
    title: "Geometry",
    description: "2D shapes, 3D models, coordinate geometry calculators",
    icon: Shapes,
    path: "/tools/3d-models",
    color: "bg-yellow-500"
  },
  {
    title: "Chemistry",
    description: "Periodic table, chemical equations, molecular viewers",
    icon: Lightbulb,
    path: "/tools/periodic-table",
    color: "bg-red-500"
  },
  {
    title: "Biology",
    description: "Cell structure, genetics, ecology resources",
    icon: LineChart,
    path: "/tools/cell-structure",
    color: "bg-teal-500"
  },
  {
    title: "Literature",
    description: "Citation generator, grammar checker, writing tools",
    icon: BookOpen,
    path: "/tools/citation-generator",
    color: "bg-indigo-500"
  }
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gray-800 rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Student Central</h1>
        <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
          A comprehensive collection of tools to help students excel in their assignments and exams
        </p>
        
        {/* Search Box */}
        <div className="max-w-md mx-auto relative">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for tools..." 
              className="w-full bg-gray-700 border border-gray-600 rounded-full px-5 py-3 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Tool Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCategories.map((category) => (
            <Link 
              key={category.title} 
              href={category.path}
              className="card hover:scale-105 transition-transform duration-200"
            >
              <div className="card-header flex items-center">
                <div className={`w-10 h-10 rounded-md flex items-center justify-center mr-3 ${category.color}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              
              <div className="card-body">
                <p className="text-gray-300">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
} 