import React from "react";
import Link from "next/link";
import { Microscope, ChevronRight } from "lucide-react";

// Define available classes
const scienceClasses = [
  {
    title: "Biology",
    description: "Cell structure, genetics, evolution, ecology, and human anatomy",
    path: "/science/biology",
  },
  {
    title: "Chemistry",
    description: "Atomic structure, periodic trends, chemical reactions, and stoichiometry",
    path: "/science/chemistry",
  },
  {
    title: "Physics",
    description: "Mechanics, energy, waves, electricity, magnetism, and modern physics",
    path: "/science/physics",
  },
  {
    title: "Earth Science",
    description: "Geology, meteorology, oceanography, and astronomy",
    path: "/science/earth-science",
  },
  {
    title: "Environmental Science",
    description: "Ecosystems, biodiversity, climate change, and human impact on the environment",
    path: "/science/environmental",
  },
  {
    title: "AP Biology",
    description: "Advanced molecular biology, genetics, evolution, and ecological systems",
    path: "/science/ap-biology",
  },
  {
    title: "AP Chemistry",
    description: "Advanced thermodynamics, kinetics, equilibrium, and organic chemistry",
    path: "/science/ap-chemistry",
  },
  {
    title: "AP Physics",
    description: "Advanced mechanics, electromagnetism, thermodynamics, and quantum physics",
    path: "/science/ap-physics",
  }
];

export default function SciencePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-green-500 w-10 h-10 rounded-md flex items-center justify-center">
          <Microscope className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Science</h1>
      </div>
      
      <p className="text-gray-300">
        Access tools and resources for all science courses, from Biology to Physics.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scienceClasses.map((scienceClass) => (
          <Link 
            key={scienceClass.title} 
            href={scienceClass.path}
            className="card hover:bg-gray-800/60 transition-colors"
          >
            <div className="card-body flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-green-400">{scienceClass.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{scienceClass.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-green-900/20 border border-green-900/30 rounded-lg p-4 mt-6">
        <h2 className="text-lg font-medium text-green-400 mb-2">Science Resources</h2>
        <p className="text-gray-300 text-sm">
          Access lab report templates, interactive simulations, periodic table tools, and scientific calculators
          for all your science courses. Each class page contains specialized tools relevant 
          to that specific field of science.
        </p>
      </div>
    </div>
  );
} 