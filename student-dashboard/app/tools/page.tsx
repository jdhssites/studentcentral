import React from "react";
import Link from "next/link";
import { 
  Calculator, 
  LineChart, 
  Lightbulb, 
  BookOpen,
  Shapes,
  Binary,
  Atom
} from "lucide-react";

// Define tool categories with their tools
const categories = [
  {
    id: "mathematics",
    title: "Mathematics",
    icon: Calculator,
    color: "bg-blue-500",
    tools: [
      { title: "Algebraic Equations", description: "Solve linear and quadratic equations", path: "/tools/algebraic-equations" },
      { title: "Calculus", description: "Derivatives, integrals, and limits", path: "/tools/calculus" },
      { title: "Statistics", description: "Statistical analysis and probability", path: "/tools/statistics" },
      { title: "Graph Visualizer", description: "Plot and analyze mathematical functions", path: "/tools/graph-visualizer" }
    ]
  },
  {
    id: "physics",
    title: "Physics",
    icon: Atom,
    color: "bg-purple-500",
    tools: [
      { title: "Mechanics", description: "Forces, motion, and energy calculations", path: "/tools/mechanics" },
      { title: "Electricity", description: "Electrical circuits and electromagnetics", path: "/tools/electricity" },
      { title: "Optics", description: "Light, lenses, and optical phenomena", path: "/tools/optics" }
    ]
  },
  {
    id: "computer-science",
    title: "Computer Science",
    icon: Binary,
    color: "bg-green-500",
    tools: [
      { title: "Data Structures", description: "Visualize and understand data structures", path: "/tools/data-structures" },
      { title: "Algorithms", description: "Algorithm visualization and analysis", path: "/tools/algorithms" },
      { title: "Binary Conversion", description: "Convert between decimal, binary, hex, and octal", path: "/tools/binary-conversion" }
    ]
  },
  {
    id: "geometry",
    title: "Geometry",
    icon: Shapes,
    color: "bg-yellow-500",
    tools: [
      { title: "2D Shapes", description: "Analyze properties of 2D geometric shapes", path: "/tools/2d-shapes" },
      { title: "3D Models", description: "Explore 3D geometric models and their properties", path: "/tools/3d-models" },
      { title: "Coordinate Geometry", description: "Work with points, lines, and curves in coordinate systems", path: "/tools/coordinate-geometry" }
    ]
  },
  {
    id: "chemistry",
    title: "Chemistry",
    icon: Lightbulb,
    color: "bg-red-500",
    tools: [
      { title: "Periodic Table", description: "Interactive periodic table of elements", path: "/tools/periodic-table" },
      { title: "Chemical Equations", description: "Balance and analyze chemical equations", path: "/tools/chemical-equations" },
      { title: "Molecular Viewer", description: "View and manipulate molecular structures", path: "/tools/molecular-viewer" }
    ]
  },
  {
    id: "biology",
    title: "Biology",
    icon: LineChart,
    color: "bg-teal-500",
    tools: [
      { title: "Cell Structure", description: "Explore cell components and functions", path: "/tools/cell-structure" },
      { title: "Genetics", description: "DNA, inheritance, and genetic analysis", path: "/tools/genetics" },
      { title: "Ecology", description: "Ecosystem simulations and models", path: "/tools/ecology" }
    ]
  },
  {
    id: "literature",
    title: "Literature",
    icon: BookOpen,
    color: "bg-indigo-500",
    tools: [
      { title: "Citation Generator", description: "Generate citations in various formats", path: "/tools/citation-generator" },
      { title: "Grammar Checker", description: "Check and improve your writing", path: "/tools/grammar-checker" }
    ]
  }
];

export default function ToolsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-4">All Tools</h1>
        <p className="text-gray-300 mb-6">
          Browse our complete collection of educational tools organized by subject. Click on any tool to start using it.
        </p>
      </div>

      {categories.map((category) => (
        <section key={category.id} id={category.id} className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className={`${category.color} w-10 h-10 rounded-md flex items-center justify-center`}>
              <category.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold">{category.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.tools.map((tool) => (
              <Link 
                key={tool.path} 
                href={tool.path}
                className="card hover:scale-105 transition-transform duration-200"
              >
                <div className="card-header">
                  {tool.title}
                </div>
                <div className="card-body text-sm text-gray-300">
                  {tool.description}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <div className="text-center text-gray-400 text-sm mt-16 pt-8 border-t border-gray-800">
        <p>More tools are being added regularly to our collection. Check back soon!</p>
      </div>
    </div>
  );
} 