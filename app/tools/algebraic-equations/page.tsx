import React from "react";
import EquationSolver from "@/app/components/tools/EquationSolver";
import { Calculator } from "lucide-react";

export default function AlgebraicEquationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-500 w-10 h-10 rounded-md flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Algebraic Equations</h1>
      </div>
      
      <p className="text-gray-300">
        Solve algebraic equations with our easy-to-use tools. Enter your equation and get step-by-step solutions.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
        <div className="card bg-blue-900/20 hover:bg-blue-900/30 transition-colors border-blue-800/50 cursor-pointer">
          <div className="card-header">Linear Equations</div>
          <div className="card-body text-sm text-gray-300">
            Solve equations in the form ax + b = c
          </div>
        </div>
        
        <div className="card bg-gray-800/80 hover:bg-gray-800 transition-colors border-gray-700 cursor-pointer opacity-70">
          <div className="card-header">Quadratic Equations</div>
          <div className="card-body text-sm text-gray-400">
            Solve equations in the form ax² + bx + c = 0
            <div className="mt-2 text-xs text-blue-400">Coming soon</div>
          </div>
        </div>
        
        <div className="card bg-gray-800/80 hover:bg-gray-800 transition-colors border-gray-700 cursor-pointer opacity-70">
          <div className="card-header">Systems of Equations</div>
          <div className="card-body text-sm text-gray-400">
            Solve multiple equations with multiple variables
            <div className="mt-2 text-xs text-blue-400">Coming soon</div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-6">
        <EquationSolver />
      </div>
    </div>
  );
} 