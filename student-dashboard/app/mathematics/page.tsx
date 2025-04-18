import React from "react";
import Link from "next/link";
import { Calculator, ChevronRight } from "lucide-react";

// Define available classes
const mathClasses = [
  {
    title: "Algebra 1",
    description: "Linear equations, inequalities, functions, and systems of equations",
    path: "/mathematics/algebra-1",
  },
  {
    title: "Algebra 2",
    description: "Advanced functions, exponential and logarithmic equations, sequences and series",
    path: "/mathematics/algebra-2",
  },
  {
    title: "Geometry",
    description: "Shapes, properties, theorems, proofs, and spatial reasoning",
    path: "/mathematics/geometry",
  },
  {
    title: "Trigonometry",
    description: "Trigonometric functions, identities, equations, and applications",
    path: "/mathematics/trigonometry",
  },
  {
    title: "Pre-Calculus",
    description: "Functions, analytical geometry, and advanced algebra preparation for calculus",
    path: "/mathematics/pre-calculus",
  },
  {
    title: "Calculus",
    description: "Limits, derivatives, integrals, and applications of calculus",
    path: "/mathematics/calculus",
  },
  {
    title: "AP Calculus",
    description: "Advanced calculus concepts aligned with AP curriculum (AB and BC)",
    path: "/mathematics/ap-calculus",
  },
  {
    title: "Statistics",
    description: "Data analysis, probability, statistical inference, and experimental design",
    path: "/mathematics/statistics",
  }
];

export default function MathematicsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-500 w-10 h-10 rounded-md flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Mathematics</h1>
      </div>
      
      <p className="text-gray-300">
        Access tools and resources for all mathematics courses, from Algebra to Calculus.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mathClasses.map((mathClass) => (
          <Link 
            key={mathClass.title} 
            href={mathClass.path}
            className="card hover:bg-gray-800/60 transition-colors"
          >
            <div className="card-body flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-blue-400">{mathClass.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{mathClass.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-4 mt-6">
        <h2 className="text-lg font-medium text-blue-400 mb-2">Mathematics Resources</h2>
        <p className="text-gray-300 text-sm">
          Access calculators, formula sheets, graphing tools, and step-by-step problem solvers 
          for all your mathematics courses. Each class page contains specialized tools relevant 
          to that specific area of mathematics.
        </p>
      </div>
    </div>
  );
} 